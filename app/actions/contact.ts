"use server";

import { contactSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";

export async function submitContact(formData: FormData) {
  try {
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    };

    const validatedData = contactSchema.parse(data);

    // Email stub - in production, replace with actual email service
    console.log("📧 Contact Form Submission Email:");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(`To: info@nbmtravel.com`);
    console.log(`Subject: New Contact Form Submission from ${validatedData.name}`);
    console.log(`From: ${validatedData.email}`);
    console.log("");
    console.log(`Name: ${validatedData.name}`);
    console.log(`Email: ${validatedData.email}`);
    console.log("");
    console.log(`Message:`);
    console.log(validatedData.message);
    console.log("");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

    // Auto-reply email stub
    console.log("\n📧 Auto-Reply Email:");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(`To: ${validatedData.email}`);
    console.log(`Subject: Thank you for contacting NBM Travel`);
    console.log(`From: noreply@nbmtravel.com`);
    console.log("");
    console.log(`Dear ${validatedData.name},`);
    console.log("");
    console.log("Thank you for reaching out to NBM Travel!");
    console.log("We have received your message and will respond within 24-48 hours.");
    console.log("");
    console.log("Best regards,");
    console.log("NBM Travel Team");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

    revalidatePath("/contact");

    return {
      success: true,
      message: "Message sent successfully! We'll get back to you soon.",
    };
  } catch (error) {
    console.error("Contact form error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to send message.",
    };
  }
}

