# `@init/photon-marketplaces-kit` glossary

| Term | Meaning |
|------|---------|
| **Marketplace template family** | A complete set of factories + scenarios + site-frame for one marketplace look (e.g. `dve-palochki`). One family = one storefront aesthetic. Lives in `src/templates/<family-id>/`. Implements `MarketplaceTemplateFamily`. |
| **Marketplace template scenario** | A content payload bound to one family + locale set: brand, contacts, hero slides, category icons, about copy, legal links, etc. Pure data, no behavior. |
| **Marketplace block** | A Photon block specific to one family. Type is always `marketplaces.<family-id>.<block-id>` to keep block registries collision-free across kits. |
| **Marketplace site-frame extension** | A `PhotonSiteFrameExtension` produced from a family + scenario + locale. Owns header sub-nav (categories), footer columns, mobile bottom-bar. Does **not** own the cart icon (that comes from `@init/commerce-photon`). |
| **Marketplace profile starter preset** | A `PhotonProfileStarterPreset` whose `starterRecipe.type` is `marketplaces-profile`. Picks a family + scenario + locale at preset application time and emits a `PhotonDocumentsMap` covering home, catalog, product, cart, checkout, account, static pages, auth. |
| **Marketplace document factory** | One of `createHomeBlocks`, `createCatalogBlocks`, `createProductBlocks`, `createCartBlocks`, `createCheckoutBlocks`, `createAccountBlocks`, `createStaticPageBlocks`, `createSiteRegionBlocks` on a family. Each returns a `PhotonBlock[]` for the matching page. The kit's `documents.ts` composes them into `PhotonDocument`s. |
| **Marketplace design preset** | An entry in the family's `theme.ts` exposing CSS custom properties (`--photon-site-accent`, etc.). Plugged into `site.settings.design` so all block components inherit a coherent palette. |

## Naming convention

- Block type: `marketplaces.<family>.<block>` — e.g. `marketplaces.dve-palochki.hero-slider`.
- Block component name: `Marketplace<Family><Block>Block` — e.g. `MarketplaceDvePalochkiHeroSliderBlock`.
- Scenario id: `marketplaces-<family>-<scenario>` — e.g. `marketplaces-dve-palochki-default`.
- Profile starter preset id: `marketplaces-<family>` (one per family) — e.g. `marketplaces-dve-palochki`.
- Site-frame extension id: `marketplaces.<family>` — e.g. `marketplaces.dve-palochki`.
