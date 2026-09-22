# Treino Live

App mobile-first de fitness trainer (UI em **PT-BR**): live gratuita (topo de funil), VODs com compra única e assinatura Premium Live.

Demo completa **sem chaves Stripe** — auth, compras e assinatura persistem em `localStorage`.

## Como rodar

```bash
cd treino-live
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).  
Layout pensado para ~430px (mobile). No desktop, a coluna central simula o app.

```bash
npm run build && npm start   # produção local
```

## Feature map / rotas

| Rota | Tela | Notas |
|------|------|--------|
| `/` | Descobrir / Home | Hero da live **grátis** + cards de funil + VODs em destaque |
| `/live/free` | Sala Free Live | Sem login · chat mock · contador · upsell sheet |
| `/library` | Biblioteca VOD | 6 treinos com preços em BRL · filtros |
| `/workout/[id]` | Detalhe do treino | Comprar (checkout demo) ou assistir se owned |
| `/live/premium` | Lobby Premium Live | Trancado vs. assinado · sala exclusiva |
| `/account` | Conta | Sign-in demo · compras · portal de assinatura |
| `/trainer` | Host panel | “Go live (free)” mock para o trainer |

## Seed de dados

- **1 live free** — Full Body ao vivo  
- **1 live premium** — Hipertrofia avançada  
- **6 VODs** — Força, HIIT, Yoga, Mobilidade, Cardio, Core (R$ 14,90–29,90)  
- **Premium** — R$ 49,90/mês  

Fonte: `src/lib/data.ts`

## O que é demo vs. real

| Recurso | Status |
|---------|--------|
| UI / navegação / funil | Real (Next.js App Router) |
| Auth (magic link / senha) | **Demo** — `localStorage` (`treino-live-demo-v1`) |
| Checkout VOD (Stripe-shaped) | **Demo** — modal → marca owned |
| Assinatura Premium | **Demo** — modal + Customer Portal mock |
| Live / player / chat | **Mock** — gradients + timers, sem WebRTC |
| Pagamentos reais | Não — sem Stripe keys |

Fluxo de sucesso esperado: Free live → upsells → comprar VOD → assinar Premium → entrar na Premium Live.

## Wiring real Stripe + Supabase later

Stubs já no repo (não usados pelo fluxo demo de UI):

- `src/lib/stripe.ts` + `src/app/api/stripe/checkout|webhook` — retornam 503 sem `STRIPE_SECRET_KEY`
- `src/lib/supabase/*` — clients opcionais
- `.env.example` — variáveis de teste

A UI demo **não chama** essas rotas; Checkout/Subscribe/Portal são modais localStorage.

Quando for para produção:

1. **Supabase Auth**  
   - Substituir `src/lib/store.ts` por sessão Supabase (magic link real).  
   - Tabelas: `profiles`, `purchases` (`user_id`, `workout_id`), `subscriptions`.

2. **Stripe Checkout (one-time VODs)**  
   - Products/Prices por VOD em BRL.  
   - API route `checkout.sessions.create` com `mode: "payment"`.  
   - Webhook `checkout.session.completed` → inserir em `purchases`.

3. **Stripe Subscriptions + Customer Portal**  
   - Price recorrente Premium.  
   - `mode: "subscription"` no Checkout.  
   - Portal: `billingPortal.sessions.create` (substituir `PortalModal`).  
   - Webhooks: `customer.subscription.updated|deleted`.

4. **Live streaming**  
   - Mux / IVS / Cloudflare Stream para free + premium.  
   - Gate premium no edge/middleware checando assinatura ativa.

5. **Env**  
   ```env
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_ANON_KEY=
   STRIPE_SECRET_KEY=
   STRIPE_WEBHOOK_SECRET=
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
   ```

Arquivos centrais hoje: `src/lib/store.ts` (demo persist), `src/components/CheckoutModal.tsx`, `SubscribeModal.tsx`, `PortalModal.tsx`, `AuthModal.tsx`.

## Stack

- Next.js 14 (App Router) + TypeScript + Tailwind CSS  
- System fonts · Apple Fitness–like cards · mobile-first  

## GitHub

Repo alvo: [rbmny/treino-live](https://github.com/rbmny/treino-live) (público).

```bash
git init
git add .
git commit -m "Initial Treino Live demo app"
git branch -M main
git remote add origin https://github.com/rbmny/treino-live.git
git push -u origin main
```

Não alterar `rbmny/treino-plus-preview`.
