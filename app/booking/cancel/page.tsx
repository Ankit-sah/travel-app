import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XCircle, ArrowLeft, Package, Home } from "lucide-react";
import { prisma } from "@/lib/prisma";

interface CancelPageProps {
  searchParams: Promise<{ booking_id?: string }>;
}

export default async function BookingCancelPage({ searchParams }: CancelPageProps) {
  const { booking_id: bookingId } = await searchParams;

  let packageTitle = null;
  if (bookingId) {
    try {
      const booking = await prisma.booking.findUnique({
        where: { id: bookingId },
        include: {
          package: {
            select: {
              title: true,
              slug: true,
            },
          },
        },
      });
      if (booking) {
        packageTitle = booking.package.title;
      }
    } catch (error) {
      console.error("Error fetching booking:", error);
    }
  }

  return (
    <div className="min-h-[60vh] py-12 bg-background">
      <div className="container max-w-2xl">
        <Card className="border-orange-200 bg-orange-50/50 dark:bg-orange-950/20">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/30">
              <XCircle className="h-8 w-8 text-orange-600 dark:text-orange-400" />
            </div>
            <CardTitle className="text-3xl">Payment Cancelled</CardTitle>
            <CardDescription className="text-lg">
              Your payment was cancelled. Your booking has been saved and you can complete the
              payment anytime.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {packageTitle && (
              <div className="rounded-lg border bg-background p-6">
                <h3 className="mb-4 flex items-center gap-2 font-semibold">
                  <Package className="h-5 w-5 text-primary" />
                  Booking Information
                </h3>
                <p className="text-muted-foreground">
                  Package: <span className="font-semibold text-foreground">{packageTitle}</span>
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Your booking details have been saved. You can return to complete the payment
                  anytime.
                </p>
              </div>
            )}

            <div className="rounded-lg border bg-blue-50 p-4 dark:bg-blue-950/20">
              <p className="text-sm text-muted-foreground">
                No charges were made to your account. If you experienced any issues during checkout,
                please contact our support team for assistance.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              {bookingId && packageTitle ? (
                <Link href={`/packages/${packageTitle.toLowerCase().replace(/\s+/g, "-")}`} className="flex-1">
                  <Button className="w-full">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Return to Package
                  </Button>
                </Link>
              ) : (
                <Link href="/packages" className="flex-1">
                  <Button className="w-full">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Browse Packages
                  </Button>
                </Link>
              )}
              <Link href="/" className="flex-1">
                <Button variant="outline" className="w-full">
                  <Home className="mr-2 h-4 w-4" />
                  Go Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

