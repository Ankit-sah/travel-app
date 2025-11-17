import { Hero } from "@/components/Hero";
import { PackageGrid } from "@/components/PackageGrid";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Shield, Star } from "lucide-react";

export const revalidate = 60; // Revalidate every 60 seconds

async function getFeaturedPackages() {
  try {
    const packages = await prisma.package.findMany({
      take: 6,
      include: {
        destination: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return packages;
  } catch (error) {
    console.error("Error fetching packages:", error);
    return [];
  }
}

export default async function HomePage() {
  const featuredPackages = await getFeaturedPackages();

  return (
    <div>
      <Hero />
      <section className="py-16 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We provide exceptional travel experiences with carefully curated packages and personalized
              service.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <Card>
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Trusted & Secure</CardTitle>
                <CardDescription>
                  Your safety and satisfaction are our top priorities. We partner with verified
                  providers worldwide.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Star className="h-12 w-12 text-accent mb-4" />
                <CardTitle>Curated Experiences</CardTitle>
                <CardDescription>
                  Hand-picked destinations and experiences designed to create lasting memories.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <MapPin className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Expert Guidance</CardTitle>
                <CardDescription>
                  Our travel experts are here to help you plan the perfect trip tailored to your
                  preferences.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/50">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Featured Packages</h2>
              <p className="text-muted-foreground">Discover our most popular travel experiences</p>
            </div>
            <Link href="/packages">
              <Button variant="outline">View All</Button>
            </Link>
          </div>
          <PackageGrid packages={featuredPackages} />
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Plan Your Trip?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              Contact us today and let our travel experts help you create an unforgettable journey.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg">Get in Touch</Button>
              </Link>
              <Link href="/packages">
                <Button size="lg" variant="outline">
                  Explore Packages
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

