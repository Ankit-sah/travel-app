import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin } from "lucide-react";

interface PackageCardProps {
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

export function PackageCard({
  slug,
  title,
  description,
  images,
  price,
  duration,
  destination,
}: PackageCardProps) {
  const excerpt = description.length > 150 ? description.substring(0, 150) + "..." : description;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 w-full">
        <Image
          src={images[0] || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800"}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-2">{title}</CardTitle>
        <CardDescription className="line-clamp-2">{excerpt}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          {destination && (
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{destination.name}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{duration} days</span>
          </div>
        </div>
        <div className="text-2xl font-bold text-primary">
          ${price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/packages/${slug}`} className="w-full">
          <Button className="w-full">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

