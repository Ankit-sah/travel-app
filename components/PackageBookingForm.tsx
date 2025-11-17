"use client";

import { useState } from "react";
import { BookingForm } from "./BookingForm";
import { Button } from "./ui/button";

interface PackageBookingFormProps {
  packageId: string;
  packageTitle: string;
}

export function PackageBookingForm({ packageId, packageTitle }: PackageBookingFormProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)} size="lg" className="w-full">
        Book Now
      </Button>
      <BookingForm
        packageId={packageId}
        packageTitle={packageTitle}
        open={isOpen}
        onOpenChange={setIsOpen}
      />
    </>
  );
}

