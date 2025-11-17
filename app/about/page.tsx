import { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, Globe, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about our mission to provide exceptional travel experiences around the world.",
};

export default function AboutPage() {
  return (
    <div className="py-12 bg-background">
      <div className="container max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-muted-foreground text-lg">
            Your trusted partner for creating unforgettable travel experiences.
          </p>
        </div>

        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            At {process.env.NEXT_PUBLIC_SITE_NAME || "NBM Travel"}, we believe that travel has the power to
            transform lives, create lasting memories, and broaden horizons. With years of experience in
            the travel industry, we are passionate about curating exceptional journeys that exceed our
            clients' expectations.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            Our team of travel experts carefully selects each destination, package, and experience to
            ensure quality, authenticity, and value. We partner with trusted local providers worldwide
            to offer you unique insights into local cultures, cuisines, and traditions.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Whether you're seeking adventure, relaxation, cultural immersion, or a romantic getaway,
            we're here to help you plan the perfect trip tailored to your preferences and budget.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardHeader>
              <Heart className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To make exceptional travel accessible to everyone, creating meaningful experiences that
                inspire and connect people with the world around them.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Users className="h-10 w-10 text-accent mb-2" />
              <CardTitle>Our Team</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                A dedicated group of travel enthusiasts and industry experts committed to providing
                personalized service and unforgettable experiences.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Globe className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Global Reach</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                From bustling cities to remote paradises, we offer carefully curated experiences in
                destinations across the globe.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Award className="h-10 w-10 text-accent mb-2" />
              <CardTitle>Our Promise</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Quality, reliability, and exceptional customer service are at the heart of everything
                we do.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

