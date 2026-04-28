import type {
	PhotonBlock,
	PhotonDocument,
	PhotonDocumentsMap,
} from "@init/photon";
import {
	getMarketplaceTemplateFamily,
	localized,
	type MarketplaceLocale,
	type MarketplaceTemplateFamilyId,
	type MarketplaceTemplateScenario,
} from "./templates";

const updatedAt = "2026-04-27T00:00:00.000Z";

const clone = <T>(v: T): T => JSON.parse(JSON.stringify(v)) as T;

const createDocument = (
	id: string,
	name: string,
	route: string,
	blocks: PhotonBlock[],
): PhotonDocument => ({
	id,
	name,
	route,
	updatedAt,
	blocks: clone(blocks),
});

export type MarketplacePageSeo = { title: string; description: string };

/**
 * Localized SEO description templates per page key. Each function
 * receives `{brand, locale}` and returns the description string.
 * Title is derived from `brand + " — " + pageName` so it stays
 * consistent across pages without per-key overrides.
 */
const SEO_DESCRIPTION_TEMPLATES: Record<
	string,
	(brand: string, locale: MarketplaceLocale) => string
> = {
	home: (brand, l) =>
		l === "kz"
			? `${brand} — суши, роллдар жəне сеттер. Жылдам жеткізу.`
			: l === "en"
				? `${brand} — sushi, rolls, and sets. Fast delivery.`
				: `${brand} — суши, роллы и сеты. Быстрая доставка.`,
	catalog: (brand, l) =>
		l === "kz"
			? `${brand} ассортименті: роллдар, наборлар, нигири, түнки.`
			: l === "en"
				? `${brand} catalog: rolls, sets, nigiri, snacks.`
				: `Каталог ${brand}: роллы, наборы, нигири, закуски.`,
	product: (brand, l) =>
		l === "kz"
			? `${brand} мəзірінен өнім.`
			: l === "en"
				? `Product from ${brand} menu.`
				: `Товар из меню ${brand}.`,
	cart: (_brand, l) =>
		l === "kz"
			? "Сіздің себетіңіз."
			: l === "en"
				? "Your cart."
				: "Ваша корзина.",
	checkout: (_brand, l) =>
		l === "kz"
			? "Тапсырысты ресімдеу."
			: l === "en"
				? "Checkout."
				: "Оформление заказа.",
	"account-orders": (_brand, l) =>
		l === "kz"
			? "Менің тапсырыстарым."
			: l === "en"
				? "My orders."
				: "Мои заказы.",
	"account-profile": (_brand, l) =>
		l === "kz"
			? "Жеке профилім."
			: l === "en"
				? "My profile."
				: "Мой профиль.",
	about: (brand, l) =>
		l === "kz"
			? `${brand} туралы.`
			: l === "en"
				? `About ${brand}.`
				: `О компании ${brand}.`,
	contacts: (brand, l) =>
		l === "kz"
			? `${brand} байланыстары: телефон, мекенжай, жұмыс уақыты.`
			: l === "en"
				? `${brand} contacts: phone, address, hours.`
				: `Контакты ${brand}: телефон, адрес, часы работы.`,
	"payment-and-delivery": (_brand, l) =>
		l === "kz"
			? "Төлем жəне жеткізу шарттары."
			: l === "en"
				? "Payment and delivery terms."
				: "Условия оплаты и доставки.",
	privacy: (_brand, l) =>
		l === "kz"
			? "Құпиялылық саясаты."
			: l === "en"
				? "Privacy policy."
				: "Политика конфиденциальности.",
	reviews: (brand, l) =>
		l === "kz"
			? `${brand} клиенттерінің пікірлері.`
			: l === "en"
				? `${brand} customer reviews.`
				: `Отзывы клиентов ${brand}.`,
	success: (_brand, l) =>
		l === "kz"
			? "Тапсырыс қабылданды."
			: l === "en"
				? "Order confirmed."
				: "Заказ принят.",
	"not-found": (_brand, l) =>
		l === "kz"
			? "Бет табылмады."
			: l === "en"
				? "Page not found."
				: "Страница не найдена.",
};

