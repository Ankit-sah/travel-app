import Link from "next/link";
import { Plane } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t bg-muted/50">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Plane className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">
                {process.env.NEXT_PUBLIC_SITE_NAME || "NBM Travel"}
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your trusted travel partner for unforgettable journeys around the world.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/packages"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Packages
                </Link>
              </li>
              <li>
                <Link
                  href="/destinations"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Destinations
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <a
                  href="mailto:info@nbmtravel.com"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Email Us
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {currentYear} {process.env.NEXT_PUBLIC_SITE_NAME || "NBM Travel"}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

