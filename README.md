# `@init/photon-marketplaces-kit`

Marketplace profile templates for the package-first Photon. The kit
ships a registry of self-contained template families (foodtech,
dark-store, local commerce) that, when applied as a profile starter
preset, produce a complete website on the Photon runtime.

The kit currently ships an empty family registry. The shape, the
namespacing contract, and the profile starter preset wiring are in
place; future families can be added under `src/templates/<family-id>/`
without further plumbing changes.

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

Cross-family conventions (source-export packaging, block-type
namespacing, site-frame ownership rules) are recorded in
`demo/.agents/context/THATS_THE_WAY_IT_SHOULD_BE.md`, section
"Marketplaces kit — registry conventions".
