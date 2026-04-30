import type { PhotonDocument } from "@init/photon";
import {
	createPhotonAppModule,
	createPhotonSourceIdProfileTreeResolver,
	type PhotonAppModule,
	type PhotonSdkProfileStarterPresetOption,
	type PhotonSdkProfileStarterSource,
} from "@init/photon-nextjs";
import { marketplacesPhotonSiteFrameContributions } from "./contributions";
import {
	createMarketplacesProfileDocumentTree,
	marketplacesProfileStarterPresets,
} from "./documents";
import { coerceInterfaceLocale } from "@init/photon/shared";
import type { MarketplaceLocale } from "./templates";

const MARKETPLACE_SUPPORTED_LOCALES: readonly MarketplaceLocale[] = [
	"ru",
	"kz",
	"en",
];

export const coerceMarketplaceLocale = (
	value: string | null | undefined,
	fallback: MarketplaceLocale = "ru",
): MarketplaceLocale =>
	coerceInterfaceLocale(value, {
		supported: MARKETPLACE_SUPPORTED_LOCALES,
		fallback,
	}) as MarketplaceLocale;

const toLaravelTree = (
	mt: ReturnType<typeof createMarketplacesProfileDocumentTree>,
	locale: MarketplaceLocale,
): Record<string, unknown> => {
	const home = Object.values(mt.documents).find(
		(doc): doc is PhotonDocument => doc.route === "/",
	);
	const homeSeo = home ? mt.pageSeo[home.id] : undefined;
	const pages: Record<string, unknown> = {};
	for (const [id, doc] of Object.entries(mt.documents)) {
		const seo = mt.pageSeo[id];
		pages[id] = {
			document: doc,
			settings: { page: { name: doc.name }, template: {}, record: {} },
			resources: [],
			seo: {
				page: seo
					? { title: seo.title, description: seo.description }
					: { title: doc.name },
				template: {},
				record: {},
			},
		};
	}
	return {
		pages,
		site: {
			regions: {
				header: { document: mt.siteRegions.header },
				footer: { document: mt.siteRegions.footer },
			},
			settings: mt.siteSettingsPatch ?? {},
		},
		seo: {
			site: {
				title: homeSeo?.title ?? home?.name ?? "Marketplace",
				description: homeSeo?.description ?? "",
			},
		},
		settings: { publication: { locale } },
		meta: { source: "photon-marketplaces-kit" },
	};
};

const presetOptions: readonly PhotonSdkProfileStarterPresetOption[] =
	marketplacesProfileStarterPresets.map((preset) => ({
		id: preset.id,
		label: preset.label,
		description: preset.description,
	}));

const presetIds = marketplacesProfileStarterPresets.map((preset) => preset.id);

const createMarketplacesStarterTree = (
	requestedLocale: string,
	source: PhotonSdkProfileStarterSource,
): Record<string, unknown> => {
	if (source.type !== "preset") {
		throw new Error(
			`Marketplaces tree factory requires a preset source. Got ${source.type}.`,
		);
	}
	if (!source.sourceId) {
		throw new Error(
			"Marketplaces tree factory requires a preset source with a sourceId.",
		);
	}
	const preset = marketplacesProfileStarterPresets.find(
		(candidate) => candidate.id === source.sourceId,
	);
	if (!preset) {
		throw new Error(
			`Unknown marketplaces preset id: ${source.sourceId}. Registered: ${presetIds.join(", ")}`,
		);
	}
	const locale: MarketplaceLocale = coerceMarketplaceLocale(
		requestedLocale,
		preset.starterRecipe.locale,
	);

	const tree = createMarketplacesProfileDocumentTree({
		familyId: preset.familyId,
		locale,
	});
	return toLaravelTree(tree, locale);
};

/**
 * App module for the marketplaces kit. Registers site-frame contributions
 * AND profile starter presets + tree resolver so the kit's families
 * (e.g. Dve Palochki) appear in the workspace "Create profile" dropdown
 * and produce a usable seed tree.
 */
export const createMarketplacesPhotonAppModule = (): PhotonAppModule =>
	createPhotonAppModule({
		name: "photon-marketplaces-kit",
		siteFrameContributions: marketplacesPhotonSiteFrameContributions,
		profileSources: {
			presets: presetOptions,
		},
		profileTreeResolvers: [
			createPhotonSourceIdProfileTreeResolver(
				presetIds,
				createMarketplacesStarterTree,
			),
		],
	});
