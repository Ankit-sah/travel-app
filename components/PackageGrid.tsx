import { PackageCard } from "./PackageCard";

interface Package {
  id: string;
  slug: string;
  title: string;
  description: string;
  images: string[];
  price: number;
  duration: number;
  destination?: {
    name: string;
  };
}

interface PackageGridProps {
  packages: Package[];
}

export function PackageGrid({ packages }: PackageGridProps) {
  if (packages.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No packages found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {packages.map((pkg) => (
        <PackageCard key={pkg.id} {...pkg} />
      ))}
    </div>
  );
}

