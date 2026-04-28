import { COMMERCE_TAXONOMY_CATEGORIES_SOURCE } from "@init/commerce-photon";
import type { PhotonBlock } from "@init/photon";
import {
	type LocalizedText,
	localized,
	type MarketplaceLocale,
	type MarketplaceTemplateFamily,
	type MarketplaceTemplateScenario,
} from "../shared";
import { dvePalochkiBlockTypes } from "./blocks";
import { dvePalochkiDefaultScenario } from "./scenarios/default";
import { dvePalochkiSiteBrandPatch, dvePalochkiSiteDesignPatch } from "./theme";

const t = (l: MarketplaceLocale, value: LocalizedText) => localized(value, l);

const headerCategoryItems = (
	scenario: MarketplaceTemplateScenario,
	locale: MarketplaceLocale,
) =>
	scenario.categories.map((c) => ({
		id: c.id,
		label: t(locale, c.label),
		href: `/archive/${c.slug}`,
		icon: c.icon,
	}));

const localeSwitcherItems = (
	scenario: MarketplaceTemplateScenario,
	locale: MarketplaceLocale,
) =>
	scenario.locales.map((l) => ({
		id: l,
		label: l.toUpperCase(),
		href: l === scenario.defaultLocale ? "/" : `/${l}`,
		isActive: l === locale,
	}));

const headerBlock = (
	scenario: MarketplaceTemplateScenario,
	locale: MarketplaceLocale,
): PhotonBlock => ({
	id: "marketplaces-dve-palochki-header",
	module: "marketplaces-photon",
	type: "marketplaces.dve-palochki.header",
	props: {
		brandLabel: t(locale, scenario.brand),
		brandTagline: t(locale, scenario.tagline),
		logoUrl: scenario.logoUrl,
		homeHref: "/",
		deliveryNote: t(locale, {
			ru: "Доставим за",
			kz: "Жеткiземiз",
			en: "Delivery in",
		}),
		deliveryHighlight: "60–90 мин",
		primaryPhone: scenario.contact.phones[0] ?? "",
		whatsappPhone: scenario.contact.phones[0] ?? "",
		phones: scenario.contact.phones.map((phone, i) => ({
			id: `p${i}`,
			phone,
			whatsapp: false,
		})),
		searchPlaceholder: t(locale, {
			ru: "Каталог",
			kz: "Каталог",
			en: "Catalog",
		}),
		// Manual fallback when the commerce taxonomy resource is not
		// hydrated (seed previews). When the binding below resolves a
		// non-empty term list the renderer prefers that.
		categories: headerCategoryItems(scenario, locale),
		localeSwitcher: localeSwitcherItems(scenario, locale),
	},
	bindings: {
		categories: {
			source: COMMERCE_TAXONOMY_CATEGORIES_SOURCE,
			path: "category",
			mode: "read",
		},
	},
});

const footerBlock = (
	scenario: MarketplaceTemplateScenario,
	locale: MarketplaceLocale,
): PhotonBlock => ({
	id: "marketplaces-dve-palochki-footer",
	module: "marketplaces-photon",
	type: "marketplaces.dve-palochki.footer",
	props: {
		brandLabel: t(locale, scenario.brand),
		brandDescription: t(locale, {
			ru: "Мы являемся лидером по доставке суши в Алматы. Наш успех измеряется не только количеством постоянных клиентов, но и полным удовлетворением от нашего обслуживания.",
			kz: "Алматыда суши жеткiзу көшбасшысымыз. Тұрақты клиент санымен қатар, қызмет сапасы да маңызды.",
		}),
		logoUrl: scenario.logoUrl,
		categoriesTitle: t(locale, {
			ru: "Категории товаров",
			kz: "Тауар санаттары",
			en: "Categories",
		}),
		categories: scenario.categories.map((c) => ({
			id: c.id,
			label: t(locale, c.label),
			href: `/archive/${c.slug}`,
		})),
		contactsTitle: t(locale, {
			ru: "Контакты",
			kz: "Байланыс",
			en: "Contacts",
		}),
		phones: scenario.contact.phones.map((phone, i) => ({
			id: `p-${i}`,
			phone,
		})),
		address: t(locale, scenario.contact.address),
		cta: {
			label: t(locale, { ru: "Подробнее", kz: "Толығырақ", en: "Read more" }),
			href: "/about",
		},
		copyright: t(locale, {
			ru: '© 2014 - 2026 "Две палочки". Все права защищены.',
			kz: '© 2014 - 2026 "Екi таяқша". Барлық құқықтар қорғалған.',
		}),
		credit: t(locale, {
			ru: "Разработка сайтов · Веб студия",
			kz: "Сайт жасау · Веб студия",
			en: "Web development",
		}),
		creditHref: "#",
	},
});

