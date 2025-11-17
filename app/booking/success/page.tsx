import Link from "next/link";
import { Suspense } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Mail, Package, Home } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

async function getBookingDetails(sessionId: string) {
  try {
    // Retrieve session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items", "payment_intent"],
    });

    const bookingId = session.metadata?.bookingId;
    if (!bookingId) return null;

    // Get booking details
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        package: {
          select: {
            title: true,
            images: true,
            slug: true,
          },
        },
      },
    });

    return {
      booking,
      session,
    };
  } catch (error) {
    console.error("Error fetching booking details:", error);
    return null;
  }
}

interface SuccessPageProps {
  searchParams: Promise<{ session_id?: string }>;
}

export default async function BookingSuccessPage({ searchParams }: SuccessPageProps) {
  const { session_id: sessionId } = await searchParams;

  if (!sessionId) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-background">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Invalid Session</CardTitle>
            <CardDescription>No payment session found.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/packages">
              <Button>Browse Packages</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const bookingData = await getBookingDetails(sessionId);

  if (!bookingData || !bookingData.booking) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-background">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Booking Not Found</CardTitle>
            <CardDescription>Unable to retrieve booking details.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/packages">
              <Button>Browse Packages</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { booking, session } = bookingData;
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Travel App";

  return (
    <div className="min-h-[60vh] py-12 bg-background">
      <div className="container max-w-2xl">
        <Card className="border-green-200 bg-green-50/50 dark:bg-green-950/20">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
              <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle className="text-3xl">Payment Successful!</CardTitle>
            <CardDescription className="text-lg">
              Your booking has been confirmed. We&apos;ve sent a confirmation email to{" "}
              <span className="font-semibold">{booking.email}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-lg border bg-background p-6">
              <h3 className="mb-4 flex items-center gap-2 font-semibold">
                <Package className="h-5 w-5 text-primary" />
                Booking Details
              </h3>
              <dl className="space-y-3">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Package</dt>
                  <dd className="font-semibold">{booking.package.title}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Name</dt>
                  <dd className="font-semibold">{booking.name}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Email</dt>
                  <dd className="font-semibold">{booking.email}</dd>
                </div>
                {booking.phone && (
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Phone</dt>
                    <dd className="font-semibold">{booking.phone}</dd>
                  </div>
                )}
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Amount Paid</dt>
                  <dd className="font-semibold text-green-600">
                    ${booking.amount?.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Payment Status</dt>
                  <dd className="font-semibold capitalize text-green-600">
                    {booking.paymentStatus}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/packages" className="flex-1">
                <Button variant="outline" className="w-full">
                  Browse More Packages
                </Button>
              </Link>
              <Link href="/" className="flex-1">
                <Button className="w-full">
                  <Home className="mr-2 h-4 w-4" />
                  Go Home
                </Button>
              </Link>
            </div>

            <div className="rounded-lg border bg-blue-50 p-4 dark:bg-blue-950/20">
              <p className="text-sm text-muted-foreground">
                <Mail className="mr-2 inline h-4 w-4" />
                A confirmation email has been sent to <strong>{booking.email}</strong> with all the
                details about your booking. If you don&apos;t see it, please check your spam folder.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

