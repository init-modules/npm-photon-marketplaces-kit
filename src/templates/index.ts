import type { MarketplaceTemplateFamily } from "./shared";

export * from "./shared";

/**
 * Single source of truth for available template families. Adding
 * a new family means: (1) add a folder under `templates/`,
 * (2) export its `*TemplateFamily` and block definitions,
 * (3) append the family here. Nothing else changes — `module.tsx`,
 * `documents.ts`, `sdk.ts`, and the studio palette pick up the new
 * family from this list.
 */
// TODO(s4-marketplaces): registry intentionally empty until real marketplace
// template families are seeded (see
// tests/nextjs/contracts/marketplaces-kit-preset-documents.placeholder.test.ts).
export const marketplaceTemplateFamilies = [] as const satisfies readonly MarketplaceTemplateFamily[];

export type MarketplaceTemplateFamilyId =
	(typeof marketplaceTemplateFamilies)[number] extends never
		? string
		: (typeof marketplaceTemplateFamilies)[number]["id"];

export const getMarketplaceTemplateFamily = (
	id: MarketplaceTemplateFamilyId,
): MarketplaceTemplateFamily => {
	const family = marketplaceTemplateFamilies.find(
		(f: MarketplaceTemplateFamily) => f.id === id,
	);
	if (!family) {
		throw new Error(
			`Unknown marketplace template family: ${id}. No families are registered.`,
		);
	}
	return family;
};

/**
 * Combined block definitions across all families. Used by
 * `module.tsx` to register everything in one shot.
 */
export const marketplaceBlockDefinitions = [] as const;