const mobileBottomBarBlock = (
	_scenario: MarketplaceTemplateScenario,
	_locale: MarketplaceLocale,
): PhotonBlock => ({
	id: "marketplaces-dve-palochki-mobile-bottom-bar",
	module: "marketplaces-photon",
	type: "marketplaces.dve-palochki.mobile-bottom-bar",
	props: {},
});

const mobileBurgerMenuBlock = (
	scenario: MarketplaceTemplateScenario,
	locale: MarketplaceLocale,
): PhotonBlock => ({
	id: "marketplaces-dve-palochki-mobile-burger-menu",
	module: "marketplaces-photon",
	type: "marketplaces.dve-palochki.mobile-burger-menu",
	props: {
		navItems: [
			{
				id: "home",
				label: t(locale, { ru: "Главная", kz: "Басты бет", en: "Home" }),
				href: "/",
			},
			{
				id: "catalog",
				label: t(locale, { ru: "Каталог", kz: "Каталог", en: "Catalog" }),
				href: "/archive",
			},
			{
				id: "about",
				label: t(locale, { ru: "О нас", kz: "Бiз туралы", en: "About" }),
				href: "/about",
			},
			{
				id: "contacts",
				label: t(locale, {
					ru: "Контакты",
					kz: "Байланыс",
					en: "Contacts",
				}),
				href: "/contacts",
			},
		],
		contactsHeading: t(locale, {
			ru: "Контакты",
			kz: "Байланыс",
			en: "Contacts",
		}),
		phones: scenario.contact.phones.map((phone, i) => ({
			id: `p-${i}`,
			phone,
		})),
		whatsappPhone: "",
		closeLabel: t(locale, { ru: "Закрыть", kz: "Жабу", en: "Close" }),
		loginLabel: t(locale, { ru: "Войти", kz: "Кiру", en: "Sign in" }),
		loginHref: "/auth/login",
		dashboardLabel: t(locale, {
			ru: "Личный кабинет",
			kz: "Жеке кабинет",
			en: "My account",
		}),
		dashboardHref: "/account",
	},
});

const heroSliderBlock = (
	scenario: MarketplaceTemplateScenario,
	locale: MarketplaceLocale,
): PhotonBlock => ({
	id: "marketplaces-dve-palochki-hero",
	module: "marketplaces-photon",
	type: "marketplaces.dve-palochki.hero-slider",
	props: {
		slides: scenario.hero.slides.map((s) => ({
			id: s.id,
			imageUrl: s.imageUrl,
			videoUrl: s.videoUrl,
			title: s.title ? t(locale, s.title) : undefined,
			subtitle: s.subtitle ? t(locale, s.subtitle) : undefined,
			href: s.href ?? s.cta?.href,
			ctaLabel: s.cta ? t(locale, s.cta.label) : undefined,
			overlay: s.overlay ?? "soft",
		})),
		autoplayMs: 5000,
		height: "lg",
	},
});

