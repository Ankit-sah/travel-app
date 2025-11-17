import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";
import { headers } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    if (!stripe) {
      return NextResponse.json(
        { error: "Stripe is not configured" },
        { status: 500 }
      );
    }

    const body = await req.text();
    const signature = (await headers()).get("stripe-signature");

    if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
      return NextResponse.json(
        { error: "Missing stripe signature or webhook secret" },
        { status: 400 }
      );
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return NextResponse.json(
        { error: "Webhook signature verification failed" },
        { status: 400 }
      );
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const bookingId = session.metadata?.bookingId;

        if (bookingId) {
          await prisma.booking.update({
            where: { id: bookingId },
            data: {
              paymentStatus: "paid",
              stripePaymentIntentId: session.payment_intent as string,
            },
          });

          // TODO: Send confirmation email here
          console.log(`✅ Payment successful for booking ${bookingId}`);
        }
        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        
        // Find booking by payment intent ID
        const booking = await prisma.booking.findFirst({
          where: { stripePaymentIntentId: paymentIntent.id },
        });

        if (booking) {
          await prisma.booking.update({
            where: { id: booking.id },
            data: {
              paymentStatus: "failed",
            },
          });

          console.log(`❌ Payment failed for booking ${booking.id}`);
        }
        break;
      }

      case "charge.refunded": {
        const charge = event.data.object as Stripe.Charge;
        
        // Find booking by payment intent ID
        const booking = await prisma.booking.findFirst({
          where: { stripePaymentIntentId: charge.payment_intent as string },
        });

        if (booking) {
          await prisma.booking.update({
            where: { id: booking.id },
            data: {
              paymentStatus: "refunded",
            },
          });

          console.log(`💰 Refund processed for booking ${booking.id}`);
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}

