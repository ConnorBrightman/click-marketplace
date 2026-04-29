# Click Marketplace

**The UK's used vehicle marketplace — natively connected to ClickDealer.**

Click Marketplace is a consumer-facing vehicle search platform built on top of ClickDealer's existing DMS and dealer network. Where Autotrader sits outside the dealership and requires separate stock uploads and lead management, Click Marketplace is part of the same platform dealers already use every day. One stock entry publishes to the dealer's own website and to the marketplace simultaneously. Every lead flows directly into the ClickDMS CRM. Every sale closes the loop.

---

## Project structure

```
click-marketplace/
├── api/          # Go REST API (Chi router, PostgreSQL, Redis)
├── web/          # Next.js 14 frontend (App Router, Tailwind CSS)
└── dms-sync/     # DMS integration service
```

### Tech stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router), Tailwind CSS |
| Backend | Go, Chi router |
| Database | PostgreSQL |
| Cache | Redis |
| Infrastructure | Docker Compose |

---

## The opportunity

Autotrader dominates the UK vehicle marketplace with 454,000+ listings, 84 million monthly visits, and deep brand trust built over three decades. But they have a fundamental weakness: **they sit outside the dealership**. Autotrader is a separate system that dealers must feed data into — separate logins, separate stock uploads, separate lead management.

ClickDealer already powers the DMS and websites for thousands of independent dealers. That means we're already inside the dealership's daily workflow. Click Marketplace isn't a bolt-on advertising channel — it's the natural third pillar of a platform dealers already depend on. One system, one stock entry, one lead pipeline. That's the pitch Autotrader can never make.

---

## What Autotrader does well (and we must match)

Before we can differentiate, we need to meet the baseline expectations of UK car buyers. These are the features consumers now take for granted when searching for a vehicle online.

### Vehicle history checks

Autotrader runs a free 5-point check on every listing — covering stolen, scrapped, written-off, imported, and exported status — using data from police databases, the DVLA, insurance companies, and finance houses. They also offer a paid 26-point full vehicle check for £5.95, covering previous owners, colour changes, outstanding finance, and third-party trace alerts.

**What we need:** Partner with Experian or HPI to offer an equivalent free check on all listings at minimum, with a paid deep-dive option. No vehicle should appear on Click Marketplace without a basic history verification. This is the single biggest trust signal for consumers.

### Price indicator

Autotrader shows a price rating on every listing — great deal, good deal, fair price, above market — by comparing the advertised price against similar vehicles of the same make, model, spec, and derivative. This is powered by their valuation engine, which processes over 800,000 live adverts, 3,500+ dealer websites, and major auction results daily.

**What we need:** A price comparison engine that benchmarks each listing against the wider market. Even a simpler version (e.g. percentile ranking against similar vehicles) would provide the transparency buyers expect. This also benefits dealers — it gives them confidence that their pricing is competitive.

### Free car valuation tool

Consumers can enter their registration and mileage on Autotrader and instantly receive a private sale value and part-exchange value. This is one of the highest-traffic entry points on the platform, driving millions of visits from people considering selling or trading in their car.

**What we need:** A consumer-facing valuation tool on Click Marketplace. This generates seller traffic (which feeds dealer part-exchange opportunities) and positions the marketplace as a starting point in the ownership lifecycle, not just a search engine for buyers.

### Advanced search & filters

Autotrader offers extensive filtering: make, model, price range, mileage, fuel type, body style, transmission, colour, doors, seats, drivetrain, EV battery range, charging speed, emissions, insurance group, and postcode radius. Their app adds saved searches with push notification alerts when matching vehicles are listed.

**What we need:** Comprehensive filtering from day one. Missing a key filter (e.g. EV range, insurance group) signals to buyers that the platform is immature. Saved searches with email and push alerts are essential for retention — they keep users coming back without requiring marketing spend.

### Finance integration

Buyers can see PCP, HP, and lease quotes directly on vehicle detail pages. Autotrader also offers online credit applications and personalised payment options, letting buyers start the finance process before contacting the dealer.

**What we need:** Monthly payment estimates on every listing, with the ability to adjust deposit, term length, and annual mileage. This shifts the buyer's mental model from "I can't afford £25,000" to "I can afford £320/month." Given that ClickDealer already integrates finance applications into the DMS, we have a head start here.

### Dealer reviews & trust signals