const productGridBlock = (
	id: string,
	categorySlug: string | undefined,
	locale: MarketplaceLocale,
	overrides: Record<string, unknown> = {},
): PhotonBlock => ({
	id,
	module: "commerce-photon",
	type: "commerce-product-grid",
	props: {
		eyebrow: t(locale, { ru: "Каталог", kz: "Каталог", en: "Catalog" }),
		title: "",
		body: "",
		emptyTitle: t(locale, {
			ru: "Товаров пока нет",
			kz: "Тауарлар жоқ",
			en: "No items yet",
		}),
		emptyBody: t(locale, {
			ru: "Добавьте позиции каталога, чтобы открыть этот раздел.",
			kz: "Бөлiмдi ашу үшiн каталог позицияларын қосыңыз.",
			en: "Add catalog items to unlock this section.",
		}),
		cardCtaLabel: t(locale, {
			ru: "Открыть",
			kz: "Ашу",
			en: "Open",
		}),
		addToCartLabel: t(locale, {
			ru: "В корзину",
			kz: "Себетке",
			en: "Add to cart",
		}),
		columns: 4,
		showDescription: false,
		...overrides,
	},
	bindings: {
		items: {
			source: "commerceCatalog",
			path: categorySlug ?? "items",
			mode: "write",
		},
	},
});

const sectionHeadingBlock = (
	id: string,
	eyebrow: string,
	title: string,
	body: string,
): PhotonBlock => ({
	id,
	module: "marketplaces-photon",
	type: "marketplaces.dve-palochki.section-heading",
	props: { eyebrow, title, body },
});

const recommendedRail = (
	id: string,
	scenario: MarketplaceTemplateScenario,
	locale: MarketplaceLocale,
	categorySlug?: string,
	heading?: { eyebrow: string; title: string; body?: string },
): PhotonBlock[] => [
	...(heading
		? [sectionHeadingBlock(`${id}-heading`, heading.eyebrow, heading.title, heading.body ?? "")]
		: []),
	productGridBlock(`${id}-grid`, categorySlug, locale, {
		columns: 5,
		layout: "swiper",
		cardVariant: "marketplace",
		surface: "beige",
		cardActions: "link-only",
	}),
];

const instagramStripBlock = (
	scenario: MarketplaceTemplateScenario,
	locale: MarketplaceLocale,
): PhotonBlock => ({
	id: "marketplaces-dve-palochki-instagram",
	module: "marketplaces-photon",
	type: "marketplaces.dve-palochki.instagram-strip",
	props: {
		handle: scenario.instagram.handle,
		ctaLabel: t(locale, {
			ru: "Подписаться",
			kz: "Жазылу",
			en: "Follow",
		}),
		tiles: scenario.instagram.tiles.map((tile) => ({ ...tile })),
	},
});

const aboutSectionBlock = (
	scenario: MarketplaceTemplateScenario,
	locale: MarketplaceLocale,
): PhotonBlock => ({
	id: "marketplaces-dve-palochki-about",
	module: "marketplaces-photon",
	type: "marketplaces.dve-palochki.about-section",
	props: {
		title: t(locale, scenario.about.title),
		body: t(locale, scenario.about.body),
		gallery: scenario.about.gallery.map((g) => ({
			id: g.id,
			imageUrl: g.imageUrl,
			alt: t(locale, g.alt),
		})),
		highlightTitle: scenario.about.highlight
			? t(locale, scenario.about.highlight.title)
			: "",
		highlightBody: scenario.about.highlight
			? t(locale, scenario.about.highlight.body)
			: "",
		highlightImageUrl: "",
	},
});

const contactsMapBlock = (
	scenario: MarketplaceTemplateScenario,
	locale: MarketplaceLocale,
): PhotonBlock => ({
	id: "marketplaces-dve-palochki-contacts-map",
	module: "marketplaces-photon",
	type: "marketplaces.dve-palochki.contacts-map",
	props: {
		addressTitle: t(locale, {
			ru: "Адрес",
			kz: "Мекенжай",
			en: "Address",
		}),
		address: t(locale, scenario.contact.address),
		phonesTitle: t(locale, {
			ru: "Телефоны",
			kz: "Телефондар",
			en: "Phones",
		}),
		phones: scenario.contact.phones.map((phone, i) => ({
			id: `p-${i}`,
			phone,
		})),
		emailTitle: "Email",
		email: scenario.contact.email,
		hoursTitle: t(locale, {
			ru: "Время работы",
			kz: "Жұмыс уақыты",
			en: "Hours",
		}),
		hours: scenario.contact.hours,
		mapEmbedUrl: scenario.contact.mapEmbedUrl ?? "",
	},
});

