import { Metadata } from "next";
import { PackageGrid } from "@/components/PackageGrid";
import { prisma } from "@/lib/prisma";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Packages",
  description: "Browse our curated selection of travel packages and tours.",
};

async function getAllPackages() {
  try {
    const packages = await prisma.package.findMany({
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

export default async function PackagesPage() {
  const packages = await getAllPackages();

  return (
    <div className="py-12 bg-background">
      <div className="container">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Travel Packages</h1>
          <p className="text-muted-foreground text-lg">
            Explore our handpicked selection of unforgettable travel experiences.
          </p>
        </div>
        <PackageGrid packages={packages} />
      </div>
    </div>
  );
}