Autotrader has "Highly Rated" badges for dealers who meet customer service criteria, annual Retailer Awards, and Feefo-powered dealer reviews visible on every listing. 93% of consumers say online reviews influence their purchase decisions.

**What we need:** A verified buyer review system tied to actual transactions (which we can confirm through the DMS — another advantage). "Highly Rated" or equivalent trust badges on listings. A dealer storefront page showcasing reviews, photos of the dealership, and key selling points.

### Vehicle comparison

Buyers can shortlist vehicles and compare them side-by-side on specs, price, running costs, and insurance group.

**What we need:** A shortlist and comparison feature. This is relatively straightforward to build and has a meaningful impact on conversion — it helps indecisive buyers narrow their choices without leaving the platform.

---

## Where we win: the DMS advantage

These are features that are only possible — or dramatically better — because Click Marketplace is built on the same platform as ClickDMS and ClickDealer websites. This is the moat.

### Zero-effort listing

**The problem Autotrader has:** Dealers must upload stock to Autotrader separately — either through a manual portal, a third-party feed, or an API integration. This creates lag, errors, and duplicated effort.

**Our advantage:** When a dealer adds a vehicle to ClickDMS — entering specs, uploading photos, setting a price — that vehicle automatically publishes to Click Marketplace. No second login. No feed configuration. No re-keying of data. The marketplace listing is a byproduct of normal stock management, not an additional task.

### Real-time stock accuracy

**The problem Autotrader has:** Phantom listings. A dealer sells a car on Saturday afternoon, but it stays on Autotrader until Monday when someone remembers to mark it as sold. Consumers call about vehicles that don't exist. Dealers waste time on dead enquiries.

**Our advantage:** Vehicle sold in the DMS = instantly removed from Click Marketplace. Reserved? Marked as such in real time. Price adjusted? Updated live. This isn't just a convenience — it's a measurable trust signal. We can market "every vehicle you see is genuinely available right now" as a core differentiator.

### End-to-end lead-to-sale tracking

**The problem Autotrader has:** Autotrader delivers leads, but the dealer has to manually track what happens next. Did that email enquiry convert to a test drive? Did the test drive convert to a sale? Autotrader can't answer those questions because they don't see the other side of the transaction.

**Our advantage:** A marketplace enquiry flows directly into the ClickDMS CRM. The dealer handles it through the same lead management workflow they use for walk-ins, phone calls, and website enquiries. When that lead converts to a sale (invoiced through the DMS), we can close the loop. For the first time, dealers can see true cost-per-sale from their marketplace spend, broken down by make, model, price band, or any other dimension.

### Dealer website synchronisation

**The problem Autotrader has:** A dealer's own website and their Autotrader listings are separate ecosystems. Pricing might differ. Photos might differ. A vehicle might be on one but not the other.

**Our advantage:** ClickDealer already powers dealer websites. A single stock entry in the DMS publishes simultaneously to the dealer's own website *and* Click Marketplace — same photos, same price, same description, same availability. This consistency builds consumer confidence and eliminates an entire category of dealer admin.

### Integrated finance applications

**The problem Autotrader has:** When a buyer applies for finance through Autotrader, the application arrives at the dealer as an external lead that needs to be manually entered into their finance processing system.

**Our advantage:** ClickDMS already handles finance applications, deal stacking, and sales completion in a single workflow. A finance application submitted on Click Marketplace can pre-populate directly into the dealer's DMS — no re-entry, no switching systems.

### Live margin & performance visibility

**The problem Autotrader has:** Autotrader can show dealers how their listings perform on the platform (views, enquiries, price position), but they can't show the business metrics that actually matter — purchase cost, margin, days in stock, cost-to-market ratio.

**Our advantage:** The DMS holds the vehicle's purchase price, preparation costs, and all associated expenses. Click Marketplace can surface real-time margin visibility alongside marketplace performance data. A dealer can see: "This BMW 3 Series has been listed for 22 days, has had 340 views and 4 enquiries, was purchased for £18,200, is listed at £21,995, and my current margin is £2,640 after prep costs." That's decision-grade intelligence that no external marketplace can provide.

### Part-exchange flow

A buyer values their car on Click Marketplace and sees an estimated part-exchange figure. The dealer sees that valuation in the DMS alongside the trade/retail spread and can begin structuring the deal before the customer even visits. The deal stacks from marketplace enquiry to invoice without leaving the platform.