const contactsFormBlock = (
	scenario: MarketplaceTemplateScenario,
	locale: MarketplaceLocale,
): PhotonBlock => ({
	id: "marketplaces-dve-palochki-contacts-form",
	module: "marketplaces-photon",
	type: "marketplaces.dve-palochki.contacts-form",
	props: {
		title: t(locale, {
			ru: "Есть вопросы? Свяжитесь с нами!",
			kz: "Сұрақтарыңыз бар ма? Бiзбен байланысыңыз!",
			en: "Got questions? Get in touch!",
		}),
		subtitle: "",
		namePlaceholder: t(locale, { ru: "Имя", kz: "Аты-жөнi", en: "Name" }),
		emailPlaceholder: "Email",
		phonePlaceholder: t(locale, { ru: "Телефон", kz: "Телефон", en: "Phone" }),
		messagePlaceholder: t(locale, {
			ru: "Текст сообщения",
			kz: "Хабарлама мәтiнi",
			en: "Message",
		}),
		submitLabel: t(locale, {
			ru: "Отправить",
			kz: "Жiберу",
			en: "Send",
		}),
		successMessage: t(locale, {
			ru: "Спасибо! Мы свяжемся с вами в ближайшее время.",
			kz: "Рахмет! Жақын арада сiзбен байланысамыз.",
			en: "Thanks! We will reach out shortly.",
		}),
	},
});

const deliverySquareBlock = (
	scenario: MarketplaceTemplateScenario,
	locale: MarketplaceLocale,
): PhotonBlock => ({
	id: "marketplaces-dve-palochki-delivery-square",
	module: "marketplaces-photon",
	type: "marketplaces.dve-palochki.delivery-square",
	props: {
		areaTitle: t(locale, scenario.delivery.areaTitle),
		streetTop: scenario.delivery.streetTop,
		streetBottom: scenario.delivery.streetBottom,
		streetLeft: scenario.delivery.streetLeft,
		streetRight: scenario.delivery.streetRight,
	},
});

const deliveryConditionsBlock = (
	scenario: MarketplaceTemplateScenario,
	locale: MarketplaceLocale,
): PhotonBlock => ({
	id: "marketplaces-dve-palochki-delivery",
	module: "marketplaces-photon",
	type: "marketplaces.dve-palochki.delivery-conditions",
	props: {
		pickupNote: t(locale, scenario.delivery.pickupPoint),
		minOrderNote: t(locale, scenario.delivery.minOrderText),
		paymentBlocks: scenario.delivery.paymentBlocks.map((pb, i) => ({
			id: `pb-${i}`,
			title: t(locale, pb.title),
			body: t(locale, pb.body),
		})),
	},
});

