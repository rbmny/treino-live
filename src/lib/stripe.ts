import Stripe from "stripe";

let stripeSingleton: Stripe | null = null;

/**
 * Server-side Stripe client (test mode when STRIPE_SECRET_KEY is sk_test_…).
 * Returns null when the secret key is missing so callers can return a clear error.
 */
export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key) return null;
  if (!stripeSingleton) {
    stripeSingleton = new Stripe(key, {
      // Pin to the version shipped with the installed `stripe` package.
      apiVersion: "2026-08-26.dahlia",
      typescript: true,
    });
  }
  return stripeSingleton;
}

/** Publishable key for client-side Stripe.js (prefer NEXT_PUBLIC_ prefix). */
export function getStripePublishableKey(): string | null {
  const key =
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.trim() ||
    process.env.STRIPE_PUBLISHABLE_KEY?.trim() ||
    null;
  return key || null;
}

export type CheckoutBody = {
  mode: "payment" | "subscription";
  /** Existing Stripe Price id (preferred for subscriptions / catalog prices). */
  priceId?: string;
  /** Used with ad-hoc `price_data` when priceId is omitted (one-time payment). */
  productName?: string;
  /** Amount in the smallest currency unit (e.g. centavos). Default 2990 (R$ 29,90). */
  unitAmountCents?: number;
  /** ISO currency. Default brl. */
  currency?: string;
  successUrl: string;
  cancelUrl: string;
  customerEmail?: string;
  metadata?: Record<string, string>;
};