### AI-powered ad creation (built into the workflow)

Autotrader launched Co-Driver in late 2024 — an AI suite that auto-generates vehicle descriptions, manages images, and highlights key features. It's now used by 85% of retailers on the platform. Our equivalent has a structural advantage: it can pull from the richer spec data already in the DMS (including VIN-decoded optional extras, service history flags, and preparation notes) rather than requiring dealers to input data into a separate tool.

---

## Growth-stage features (Phase 2)

Once the core marketplace and DMS integration are live, these features drive scale and long-term competitiveness.

### Editorial content & reviews

Autotrader's editorial operation — expert car reviews, buying guides, EV content, video reviews — drives significant organic search traffic. This is a long-term SEO investment, not a launch requirement, but it should begin within 6 months of launch. Start with buying guides for the most-searched vehicle categories and expand from there.

### Private seller listings

Initially, Click Marketplace will feature dealer stock only. Adding private seller listings dramatically increases inventory volume and makes the marketplace a destination for all buyers. This also creates a natural acquisition funnel: private sellers often buy their next vehicle from a dealer, and we can facilitate that transition within the platform.

### Home delivery & click-and-collect

Allow dealers to offer delivery and collection options visible on each listing. Distance selling expands each dealer's catchment area from a local radius to a national audience.

### Native mobile app

Autotrader's app has 4.8 stars on iOS and is the primary browsing interface for a large share of their audience. A native app with push notifications for saved searches, camera-based listing creation for private sellers, and a smooth browsing experience is essential for competing at scale.

---

## The pitch in one paragraph

ClickDealer already runs the engine room for thousands of UK dealers — their stock management, their websites, their finance processing. Click Marketplace is the natural extension: a consumer-facing vehicle marketplace that's natively connected to the DMS, so every vehicle is accurate, every lead is tracked, and every sale is attributed. Dealers get one platform instead of three disconnected systems. Buyers get a marketplace where every listing is genuinely available. And unlike Autotrader, we don't just deliver leads — we can prove which ones made money.

---

## Competitive comparison

| Feature | Autotrader | Click Marketplace |
|---|---|---|
| Vehicle listings | 454,000+ | Growing (DMS dealer network) |
| Vehicle history check | Free 5-point + paid full check | Required (via Experian/HPI) |
| Price indicator | Yes (data-driven) | Required |
| Free car valuation | Yes | Required |
| Finance on listings | Yes (PCP, HP, lease quotes) | Required (DMS-integrated) |
| Dealer reviews | Yes (Feefo) | Required |
| AI ad creation | Co-Driver (85% adoption) | DMS-powered (richer data source) |
| Real-time stock sync | No (feed-based, delayed) | **Yes (native DMS sync)** |
| Lead-to-sale attribution | No (lead delivery only) | **Yes (full CRM pipeline)** |
| Dealer website sync | No (separate system) | **Yes (one entry, two storefronts)** |
| Live margin visibility | No (no cost data) | **Yes (DMS purchase records)** |
| Integrated finance apps | Partial (external handoff) | **Yes (pre-populates in DMS)** |
| Editorial content | Extensive (30+ years) | Phase 2 priority |
| Mobile app | 4.8★ iOS, 4.2★ Android | Phase 2 priority |
| Private sellers | Yes | Phase 2 |

---

## Recommended priority order

1. **Vehicle history checks** — non-negotiable trust signal, cannot launch without it
2. **Advanced search & filters** — baseline buyer expectation
3. **DMS auto-publish & real-time sync** — the key differentiator, ship with launch
4. **Price indicator** — high-impact consumer trust feature
5. **Finance calculator on listings** — shifts buyer psychology to monthly cost
6. **Lead-to-CRM integration** — proves dealer ROI from day one
7. **Free car valuation tool** — high-traffic entry point, drives seller funnel
8. **Dealer reviews & trust badges** — social proof, confirmed by DMS transactions
9. **AI ad creation** — efficiency win, competes with Co-Driver
10. **Vehicle comparison** — conversion feature for indecisive buyers
11. **Dealer website sync** — one-entry, two-storefronts consistency
12. **Live margin dashboard** — dealer retention and upsell feature
13. **Editorial content** — SEO investment, begin 6 months post-launch
14. **Private seller listings** — inventory growth
15. **Native mobile app** — scale and retention
