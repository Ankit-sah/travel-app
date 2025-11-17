import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set in environment variables");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-11-20.acacia",
  typescript: true,
});

// Convert price from dollars to cents (Stripe uses cents)
export function formatAmountForStripe(amount: number): number {
  return Math.round(amount * 100);
}

// Convert price from cents to dollars
export function formatAmountFromStripe(amount: number): number {
  return amount / 100;
}

