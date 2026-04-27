# `@init/photon-marketplaces-kit`

Marketplace profile templates for the package-first Photon. The kit
ships a registry of self-contained template families (foodtech,
dark-store, local commerce) that, when applied as a profile starter
preset, produce a complete website on the Photon runtime.

The first family is **`dve-palochki`** — sushi/pizza delivery, RU/KZ.
A profile created from `marketplaces-dve-palochki` preset renders a
site visually equivalent to https://dve-palochky.kz/ but on the
Photon framework (no MUI, no Swiper, no `@init-kz/*`, no GSAP).

## Architecture

- **Module** (`src/module.tsx`): registers all marketplace blocks.
- **Public kit** (`src/public.tsx`): public-runtime installable kit.
- **Templates registry** (`src/templates/index.ts`): single source of
  truth for available template families.
- **Each family** lives in `src/templates/<family-id>/` and is
  self-contained: blocks, scenarios, theme, content, docs.
- **Site-frame extension** + **profile starter preset**: built in
  `src/sdk.ts` and `src/documents.ts` from the family registry.

All marketplace block types are namespaced
`marketplaces.<family-id>.<block-id>` to prevent collisions with
other kits.

## Adding a new template

See `docs/adding-a-template.md`.

## Glossary

See `docs/GLOSSARY.md`.

## Intentional decisions

The first-release scope decisions (no facets, dumb-iframe maps,
CSS-snap carousels, etc.) are recorded in
`demo/.agents/context/THATS_THE_WAY_IT_SHOULD_BE.md`, section
"Marketplaces kit — first-release scope decisions".
