import {
	dvePalochkiBlockDefinitions,
	dvePalochkiTemplateFamily,
} from "./dve-palochki";
import type { MarketplaceTemplateFamily } from "./shared";

export * from "./shared";
export {
	dvePalochkiTemplateFamily,
	dvePalochkiDefaultScenario,
	dvePalochkiSiteDesignPatch,
	dvePalochkiSiteBrandPatch,
	dvePalochkiThemeTokens,
} from "./dve-palochki";

/**
 * Single source of truth for available template families. Adding
 * a new family means: (1) add a folder under `templates/`,
 * (2) export its `*TemplateFamily` and block definitions,
 * (3) append the family here. Nothing else changes — `module.tsx`,
 * `documents.ts`, `sdk.ts`, and the studio palette pick up the new
 * family from this list.
 */
export const marketplaceTemplateFamilies = [
	dvePalochkiTemplateFamily,
] as const satisfies readonly MarketplaceTemplateFamily[];

export type MarketplaceTemplateFamilyId =
	(typeof marketplaceTemplateFamilies)[number]["id"];

export const getMarketplaceTemplateFamily = (
	id: MarketplaceTemplateFamilyId,
): MarketplaceTemplateFamily => {
	const family = marketplaceTemplateFamilies.find((f) => f.id === id);
	if (!family) {
		throw new Error(
			`Unknown marketplace template family: ${id}. Registered families: ${marketplaceTemplateFamilies
				.map((f) => f.id)
				.join(", ")}`,
		);
	}
	return family;
};

/**
 * Combined block definitions across all families. Used by
 * `module.tsx` to register everything in one shot.
 */
export const marketplaceBlockDefinitions = [
	...dvePalochkiBlockDefinitions,
] as const;
