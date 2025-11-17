import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PackageGrid } from "@/components/PackageGrid";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowLeft } from "lucide-react";

export const revalidate = 60;

interface DestinationPageProps {
  params: Promise<{ slug: string }>;
}

async function getDestination(slug: string) {
  try {
    const destination = await prisma.destination.findUnique({
      where: { slug },
      include: {
        packages: {
          include: {
            destination: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    return destination;
  } catch (error) {
    console.error("Error fetching destination:", error);
    return null;
  }
}

export async function generateMetadata({ params }: DestinationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const destination = await getDestination(slug);

  if (!destination) {
    return {
      title: "Destination Not Found",
    };
  }

  return {
    title: destination.name,
    description: destination.description || `Explore travel packages in ${destination.name}`,
  };
}

export default async function DestinationPage({ params }: DestinationPageProps) {
  const { slug } = await params;
  const destination = await getDestination(slug);

  if (!destination) {
    notFound();
  }

  return (
    <div className="py-12 bg-background">
      <div className="container">
        <div className="mb-8">
          <Link href="/destinations">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Destinations
            </Button>
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="h-8 w-8 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold">{destination.name}</h1>
          </div>
          {destination.description && (
            <p className="text-muted-foreground text-lg max-w-3xl">{destination.description}</p>
          )}
        </div>

        {destination.packages.length > 0 ? (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold">
                Packages in {destination.name} ({destination.packages.length})
              </h2>
            </div>
            <PackageGrid packages={destination.packages} />
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No packages available for this destination yet. Check back soon!
            </p>
            <Link href="/packages" className="mt-4 inline-block">
              <Button>View All Packages</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

