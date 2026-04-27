import type { PhotonBlock, PhotonDocument } from "@init/photon";

/**
 * Locales the marketplace kit officially supports. Extend the union
 * (and provide content for it in every active scenario) before
 * shipping a new locale.
 */
export type MarketplaceLocale = "ru" | "kz" | "en";

/**
 * Identifiers of registered template families. The actual reachable
 * union is exported from `./index.ts` as the type of the registry
 * tuple — see `MarketplaceTemplateFamilyId` there.
 */
export type MarketplaceTemplateFamilyIdGeneric = string;

/**
 * Localized text. `ru` is the primary required locale for v1.
 */
export type LocalizedText = {
	ru: string;
	kz?: string;
	en?: string;
};

export const localized = (
	value: LocalizedText,
	locale: MarketplaceLocale,
): string => value[locale] ?? value.ru;

/**
 * One slide in the hero carousel. Either `imageUrl` or `videoUrl`
 * must be present; if both are present, `videoUrl` wins on browsers
 * that can play it.
 */
export type MarketplaceHeroSlide = {
	id: string;
	title?: LocalizedText;
	subtitle?: LocalizedText;
	imageUrl?: string;
	videoUrl?: string;
	href?: string;
	cta?: { label: LocalizedText; href: string };
	overlay?: "none" | "soft" | "strong";
};

/**
 * One iconified shortcut to a category. Mirrors the row of icon
 * pills under the search bar on the original site.
 */
export type MarketplaceCategoryShortcut = {
	id: string;
	label: LocalizedText;
	slug: string;
	icon: MarketplaceCategoryIconKey;
};

/**
 * Curated set of category icons shipped with the kit. Adding a new
 * icon means adding an SVG component in `shared/icons/` and a key
 * here. We deliberately do NOT accept arbitrary SVG strings from
 * scenarios — that would make the public-runtime payload unsafe.
 */
export type MarketplaceCategoryIconKey =
	| "supplements"
	| "rolls"
	| "pizza"
	| "sets"
	| "fried-rolls"
	| "gunkans"
	| "drinks"
	| "nigiri"
	| "snacks"
	| "baked-rolls"
	| "noodles"
	| "soup"
	| "salad"
	| "dessert";

export type MarketplaceContactInfo = {
	phones: readonly string[];
	email: string;
	address: LocalizedText;
	hours: string;
	mapEmbedUrl?: string;
	socials?: readonly { id: string; href: string; kind: "instagram" | "telegram" | "whatsapp" | "tiktok" | "facebook" }[];
};

export type MarketplaceLegalLink = {
	id: string;
	label: LocalizedText;
	route: string;
};

export type MarketplaceReviewItem = {
	id: string;
	clientName: string;
	rating: number;
	createdAt: string;
	body: LocalizedText;
	adminReply?: LocalizedText;
};

export type MarketplaceInstagramTile = {
	id: string;
	imageUrl: string;
	href: string;
};

export type MarketplaceAboutSection = {
	title: LocalizedText;
	body: LocalizedText;
	gallery: readonly { id: string; imageUrl: string; alt: LocalizedText }[];
	highlight?: { title: LocalizedText; body: LocalizedText };
};

export type MarketplaceDeliveryInfo = {
	areaTitle: LocalizedText;
	streetTop: string;
	streetBottom: string;
	streetLeft: string;
	streetRight: string;
	pickupPoint: LocalizedText;
	minOrderText: LocalizedText;
	paymentBlocks: readonly { title: LocalizedText; body: LocalizedText }[];
};

export type MarketplaceTemplateScenario = {
	id: string;
	familyId: MarketplaceTemplateFamilyIdGeneric;
	locales: readonly MarketplaceLocale[];
	defaultLocale: MarketplaceLocale;
	brand: LocalizedText;
	tagline: LocalizedText;
	contact: MarketplaceContactInfo;
	hero: { slides: readonly MarketplaceHeroSlide[] };
	categories: readonly MarketplaceCategoryShortcut[];
	about: MarketplaceAboutSection;
	delivery: MarketplaceDeliveryInfo;
	reviews: readonly MarketplaceReviewItem[];
	instagram: { handle: string; tiles: readonly MarketplaceInstagramTile[] };
	legalLinks: readonly MarketplaceLegalLink[];
	logoUrl: string;
	logoAlt: LocalizedText;
};

export type MarketplaceStaticPageKey =
	| "about"
	| "contacts"
	| "payment-and-delivery"
	| "privacy"
	| "reviews"
	| "success"
	| "not-found"
	| "auth-login"
	| "auth-register";

export type MarketplaceAccountTabKey = "orders" | "profile";

export type MarketplaceSiteRegionKey =
	| "header"
	| "footer";

export type MarketplaceCatalogPageOptions = {
	categorySlug?: string;
	categoryLabel?: LocalizedText;
};

/**
 * The contract every template family must implement. Each method
 * returns the block list for one bounded page; the kit's
 * `documents.ts` composes those into `PhotonDocument`s. Families
 * MUST NOT know about routes — only about pages by semantic key.
 *
 * Methods that delegate to commerce return commerce blocks
 * (e.g. `commerce-product-grid`, `commerce-cart-summary`) wrapped
 * in family chrome where appropriate.
 */
export type MarketplaceTemplateFamily = {
	readonly id: string;
	readonly defaultScenario: MarketplaceTemplateScenario;
	/**
	 * Block types this family registers in `module.tsx`. The kit
	 * collects these from every family for the uniqueness contract
	 * test.
	 */
	readonly blockTypes: readonly string[];

	createHomeBlocks(
		scenario: MarketplaceTemplateScenario,
		locale: MarketplaceLocale,
	): PhotonBlock[];

	createCatalogBlocks(
		scenario: MarketplaceTemplateScenario,
		locale: MarketplaceLocale,
		options?: MarketplaceCatalogPageOptions,
	): PhotonBlock[];

	createProductBlocks(
		scenario: MarketplaceTemplateScenario,
		locale: MarketplaceLocale,
	): PhotonBlock[];

	createCartBlocks(
		scenario: MarketplaceTemplateScenario,
		locale: MarketplaceLocale,
	): PhotonBlock[];

	createCheckoutBlocks(
		scenario: MarketplaceTemplateScenario,
		locale: MarketplaceLocale,
	): PhotonBlock[];

	createAccountBlocks(
		scenario: MarketplaceTemplateScenario,
		locale: MarketplaceLocale,
		key: MarketplaceAccountTabKey,
	): PhotonBlock[];

	createStaticPageBlocks(
		scenario: MarketplaceTemplateScenario,
		locale: MarketplaceLocale,
		page: MarketplaceStaticPageKey,
	): PhotonBlock[];

	createSiteRegionBlocks(
		scenario: MarketplaceTemplateScenario,
		locale: MarketplaceLocale,
		key: MarketplaceSiteRegionKey,
	): PhotonBlock[];

	/**
	 * Patch applied to `site.settings` at preset application time.
	 * Includes the family's design preset id and any settings the
	 * runtime needs (e.g. mobile menu config).
	 */
	createSiteSettingsPatch(
		scenario: MarketplaceTemplateScenario,
		locale: MarketplaceLocale,
	): Record<string, unknown>;
};

/**
 * Helper to make site-region documents. Used by `documents.ts`.
 */
export const createMarketplaceSiteRegionDocument = (
	id: string,
	name: string,
	route: string,
	blocks: PhotonDocument["blocks"],
	updatedAt: string,
): PhotonDocument => ({
	id,
	name,
	route,
	updatedAt,
	blocks,
});
