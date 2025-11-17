"use server";

import { prisma } from "@/lib/prisma";
import { bookingSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";

export async function submitBooking(formData: FormData) {
  try {
    const data = {
      packageId: formData.get("packageId") as string,
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string | null,
      message: formData.get("message") as string | null,
    };

    const validatedData = bookingSchema.parse(data);

    // Save to database
    const booking = await prisma.booking.create({
      data: validatedData,
      include: {
        package: {
          select: {
            title: true,
          },
        },
      },
    });

    const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Travel App";
    const noreplyEmail = process.env.NEXT_PUBLIC_NOREPLY_EMAIL || "noreply@travelapp.com";

    // Email stub - in production, replace with actual email service
    console.log("📧 Booking Notification Email:");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(`To: ${booking.email}`);
    console.log(`Subject: Booking Confirmation - ${booking.package.title}`);
    console.log(`From: ${noreplyEmail}`);
    console.log("");
    console.log(`Dear ${booking.name},`);
    console.log("");
    console.log(`Thank you for your booking request for "${booking.package.title}".`);
    console.log(`We have received your inquiry and will contact you shortly.`);
    console.log("");
    console.log("Booking Details:");
    console.log(`- Package: ${booking.package.title}`);
    console.log(`- Email: ${booking.email}`);
    if (booking.phone) console.log(`- Phone: ${booking.phone}`);
    if (booking.message) console.log(`- Message: ${booking.message}`);
    console.log("");
    console.log("Best regards,");
    console.log(`${siteName} Team`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

    revalidatePath("/packages");
    revalidatePath("/contact");

    return {
      success: true,
      message: "Booking request submitted successfully! We'll contact you soon.",
    };
  } catch (error) {
    console.error("Booking error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to submit booking request.",
    };
  }
}

