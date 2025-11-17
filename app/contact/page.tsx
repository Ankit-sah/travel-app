import { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with our travel experts to plan your next adventure.",
};

export default function ContactPage() {
  return (
    <div className="py-12 bg-background">
      <div className="container max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-muted-foreground text-lg">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as
            possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card>
            <CardHeader>
              <Mail className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Email</CardTitle>
              <CardDescription>Send us an email anytime</CardDescription>
            </CardHeader>
            <CardContent>
              <a href="mailto:info@nbmtravel.com" className="text-primary hover:underline">
                info@nbmtravel.com
              </a>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Phone className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Phone</CardTitle>
              <CardDescription>Mon - Fri 9am - 6pm</CardDescription>
            </CardHeader>
            <CardContent>
              <a href="tel:+1234567890" className="text-primary hover:underline">
                +1 (234) 567-890
              </a>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Clock className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Office Hours</CardTitle>
              <CardDescription>We're here to help</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Monday - Friday: 9am - 6pm</p>
              <p>Saturday: 10am - 4pm</p>
              <p>Sunday: Closed</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Send us a Message</CardTitle>
            <CardDescription>Fill out the form below and we'll get back to you within 24-48 hours.</CardDescription>
          </CardHeader>
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

