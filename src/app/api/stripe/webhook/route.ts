import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

/**
 * Stripe webhook stub (test mode).
 * Verifies STRIPE_WEBHOOK_SECRET, then logs structured TODOs for:
 * - checkout.session.completed
 * - customer.subscription.created / updated / deleted
 *
 * Local: `stripe listen --forward-to localhost:3000/api/stripe/webhook`
 */
export async function POST(req: NextRequest) {
  const stripe = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET?.trim();

  if (!stripe) {
    return NextResponse.json(
      {
        error: "STRIPE_SECRET_KEY ausente.",
        code: "STRIPE_SECRET_KEY_MISSING",
      },
      { status: 503 }
    );
  }
  if (!webhookSecret) {
    return NextResponse.json(
      {
        error:
          "STRIPE_WEBHOOK_SECRET ausente. Use o whsec_… do `stripe listen` ou do Dashboard.",
        code: "STRIPE_WEBHOOK_SECRET_MISSING",
      },
      { status: 503 }
    );
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json(
      { error: "Header stripe-signature ausente.", code: "MISSING_SIGNATURE" },
      { status: 400 }
    );
  }

  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Assinatura inválida.";
    console.error("[stripe/webhook] verify failed:", message);
    return NextResponse.json(
      { error: `Webhook Error: ${message}`, code: "INVALID_SIGNATURE" },
      { status: 400 }
    );
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      // TODO: marcar VOD como comprado / ativar premium no Supabase (user id via client_reference_id / metadata)
      console.info(
        JSON.stringify({
          source: "stripe/webhook",
          type: event.type,
          sessionId: session.id,
          mode: session.mode,
          customer: session.customer,
          customerEmail:
            session.customer_details?.email ?? session.customer_email,
          paymentStatus: session.payment_status,
          subscription: session.subscription,
          metadata: session.metadata,
          todo: "Persist purchase/subscription entitlement in Supabase",
        })
      );
      break;
    }
    case "customer.subscription.created":
    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;
      // TODO: sincronizar status premium (active / canceled / past_due) com a tabela de assinaturas
      console.info(
        JSON.stringify({
          source: "stripe/webhook",
          type: event.type,
          subscriptionId: sub.id,
          customer: sub.customer,
          status: sub.status,
          cancelAtPeriodEnd: sub.cancel_at_period_end,
          cancelAt: sub.cancel_at,
          metadata: sub.metadata,
          todo: "Sync premium subscription status to Supabase",
        })
      );
      break;
    }
    default:
      console.info(
        JSON.stringify({
          source: "stripe/webhook",
          type: event.type,
          id: event.id,
          note: "Unhandled event type (ack only)",
        })
      );
  }

  return NextResponse.json({ received: true });
}
