# Treino Live

App mobile-first de fitness trainer (UI em **PT-BR**): live gratuita (topo de funil), VODs, Premium Live, **protocolos**, Fast Trainer, corrida, adaptações, ebook e loja.

Demo completa **sem chaves Stripe** — auth, compras, assinatura e progresso persistem em `localStorage` (`treino-live-demo-v2`).

## Como rodar

```bash
cd treino-live
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).  
Layout pensado para ~430px (mobile). Sem fake phone bezel.

```bash
npm run build && npm start   # produção local
```

## Feature map / rotas

| Rota | Tela | Notas |
|------|------|--------|
| `/` | Início / Home | Hero **Free Live** + Continuar + funil VOD/Premium + Explorar (adaptações, ebook, corrida, treinos). Sem “Métodos em destaque” / “Por grupo muscular” na Home |
| `/treinos` | Hub de treinos | Fast Trainer, protocolos Inter/Avançado, métodos, grid de grupos musculares com silhuetas |
| `/treinos/protocolo/inter` | Protocolo Intermediário | Sessões com highlights + % persistido |
| `/treinos/protocolo/avancado` | Protocolo Avançado | Blocos de periodização + % persistido |
| `/treinos/fast` | Fast / Quicky Trainer | Timer real (work/rest · 4 rounds) → toast + streak |
| `/treinos/corpo/[part]` | Grupo muscular | Peito, Costas, Bíceps, Tríceps, Ombros, Glúteo, Pernas, Full, Core |
| `/corrida` | Hub corrida | 0→5 km e 0→10 km |
| `/corrida/5k` · `/corrida/10k` | Programa | Semanas/fases + dias marcáveis |
| `/adaptacoes` | Hub adaptações | Lipedema, gestação, joelho, coluna |
| `/adaptacoes/[id]` | Detalhe | Exercícios + salvar no plano |
| `/ebook` | Ebook nutri | Capa + capítulos marcáveis como lidos |
| `/loja` | Marketplace | Grid com preços · buy demo → owned |
| `/library` | Biblioteca VOD | 6 treinos compra única (legado do funil) |
| `/workout/[id]` | Detalhe VOD | Checkout Stripe-shaped / demo |
| `/live/free` | Sala Free Live | Sem login · join +1 viewer · chat na session · upsells |
| `/live/premium` | Lobby Premium Live | Gate por assinatura demo |
| `/account` | Perfil | Auth, streak, protocolo %, ebook, VODs, loja, portal |
| `/trainer` | Host panel | Go live (free) mock |

**Bottom nav:** Início · Treinos · Live · Loja · Perfil

## O que ficou mais funcional (demo)

- Progresso persistido: protocolo %, dias de corrida, capítulos do ebook, VODs, itens da loja, premium, streak, adaptações salvas
- Fast Trainer: countdown work/rest que completa workout → toast + streak
- Free live: join incrementa viewers (1×/sessão); mensagens do chat ficam em `sessionStorage`
- Loja: “Comprar” adiciona a `ownedShopIds` (Plano Anual também ativa Premium)
- Upsells Free Live → VOD / Premium mantidos
- Silhuetas SVG e ilustrações portadas de `trainer-preview` como componentes React

## Seed de dados

- Live free + live premium  
- 6 VODs (R$ 14,90–29,90)  
- Premium R$ 49,90/mês  
- Protocolos Inter (8 sem) / Avançado (12 sem)  
- Fast Quicky 15 min · 5 exercícios · 4 rounds  
- Corrida 5k / 10k  
- 4 adaptações · ebook 7 capítulos · 6 produtos loja  

Fontes: `src/lib/data.ts`, `src/lib/content.ts`

## O que é demo vs. real

| Recurso | Status |
|---------|--------|
| UI / navegação / funil / módulos Treino+ | Real (Next.js App Router) |
| Auth | **Demo** — localStorage |
| Checkout VOD / Loja / Assinatura | **Demo** — modais / local buy |
| Live / player / chat | **Mock** — session chat, sem WebRTC |
| Fast timer | **Funcional** no client |
| Pagamentos reais | Não — sem Stripe keys (fallback demo) |

## Wiring Stripe + Supabase

Stubs em `src/lib/stripe*`, `src/app/api/stripe/*` (moved to `_api_server_only/` for Pages), `src/lib/supabase/*` + `.env.example`.  
UI demo não depende de keys; com `STRIPE_SECRET_KEY` o checkout tenta Hosted Checkout.

## Stack

- Next.js 14 (App Router) + TypeScript + Tailwind  
- System fonts · Apple Fitness–like cards · mobile-first · silhuetas SVG

## GitHub Pages (static export)

This app can be statically exported for project Pages at
`https://rbmny.github.io/treino-plus-preview/`.

`next.config.mjs` sets `output: 'export'`, `basePath` / `assetPrefix`
`/treino-plus-preview`, and `images.unoptimized`.

**API routes:** Next static export cannot include `src/app/api/**`.
Server-only Stripe stubs live in `_api_server_only/` (moved out of `src/app`
for the Pages build). Demo UI uses localStorage modals and does not need them.
To run with real Stripe locally, move `_api_server_only` back to `src/app/api`
and remove or relax `output: 'export'`.

```bash
npm run build   # writes out/
```

Deploy: copy `out/` (plus `.nojekyll`) to `rbmny/treino-plus-preview` repo root.
