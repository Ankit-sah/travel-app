import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center bg-gradient-to-r from-primary/10 via-background to-accent/10">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920')",
        }}
      />
      <div className="container relative z-10 text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Discover Your Next
          <br />
          <span className="text-primary">Adventure</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
          Curated travel experiences that create memories to last a lifetime. Explore the world with
          confidence.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/packages">
            <Button size="lg" className="text-lg px-8">
              Explore Packages
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/contact">
            <Button size="lg" variant="outline" className="text-lg px-8">
              Plan Your Trip
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

