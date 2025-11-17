import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn("⚠️ STRIPE_SECRET_KEY is not set. Payment features will not work.");
}

export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2023-10-16",
      typescript: true,
    })
  : null;

// Convert price from dollars to cents (Stripe uses cents)
export function formatAmountForStripe(amount: number): number {
  return Math.round(amount * 100);
}

// Convert price from cents to dollars
export function formatAmountFromStripe(amount: number): number {
  return amount / 100;
}