const reviewsListBlock = (
	scenario: MarketplaceTemplateScenario,
	locale: MarketplaceLocale,
): PhotonBlock => ({
	id: "marketplaces-dve-palochki-reviews",
	module: "marketplaces-photon",
	type: "marketplaces.dve-palochki.reviews-list",
	props: {
		emptyTitle: t(locale, {
			ru: "Отзывов пока нет",
			kz: "Пiкiрлер әлi жоқ",
			en: "No reviews yet",
		}),
		emptyBody: t(locale, {
			ru: "Будьте первым, кто поделится своим мнением",
			kz: "Алғашқы пiкiр қалдыратын адам болыңыз",
			en: "Be the first to share your opinion",
		}),
		formTitle: t(locale, {
			ru: "Оставить отзыв",
			kz: "Пiкiр қалдыру",
			en: "Leave a review",
		}),
		formBodyPlaceholder: t(locale, {
			ru: "Отзыв ...",
			kz: "Пiкiр ...",
			en: "Review ...",
		}),
		formNamePlaceholder: t(locale, { ru: "Имя", kz: "Аты", en: "Name" }),
		formEmailPlaceholder: "Email",
		formSubmitLabel: t(locale, {
			ru: "Опубликовать",
			kz: "Жариялау",
			en: "Publish",
		}),
		adminReplyLabel: t(locale, {
			ru: "Ответ администратора",
			kz: "Әкiмшiнiң жауабы",
			en: "Admin reply",
		}),
		reviews: scenario.reviews.map((r) => ({
			id: r.id,
			clientName: r.clientName,
			rating: r.rating,
			createdAt: r.createdAt,
			body: t(locale, r.body),
			adminReply: r.adminReply ? t(locale, r.adminReply) : "",
		})),
	},
});

const successScreenBlock = (
	scenario: MarketplaceTemplateScenario,
	locale: MarketplaceLocale,
): PhotonBlock => ({
	id: "marketplaces-dve-palochki-success",
	module: "marketplaces-photon",
	type: "marketplaces.dve-palochki.success-screen",
	props: {
		title: t(locale, {
			ru: "Заказ успешно оформлен!",
			kz: "Тапсырыс сәттi рәсiмделдi!",
			en: "Order placed successfully!",
		}),
		body: t(locale, {
			ru: "Мы свяжемся с вами для подтверждения заказа.",
			kz: "Тапсырысты растау үшiн сiзбен хабарласамыз.",
			en: "We will contact you to confirm the order.",
		}),
		primaryLabel: t(locale, {
			ru: "На главную",
			kz: "Басты бетке",
			en: "Back to home",
		}),
		primaryHref: "/",
	},
});

const notFoundScreenBlock = (
	scenario: MarketplaceTemplateScenario,
	locale: MarketplaceLocale,
): PhotonBlock => ({
	id: "marketplaces-dve-palochki-not-found",
	module: "marketplaces-photon",
	type: "marketplaces.dve-palochki.not-found-screen",
	props: {
		title: t(locale, {
			ru: "Эта страница не найдена.",
			kz: "Бұл бет табылмады.",
			en: "This page was not found.",
		}),
		body: t(locale, {
			ru: "Неправильно набран адрес, или такой страницы на сайте не существует.",
			kz: "Мекенжай қате терiлген, немесе бұл бет жоқ.",
			en: "Wrong URL, or this page does not exist.",
		}),
		primaryLabel: t(locale, {
			ru: "На главную",
			kz: "Басты бетке",
			en: "Home",
		}),
		primaryHref: "/",
	},
});

const productDetailBlocks = (
	scenario: MarketplaceTemplateScenario,
	locale: MarketplaceLocale,
): PhotonBlock[] => [
	{
		id: "marketplaces-dve-palochki-product-detail",
		module: "commerce-photon",
		type: "commerce-product-detail",
		props: {
			eyebrow: t(locale, {
				ru: "Товар",
				kz: "Тауар",
				en: "Product",
			}),
			backLabel: t(locale, {
				ru: "Назад в каталог",
				kz: "Каталогқа қайту",
				en: "Back to catalog",
			}),
			showSku: false,
			showDescription: true,
			showImage: true,
		},
		bindings: {
			product: { source: "commerceProduct", path: "product", mode: "write" },
		},
	},
	{
		id: "marketplaces-dve-palochki-add-to-cart",
		module: "commerce-photon",
		type: "commerce-add-to-cart",
		props: {
			quantityLabel: t(locale, { ru: "Количество", kz: "Саны", en: "Quantity" }),
			buttonLabel: t(locale, {
				ru: "В корзину",
				kz: "Себетке",
				en: "Add to cart",
			}),
		},
		bindings: {
			product: { source: "commerceProduct", path: "product", mode: "read" },
		},
	},
	...recommendedRail(
		"marketplaces-dve-palochki-product-related",
		scenario,
		locale,
		"items",
		{
			eyebrow: t(locale, {
				ru: "Похожие товары",
				kz: "Ұқсас тауарлар",
				en: "Related",
			}),
			title: "",
		},
	),
];