const buildPageSeo = (
	scenario: MarketplaceTemplateScenario,
	locale: MarketplaceLocale,
	pageKey: string,
	pageName: string,
): MarketplacePageSeo => {
	const brand = localized(scenario.brand, locale);
	const descTemplate = SEO_DESCRIPTION_TEMPLATES[pageKey];
	const description = descTemplate
		? descTemplate(brand, locale)
		: localized(scenario.tagline, locale);
	const title = pageKey === "home" ? brand : `${pageName} — ${brand}`;
	return { title, description };
};

export type MarketplacesProfileStarterPresetId =
	`marketplaces-${MarketplaceTemplateFamilyId}`;

/**
 * Shape consumed by Photon when a profile is created from this kit's
 * preset. The runtime calls into the Laravel `CreatePhotonProfile`
 * controller with `starterRecipe.type = "marketplaces-profile"` and
 * the controller hydrates the documents from
 * `createMarketplacesProfileDocumentTree`.
 */
export type MarketplacesProfileStarterPreset = {
	id: MarketplacesProfileStarterPresetId;
	familyId: MarketplaceTemplateFamilyId;
	label: string;
	description: string;
	appearance: { background: string; foreground: string; accent: string };
	starterRecipe: {
		type: "marketplaces-profile";
		familyId: MarketplaceTemplateFamilyId;
		scenarioId: string;
		locale: MarketplaceLocale;
	};
};

/**
 * The full list of routes a marketplace profile ships with. Listed
 * in one place so changing it forces a single, consistent change
 * site-wide.
 */
export const MARKETPLACE_ROUTES = {
	home: "/",
	catalog: "/archive",
	categoryCatalog: (slug: string) => `/archive/${slug}`,
	product: "/product/[slug]",
	cart: "/cart",
	checkout: "/checkout",
	accountOrders: "/account/orders",
	accountProfile: "/account/profile",
	about: "/about",
	contacts: "/contacts",
	paymentAndDelivery: "/payment-and-delivery",
	privacy: "/privacy",
	reviews: "/reviews",
	success: "/success",
	notFound: "/not-found",
	authLogin: "/auth/login",
	authRegister: "/auth/register",
	siteHeader: "/_site/header",
	siteFooter: "/_site/footer",
} as const;

const buildPageDocument = (
	familyId: string,
	scenarioId: string,
	pageKey: string,
	name: string,
	route: string,
	blocks: PhotonBlock[],
): PhotonDocument =>
	createDocument(
		`marketplaces-${familyId}-${scenarioId}-${pageKey}`,
		name,
		route,
		blocks,
	);

/**
 * Build the full `PhotonDocumentsMap` for a (family, scenario,
 * locale) triple. Returns the documents map + the
 * `site.settings` patch the family wants to apply.
 *
 * Used by:
 *  - the Photon preset registration (turning a starter preset into
 *    a real profile)
 *  - the kit's contract tests
 *  - downstream tooling that wants to seed a profile in a non-Photon
 *    persistence layer (see THATS_THE_WAY_IT_SHOULD_BE.md "Profile
 *    seeding" note)
 */
