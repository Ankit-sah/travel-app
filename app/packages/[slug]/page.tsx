import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PackageBookingForm } from "@/components/PackageBookingForm";
import { MapPin, Calendar, DollarSign, CheckCircle2, XCircle } from "lucide-react";

export const revalidate = 60;

interface PackagePageProps {
  params: Promise<{ slug: string }>;
}

async function getPackage(slug: string) {
  try {
    const pkg = await prisma.package.findUnique({
      where: { slug },
      include: {
        destination: {
          select: {
            name: true,
            slug: true,
          },
        },
      },
    });
    return pkg;
  } catch (error) {
    console.error("Error fetching package:", error);
    return null;
  }
}

export async function generateMetadata({ params }: PackagePageProps): Promise<Metadata> {
  const { slug } = await params;
  const pkg = await getPackage(slug);

  if (!pkg) {
    return {
      title: "Package Not Found",
    };
  }

  return {
    title: pkg.title,
    description: pkg.description.substring(0, 160),
  };
}

export default async function PackagePage({ params }: PackagePageProps) {
  const { slug } = await params;
  const pkg = await getPackage(slug);

  if (!pkg) {
    notFound();
  }

  return (
    <div className="py-12 bg-background">
      <div className="container max-w-6xl">
        <div className="mb-6">
          <Link href="/packages" className="text-primary hover:underline">
            ← Back to Packages
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Gallery */}
            <div className="space-y-4">
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <Image
                  src={pkg.images[0] || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200"}
                  alt={pkg.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {pkg.images.length > 1 && (
                <div className="grid grid-cols-3 gap-4">
                  {pkg.images.slice(1, 4).map((image, idx) => (
                    <div key={idx} className="relative h-32 rounded-lg overflow-hidden">
                      <Image src={image} alt={`${pkg.title} ${idx + 2}`} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>About This Package</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground whitespace-pre-line">{pkg.description}</p>
              </CardContent>
            </Card>

            {/* Highlights */}
            {pkg.highlights && pkg.highlights.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Highlights</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {pkg.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Destination Link */}
            {pkg.destination && (
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Destination</p>
                      <Link
                        href={`/destinations/${pkg.destination.slug}`}
                        className="text-lg font-semibold text-primary hover:underline flex items-center gap-2"
                      >
                        <MapPin className="h-5 w-5" />
                        {pkg.destination.name}
                      </Link>
                    </div>
                    <Link href={`/destinations/${pkg.destination.slug}`}>
                      <Button variant="outline">View Destination</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-2xl">{pkg.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <DollarSign className="h-5 w-5" />
                      <span>Price</span>
                    </div>
                    <span className="text-3xl font-bold text-primary">
                      ${pkg.price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-5 w-5" />
                      <span>Duration</span>
                    </div>
                    <span className="text-lg font-semibold">{pkg.duration} days</span>
                  </div>
                  {pkg.destination && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-5 w-5" />
                        <span>Destination</span>
                      </div>
                      <span className="text-lg font-semibold">{pkg.destination.name}</span>
                    </div>
                  )}
                </div>
                <PackageBookingForm packageId={pkg.id} packageTitle={pkg.title} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