const cartBlocks = (
	scenario: MarketplaceTemplateScenario,
	locale: MarketplaceLocale,
): PhotonBlock[] => [
	sectionHeadingBlock(
		"marketplaces-dve-palochki-cart-heading",
		"",
		t(locale, { ru: "Моя корзина", kz: "Себетiм", en: "My cart" }),
		"",
	),
	{
		id: "marketplaces-dve-palochki-cart-summary",
		module: "commerce-photon",
		type: "commerce-cart-summary",
		props: {},
		bindings: {
			cart: { source: "commerceCartSummary", path: "cart", mode: "write" },
		},
	},
	...recommendedRail(
		"marketplaces-dve-palochki-cart-cross",
		scenario,
		locale,
		"dopolnitelno",
		{
			eyebrow: "",
			title: t(locale, {
				ru: "Дополнительные заказы",
				kz: "Қосымша тапсырыстар",
				en: "Add-ons",
			}),
		},
	),
];

const checkoutBlocks = (
	scenario: MarketplaceTemplateScenario,
	locale: MarketplaceLocale,
): PhotonBlock[] => [
	sectionHeadingBlock(
		"marketplaces-dve-palochki-checkout-heading",
		"",
		t(locale, {
			ru: "Оформление заказа",
			kz: "Тапсырысты рәсiмдеу",
			en: "Checkout",
		}),
		"",
	),
	{
		id: "marketplaces-dve-palochki-checkout-form",
		module: "commerce-photon",
		type: "commerce-checkout-form",
		props: {},
		bindings: {
			checkout: {
				source: "commerceCheckout",
				path: "checkout",
				mode: "write",
			},
		},
	},
];

const accountOrdersBlocks = (
	scenario: MarketplaceTemplateScenario,
	locale: MarketplaceLocale,
): PhotonBlock[] => [
	sectionHeadingBlock(
		"marketplaces-dve-palochki-account-orders-heading",
		"",
		t(locale, {
			ru: "Мои заказы",
			kz: "Тапсырыстарым",
			en: "My orders",
		}),
		"",
	),
	{
		id: "marketplaces-dve-palochki-order-list",
		module: "commerce-photon",
		type: "commerce-order-list",
		props: {},
		bindings: {
			orders: { source: "commerceOrderList", path: "orders", mode: "read" },
		},
	},
];

const accountProfileBlocks = (
	scenario: MarketplaceTemplateScenario,
	locale: MarketplaceLocale,
): PhotonBlock[] => [
	sectionHeadingBlock(
		"marketplaces-dve-palochki-account-profile-heading",
		"",
		t(locale, {
			ru: "Личный кабинет",
			kz: "Жеке кабинет",
			en: "Account",
		}),
		t(locale, {
			ru: "Здесь вы можете отредактировать данные профиля.",
			kz: "Профиль деректерiн осында өзгерте аласыз.",
			en: "Edit your profile information here.",
		}),
	),
];

const homeBlocks = (
	scenario: MarketplaceTemplateScenario,
	locale: MarketplaceLocale,
): PhotonBlock[] => {
	const featured = recommendedRail(
		"marketplaces-dve-palochki-home-featured",
		scenario,
		locale,
		"items",
		{
			eyebrow: "",
			title: t(locale, {
				ru: "Лучшие предложения",
				kz: "Ең үздiк ұсыныстар",
				en: "Best offers",
			}),
		},
	);
	const sets = recommendedRail(
		"marketplaces-dve-palochki-home-sets",
		scenario,
		locale,
		"seti",
		{
			eyebrow: "",
			title: t(locale, { ru: "Сеты", kz: "Сеттер", en: "Sets" }),
		},
	);
	const gunkans = recommendedRail(
		"marketplaces-dve-palochki-home-gunkans",
		scenario,
		locale,
		"gunkany",
		{
			eyebrow: "",
			title: t(locale, {
				ru: "Гунканы",
				kz: "Гункандар",
				en: "Gunkans",
			}),
		},
	);

	return [
		heroSliderBlock(scenario, locale),
		...featured,
		...sets,
		...gunkans,
		instagramStripBlock(scenario, locale),
	];
};

