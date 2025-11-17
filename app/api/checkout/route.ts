import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { formatAmountForStripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    if (!stripe) {
      return NextResponse.json(
        { error: "Stripe is not configured. Please set STRIPE_SECRET_KEY in environment variables." },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { packageId, bookingId } = body;

    if (!packageId || !bookingId) {
      return NextResponse.json(
        { error: "Package ID and Booking ID are required" },
        { status: 400 }
      );
    }

    // Fetch package details
    const packageData = await prisma.package.findUnique({
      where: { id: packageId },
      select: { id: true, title: true, price: true, images: true },
    });

    if (!packageData) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 });
    }

    // Fetch booking details
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    const amount = formatAmountForStripe(packageData.price);

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: packageData.title,
              images: packageData.images.length > 0 ? [packageData.images[0]] : [],
              description: `Travel Package Booking`,
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/booking/cancel?booking_id=${bookingId}`,
      customer_email: booking.email,
      metadata: {
        bookingId: booking.id,
        packageId: packageData.id,
      },
    });

    // Update booking with Stripe session ID
    await prisma.booking.update({
      where: { id: bookingId },
      data: {
        stripeSessionId: session.id,
        amount: packageData.price,
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}

