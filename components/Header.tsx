import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plane } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Plane className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">
            {process.env.NEXT_PUBLIC_SITE_NAME || "NBM Travel"}
          </span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
            Home
          </Link>
          <Link
            href="/packages"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Packages
          </Link>
          <Link
            href="/destinations"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Destinations
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            About
          </Link>
          <Link href="/contact">
            <Button>Contact Us</Button>
          </Link>
        </nav>
        <div className="md:hidden">
          <Link href="/contact">
            <Button size="sm">Contact</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