export const dvePalochkiTemplateFamily: MarketplaceTemplateFamily = {
	id: "dve-palochki",
	defaultScenario: dvePalochkiDefaultScenario,
	blockTypes: dvePalochkiBlockTypes,

	createHomeBlocks: homeBlocks,

	createCatalogBlocks(scenario, locale, options) {
		return [
			sectionHeadingBlock(
				`marketplaces-dve-palochki-catalog-heading-${options?.categorySlug ?? "all"}`,
				"",
				options?.categoryLabel
					? t(locale, options.categoryLabel)
					: t(locale, {
							ru: "Каталог",
							kz: "Каталог",
							en: "Catalog",
						}),
				"",
			),
			productGridBlock(
				`marketplaces-dve-palochki-catalog-${options?.categorySlug ?? "all"}`,
				options?.categorySlug,
				locale,
				{ columns: 3, showDescription: true },
			),
		];
	},

	createProductBlocks: productDetailBlocks,
	createCartBlocks: cartBlocks,
	createCheckoutBlocks: checkoutBlocks,

	createAccountBlocks(scenario, locale, key) {
		switch (key) {
			case "orders":
				return accountOrdersBlocks(scenario, locale);
			case "profile":
				return accountProfileBlocks(scenario, locale);
			default:
				return [];
		}
	},

	createStaticPageBlocks(scenario, locale, page) {
		switch (page) {
			case "about":
				return [aboutSectionBlock(scenario, locale)];
			case "contacts":
				return [
					contactsMapBlock(scenario, locale),
					contactsFormBlock(scenario, locale),
					deliverySquareBlock(scenario, locale),
				];
			case "payment-and-delivery":
				return [
					deliverySquareBlock(scenario, locale),
					deliveryConditionsBlock(scenario, locale),
				];
			case "privacy":
				return [
					sectionHeadingBlock(
						"marketplaces-dve-palochki-privacy-heading",
						"",
						t(locale, {
							ru: "Политика конфиденциальности",
							kz: "Құпиялылық саясаты",
							en: "Privacy policy",
						}),
						"",
					),
				];
			case "reviews":
				return [reviewsListBlock(scenario, locale)];
			case "success":
				return [successScreenBlock(scenario, locale)];
			case "not-found":
				return [notFoundScreenBlock(scenario, locale)];
			case "auth-login":
			case "auth-register":
				/*
				 * Auth pages are rendered by `@init/auth-photon`'s
				 * auth-page block. The kit only provides the chrome
				 * via the site-frame extension; the page document is
				 * built by the auth kit's profile recipe.
				 */
				return [];
			default:
				return [];
		}
	},

	createSiteRegionBlocks(scenario, locale, key) {
		if (key === "header") {
			return [
				headerBlock(scenario, locale),
				mobileBurgerMenuBlock(scenario, locale),
			];
		}
		if (key === "footer") {
			return [footerBlock(scenario, locale), mobileBottomBarBlock(scenario, locale)];
		}
		return [];
	},

	createSiteSettingsPatch(scenario, locale) {
		return {
			design: dvePalochkiSiteDesignPatch,
			brand: dvePalochkiSiteBrandPatch,
			marketplaces: {
				familyId: "dve-palochki",
				scenarioId: scenario.id,
				locale,
				reviews: scenario.reviews.map((r) => ({
					id: r.id,
					clientName: r.clientName,
					rating: r.rating,
					createdAt: r.createdAt,
					body: t(locale, r.body),
					adminReply: r.adminReply ? t(locale, r.adminReply) : "",
				})),
			},
		};
	},
};
