import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe, type CheckoutBody } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json(
      {
        error:
          "Stripe não configurado. Defina STRIPE_SECRET_KEY (sk_test_…) em .env.local. Veja .env.example e o README.",
        code: "STRIPE_SECRET_KEY_MISSING",
      },
      { status: 503 }
    );
  }

  let body: CheckoutBody;
  try {
    body = (await req.json()) as CheckoutBody;
  } catch {
    return NextResponse.json(
      { error: "JSON inválido no body.", code: "INVALID_JSON" },
      { status: 400 }
    );
  }

  const { mode, successUrl, cancelUrl } = body;
  if (mode !== "payment" && mode !== "subscription") {
    return NextResponse.json(
      {
        error: "mode deve ser 'payment' ou 'subscription'.",
        code: "INVALID_MODE",
      },
      { status: 400 }
    );
  }
  if (!successUrl || !cancelUrl) {
    return NextResponse.json(
      {
        error: "successUrl e cancelUrl são obrigatórios.",
        code: "MISSING_URLS",
      },
      { status: 400 }
    );
  }

  try {
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    const priceId =
      body.priceId?.trim() ||
      (mode === "subscription"
        ? process.env.STRIPE_PREMIUM_PRICE_ID?.trim() ||
          process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID?.trim()
        : undefined);

    if (priceId) {
      lineItems.push({ price: priceId, quantity: 1 });
    } else if (mode === "payment") {
      const currency = (body.currency || "brl").toLowerCase();
      const unitAmount = body.unitAmountCents ?? 2990;
      lineItems.push({
        quantity: 1,
        price_data: {
          currency,
          unit_amount: unitAmount,
          product_data: {
            name: body.productName || "Treino Live — VOD",
          },
        },
      });
    } else {
      return NextResponse.json(
        {
          error:
            "Assinatura exige priceId de um Price recorrente no Stripe Dashboard (test mode).",
          code: "PRICE_ID_REQUIRED",
        },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode,
      line_items: lineItems,
      success_url: successUrl,
      cancel_url: cancelUrl,
      customer_email: body.customerEmail,
      metadata: body.metadata,
      allow_promotion_codes: true,
    });

    if (!session.url) {
      return NextResponse.json(
        {
          error: "Checkout Session criada sem URL.",
          code: "NO_CHECKOUT_URL",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ url: session.url, id: session.id });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Falha ao criar Checkout Session.";
    console.error("[stripe/checkout]", message);
    return NextResponse.json(
      { error: message, code: "STRIPE_CHECKOUT_ERROR" },
      { status: 500 }
    );
  }
}
