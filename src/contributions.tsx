import {
	definePhotonSiteFrameContribution,
	type PhotonSiteFrameContributionRenderProps,
	footerLegalSlot,
	footerNavigationSlot,
	headerUtilitySlot,
} from "@init/photon";
import { PhotonLink } from "@init/photon/public";

const pickLocalized = (
	value: Record<string, string> | undefined,
	fallback: string,
): string => {
	if (!value) return fallback;
	return value.en ?? value.ru ?? Object.values(value)[0] ?? fallback;
};

type SimpleLinkDefaults = {
	enabled?: boolean;
	order?: number;
	label?: Record<string, string>;
	href?: string;
};

const SimpleLinkComponent = (
	props: PhotonSiteFrameContributionRenderProps<SimpleLinkDefaults>,
) => (
	<PhotonLink href={props.href ?? "#"}>
		<span>{pickLocalized(props.label, "")}</span>
	</PhotonLink>
);

// --- Header utility links ---------------------------------------------

export const marketplaceUtilityAboutContribution =
	definePhotonSiteFrameContribution({
		id: "marketplace.utility.about",
		packageName: "photon-marketplaces-kit",
		slot: headerUtilitySlot,
		defaults: {
			enabled: true,
			order: 10,
			label: { ru: "О нас", en: "About" },
			href: "/about",
		} satisfies SimpleLinkDefaults,
		configurable: {
			enabled: { kind: "toggle" },
			label: { kind: "localized-text", label: "About link label" },
			order: { kind: "order" },
		},
		component: SimpleLinkComponent,
	});

export const marketplaceUtilityReviewsContribution =
	definePhotonSiteFrameContribution({
		id: "marketplace.utility.reviews",
		packageName: "photon-marketplaces-kit",
		slot: headerUtilitySlot,
		defaults: {
			enabled: true,
			order: 20,
			label: { ru: "Отзывы", en: "Reviews" },
			href: "/reviews",
		} satisfies SimpleLinkDefaults,
		configurable: {
			enabled: { kind: "toggle" },
			label: { kind: "localized-text", label: "Reviews link label" },
			order: { kind: "order" },
		},
		component: SimpleLinkComponent,
	});

export const marketplaceUtilityPaymentContribution =
	definePhotonSiteFrameContribution({
		id: "marketplace.utility.payment",
		packageName: "photon-marketplaces-kit",
		slot: headerUtilitySlot,
		defaults: {
			enabled: true,
			order: 30,
			label: { ru: "Оплата и доставка", en: "Payment & delivery" },
			href: "/payment-and-delivery",
		} satisfies SimpleLinkDefaults,
		configurable: {
			enabled: { kind: "toggle" },
			label: { kind: "localized-text", label: "Payment link label" },
			order: { kind: "order" },
		},
		component: SimpleLinkComponent,
	});

export const marketplaceUtilityContactsContribution =
	definePhotonSiteFrameContribution({
		id: "marketplace.utility.contacts",
		packageName: "photon-marketplaces-kit",
		slot: headerUtilitySlot,
		defaults: {
			enabled: true,
			order: 40,
			label: { ru: "Контакты", en: "Contacts" },
			href: "/contacts",
		} satisfies SimpleLinkDefaults,
		configurable: {
			enabled: { kind: "toggle" },
			label: { kind: "localized-text", label: "Contacts link label" },
			order: { kind: "order" },
		},
		component: SimpleLinkComponent,
	});

// --- Footer Catalog column --------------------------------------------

type FooterCatalogColumnDefaults = {
	enabled?: boolean;
	order?: number;
	title?: Record<string, string>;
	links?: ReadonlyArray<{
		id: string;
		label: Record<string, string>;
		href: string;
	}>;
};

const FooterCatalogColumnComponent = (
	props: PhotonSiteFrameContributionRenderProps<FooterCatalogColumnDefaults>,
) => (
	<section>
		<h3>{pickLocalized(props.title, "Catalog")}</h3>
		<ul>
			{(props.links ?? []).map((link) => (
				<li key={link.id}>
					<PhotonLink href={link.href}>
						{pickLocalized(link.label, link.id)}
					</PhotonLink>
				</li>
			))}
		</ul>
	</section>
);

export const marketplaceFooterCatalogColumnContribution =
	definePhotonSiteFrameContribution({
		id: "marketplace.footer-catalog-column",
		packageName: "photon-marketplaces-kit",
		slot: footerNavigationSlot,
		defaults: {
			enabled: true,
			order: 10,
			title: { ru: "Каталог", en: "Catalog" },
			links: [
				{
					id: "marketplace.footer.catalog-all",
					label: { ru: "Все категории", en: "All categories" },
					href: "/archive",
				},
			],
		} satisfies FooterCatalogColumnDefaults,
		configurable: {
			enabled: { kind: "toggle", label: "Show Catalog footer column" },
			title: { kind: "localized-text", label: "Column title" },
			order: { kind: "order" },
		},
		component: FooterCatalogColumnComponent,
	});

// --- Footer Privacy link (footer.legal) -------------------------------

export const marketplaceFooterPrivacyContribution =
	definePhotonSiteFrameContribution({
		id: "marketplace.footer.privacy",
		packageName: "photon-marketplaces-kit",
		slot: footerLegalSlot,
		defaults: {
			enabled: true,
			order: 10,
			label: { ru: "Политика конфиденциальности", en: "Privacy policy" },
			href: "/privacy",
		} satisfies SimpleLinkDefaults,
		configurable: {
			enabled: { kind: "toggle" },
			label: { kind: "localized-text", label: "Privacy link label" },
			order: { kind: "order" },
		},
		component: SimpleLinkComponent,
	});

export const marketplacesPhotonSiteFrameContributions = [
	marketplaceUtilityAboutContribution,
	marketplaceUtilityReviewsContribution,
	marketplaceUtilityPaymentContribution,
	marketplaceUtilityContactsContribution,
	marketplaceFooterCatalogColumnContribution,
	marketplaceFooterPrivacyContribution,
];
