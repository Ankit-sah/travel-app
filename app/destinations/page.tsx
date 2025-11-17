import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowRight } from "lucide-react";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Destinations",
  description: "Explore our amazing travel destinations around the world.",
};

async function getAllDestinations() {
  try {
    const destinations = await prisma.destination.findMany({
      include: {
        _count: {
          select: {
            packages: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });
    return destinations;
  } catch (error) {
    console.error("Error fetching destinations:", error);
    return [];
  }
}

export default async function DestinationsPage() {
  const destinations = await getAllDestinations();

  return (
    <div className="py-12 bg-background">
      <div className="container">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore Destinations</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover incredible places around the world with our curated selection of destinations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((destination) => (
            <Card key={destination.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48 w-full">
                <Image
                  src={`https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&sig=${destination.slug}`}
                  alt={destination.name}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  {destination.name}
                </CardTitle>
                <CardDescription>{destination.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {destination._count.packages} package{destination._count.packages !== 1 ? "s" : ""} available
                </p>
                <Link href={`/destinations/${destination.slug}`}>
                  <Button className="w-full">
                    Explore Packages
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

