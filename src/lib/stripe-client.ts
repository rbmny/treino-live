/**
 * Client helper: start Stripe Checkout when keys are configured.
 * Returns demoFallback so UI can keep localStorage demo flows.
 */

export type StartCheckoutInput = {
  mode: "payment" | "subscription";
  priceId?: string;
  productName?: string;
  unitAmountCents?: number;
  currency?: string;
  successPath: string;
  cancelPath: string;
  customerEmail?: string;
  metadata?: Record<string, string>;
};

export type StartCheckoutResult =
  | { ok: true; redirected: true }
  | {
      ok: false;
      demoFallback: true;
      code?: string;
      error?: string;
    };

function absoluteUrl(path: string): string {
  if (typeof window === "undefined") return path;
  const base = window.location.origin;
  return path.startsWith("http") ? path : `${base}${path.startsWith("/") ? "" : "/"}${path}`;
}

/** Prefer env Price for Premium; optional override in the request body. */
export function getPremiumPriceId(): string | undefined {
  const id = process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID?.trim();
  return id || undefined;
}

export async function startCheckout(
  input: StartCheckoutInput
): Promise<StartCheckoutResult> {
  try {
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mode: input.mode,
        priceId: input.priceId,
        productName: input.productName,
        unitAmountCents: input.unitAmountCents,
        currency: input.currency ?? "brl",
        successUrl: absoluteUrl(input.successPath),
        cancelUrl: absoluteUrl(input.cancelPath),
        customerEmail: input.customerEmail,
        metadata: input.metadata,
      }),
    });

    const data = (await res.json().catch(() => ({}))) as {
      url?: string;
      id?: string;
      error?: string;
      code?: string;
    };

    if (res.status === 503 || data.code === "STRIPE_SECRET_KEY_MISSING") {
      return {
        ok: false,
        demoFallback: true,
        code: data.code,
        error: data.error,
      };
    }

    if (!res.ok || !data.url) {
      // Misconfigured price / API error — still allow demo so the funnel never bricks
      return {
        ok: false,
        demoFallback: true,
        code: data.code ?? "STRIPE_CHECKOUT_ERROR",
        error: data.error ?? `HTTP ${res.status}`,
      };
    }

    window.location.assign(data.url);
    return { ok: true, redirected: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "network error";
    return {
      ok: false,
      demoFallback: true,
      code: "NETWORK",
      error: message,
    };
  }
}