export const createMarketplacesProfileDocumentTree = (input: {
	familyId: MarketplaceTemplateFamilyId;
	scenarioOverride?: MarketplaceTemplateScenario;
	locale?: MarketplaceLocale;
}): {
	documents: PhotonDocumentsMap;
	siteRegions: Record<"header" | "footer", PhotonDocument>;
	siteSettingsPatch: Record<string, unknown>;
	pageSeo: Record<string, MarketplacePageSeo>;
} => {
	const family = getMarketplaceTemplateFamily(input.familyId);
	const scenario = input.scenarioOverride ?? family.defaultScenario;
	const locale = input.locale ?? scenario.defaultLocale;

	const docs: PhotonDocumentsMap = {};
	const pageSeo: Record<string, MarketplacePageSeo> = {};

	const add = (
		pageKey: string,
		name: string,
		route: string,
		blocks: PhotonBlock[],
	) => {
		const doc = buildPageDocument(family.id, scenario.id, pageKey, name, route, blocks);
		docs[doc.id] = doc;
		pageSeo[doc.id] = buildPageSeo(scenario, locale, pageKey, name);
	};

	add(
		"home",
		"Home",
		MARKETPLACE_ROUTES.home,
		family.createHomeBlocks(scenario, locale),
	);
	add(
		"catalog",
		"Catalog",
		MARKETPLACE_ROUTES.catalog,
		family.createCatalogBlocks(scenario, locale),
	);
	for (const c of scenario.categories) {
		add(
			`catalog-${c.slug}`,
			`Catalog: ${c.slug}`,
			MARKETPLACE_ROUTES.categoryCatalog(c.slug),
			family.createCatalogBlocks(scenario, locale, {
				categorySlug: c.slug,
				categoryLabel: c.label,
			}),
		);
	}
	add(
		"product",
		"Product detail",
		MARKETPLACE_ROUTES.product,
		family.createProductBlocks(scenario, locale),
	);
	add(
		"cart",
		"Cart",
		MARKETPLACE_ROUTES.cart,
		family.createCartBlocks(scenario, locale),
	);
	add(
		"checkout",
		"Checkout",
		MARKETPLACE_ROUTES.checkout,
		family.createCheckoutBlocks(scenario, locale),
	);
	add(
		"account-orders",
		"Account: orders",
		MARKETPLACE_ROUTES.accountOrders,
		family.createAccountBlocks(scenario, locale, "orders"),
	);
	add(
		"account-profile",
		"Account: profile",
		MARKETPLACE_ROUTES.accountProfile,
		family.createAccountBlocks(scenario, locale, "profile"),
	);
	add(
		"about",
		"About",
		MARKETPLACE_ROUTES.about,
		family.createStaticPageBlocks(scenario, locale, "about"),
	);
	add(
		"contacts",
		"Contacts",
		MARKETPLACE_ROUTES.contacts,
		family.createStaticPageBlocks(scenario, locale, "contacts"),
	);
	add(
		"payment-and-delivery",
		"Payment & delivery",
		MARKETPLACE_ROUTES.paymentAndDelivery,
		family.createStaticPageBlocks(scenario, locale, "payment-and-delivery"),
	);
	add(
		"privacy",
		"Privacy policy",
		MARKETPLACE_ROUTES.privacy,
		family.createStaticPageBlocks(scenario, locale, "privacy"),
	);
	add(
		"reviews",
		"Reviews",
		MARKETPLACE_ROUTES.reviews,
		family.createStaticPageBlocks(scenario, locale, "reviews"),
	);
	add(
		"success",
		"Order success",
		MARKETPLACE_ROUTES.success,
		family.createStaticPageBlocks(scenario, locale, "success"),
	);
	add(
		"not-found",
		"Not found",
		MARKETPLACE_ROUTES.notFound,
		family.createStaticPageBlocks(scenario, locale, "not-found"),
	);

	const siteRegions = {
		header: createDocument(
			`marketplaces-${family.id}-${scenario.id}-site-header`,
			"Site header",
			MARKETPLACE_ROUTES.siteHeader,
			family.createSiteRegionBlocks(scenario, locale, "header"),
		),
		footer: createDocument(
			`marketplaces-${family.id}-${scenario.id}-site-footer`,
			"Site footer",
			MARKETPLACE_ROUTES.siteFooter,
			family.createSiteRegionBlocks(scenario, locale, "footer"),
		),
	};

	return {
		documents: docs,
		siteRegions,
		siteSettingsPatch: family.createSiteSettingsPatch(scenario, locale),
		pageSeo,
	};
};

/**
 * Profile starter presets — one per registered family. Photon's
 * preset registry consumes this list.
 */
export const marketplacesProfileStarterPresets: readonly MarketplacesProfileStarterPreset[] =
	[];
