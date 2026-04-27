import type { MarketplaceTemplateScenario } from "../../shared";

/**
 * Default scenario for the `dve-palochki` family. Content mirrors
 * the live site `https://dve-palochky.kz/` (used as a visual
 * reference). Texts are authored in `ru` and `kz`; English is
 * intentionally not authored in v1 — see
 * `THATS_THE_WAY_IT_SHOULD_BE.md` decision "Locales".
 */
export const dvePalochkiDefaultScenario: MarketplaceTemplateScenario = {
	id: "marketplaces-dve-palochki-default",
	familyId: "dve-palochki",
	locales: ["ru", "kz"],
	defaultLocale: "ru",
	brand: {
		ru: "Две палочки",
		kz: "Екi таяқша",
	},
	tagline: {
		ru: "Доставка суши и пиццы",
		kz: "Суши және пицца жеткiзу",
	},
	logoUrl: "/marketplaces/dve-palochki/logo.svg",
	logoAlt: {
		ru: "Логотип «Две палочки»",
		kz: "«Екi таяқша» логотипi",
	},
	contact: {
		phones: ["+7 (702) 384-57-77", "+7 (778) 614-08-47", "+7 (778) 612-87-77"],
		email: "info@dve-palochky.kz",
		address: {
			ru: "Казахстан, г. Алматы, ул. Абиша Кекилбайулы 149А",
			kz: "Қазақстан, Алматы қ., Әбiш Кекiлбайұлы к-сi 149А",
		},
		hours: "10:00 – 22:30",
		mapEmbedUrl:
			"https://yandex.com/map-widget/v1/?ll=76.901%2C43.205&z=15&pt=76.901%2C43.205,pm2rdl",
		socials: [
			{
				id: "instagram",
				href: "https://instagram.com/dve_palochki.kz",
				kind: "instagram",
			},
		],
	},
	hero: {
		slides: [
			{
				id: "halal",
				imageUrl: "/marketplaces/dve-palochki/hero-halal.jpg",
				title: {
					ru: "HALAL",
					kz: "HALAL",
				},
				subtitle: {
					ru: "Вся еда соответствует халяльным стандартам",
					kz: "Барлық тағам халал стандарттарына сай",
				},
				overlay: "soft",
			},
			{
				id: "sets",
				imageUrl: "/marketplaces/dve-palochki/hero-sets.jpg",
				title: {
					ru: "Сеты для большой компании",
					kz: "Үлкен компанияға арналған сеттер",
				},
				cta: {
					label: { ru: "Открыть каталог", kz: "Каталогты ашу" },
					href: "/archive/seti",
				},
				overlay: "soft",
			},
			{
				id: "delivery",
				imageUrl: "/marketplaces/dve-palochki/hero-delivery.jpg",
				title: {
					ru: "Доставим за 60–90 минут",
					kz: "60–90 минутта жеткiземiз",
				},
				cta: {
					label: { ru: "Заказать", kz: "Тапсырыс беру" },
					href: "/archive",
				},
				overlay: "soft",
			},
		],
	},
	categories: [
		{
			id: "supplements",
			label: { ru: "Дополнительно", kz: "Қосымша" },
			slug: "dopolnitelno",
			icon: "supplements",
		},
		{ id: "sets", label: { ru: "Сеты", kz: "Сеттер" }, slug: "seti", icon: "sets" },
		{ id: "pizza", label: { ru: "Пицца", kz: "Пицца" }, slug: "pizza", icon: "pizza" },
		{
			id: "rolls",
			label: { ru: "Роллы", kz: "Роллдар" },
			slug: "rolly",
			icon: "rolls",
		},
		{
			id: "fried-rolls",
			label: { ru: "Жареные роллы", kz: "Қуырылған роллдар" },
			slug: "zharenye-rolly",
			icon: "fried-rolls",
		},
		{
			id: "gunkans",
			label: { ru: "Гунканы", kz: "Гункандар" },
			slug: "gunkany",
			icon: "gunkans",
		},
		{
			id: "drinks",
			label: { ru: "Напитки", kz: "Сусындар" },
			slug: "napitki",
			icon: "drinks",
		},
		{
			id: "nigiri",
			label: { ru: "Нигири", kz: "Нигири" },
			slug: "nigiri",
			icon: "nigiri",
		},
		{
			id: "snacks",
			label: { ru: "Закуски", kz: "Тағамдар" },
			slug: "zakuski",
			icon: "snacks",
		},
		{
			id: "baked-rolls",
			label: { ru: "Запечённые роллы", kz: "Пiсiрiлген роллдар" },
			slug: "zapechennye-rolly",
			icon: "baked-rolls",
		},
	],
	about: {
		title: {
			ru: "О компании «Две палочки»",
			kz: "«Екi таяқша» компаниясы туралы",
		},
		body: {
			ru: 'Наша подача еды — это не просто положенная на тарелку нарезка из набора ингредиентов в Алматы среди суши. С 2014 года мы выкладываем рисунки и формы пищевыми точками, точно работаем с углами разделки рыбы и подбираем сочетания, которые удерживают вкус. В Алматы много сетей-конкурентов, мы ставим в фокус качество ингредиентов и стабильность вкуса от заказа к заказу. Если вы видите наше блюдо в первый раз — вероятно, оно вам понравится так же, как нашим постоянным клиентам.',
			kz: 'Бiздiң тағам ұсынысы — Алматыдағы суши арасынан тiзiлген ингредиенттер ғана емес. 2014 жылдан берi суреттер мен формаларды нақты жинаймыз, балықты тiлгенде бұрыштарды ұқыпты ұстаймыз және дәмдi сақтайтын тiркесiмдердi таңдаймыз. Алматыда көп бәсекелес желiлер бар, бiз сапа мен тапсырыстан тапсырысқа дейiн тұрақты дәмге назар аударамыз.',
		},
		gallery: [
			{
				id: "g1",
				imageUrl: "/marketplaces/dve-palochki/about-1.jpg",
				alt: { ru: "Сеты крупным планом", kz: "Сеттер" },
			},
			{
				id: "g2",
				imageUrl: "/marketplaces/dve-palochki/about-2.jpg",
				alt: { ru: "Подача нигири", kz: "Нигири" },
			},
		],
		highlight: {
			title: {
				ru: "Свежие ингредиенты, высокое качество",
				kz: "Жаңа ингредиенттер, жоғары сапа",
			},
			body: {
				ru: "Мы предлагаем еду из только проверенных продуктов на ваш стол. Закажите сейчас и убедитесь сами — вкусно, быстро и выгодно!",
				kz: "Тек тексерiлген өнiмдер. Қазiр тапсырыс берiңiз де, өзiңiз көрiңiз — дәмдi, жылдам, тиiмдi!",
			},
		},
	},
	delivery: {
		areaTitle: {
			ru: "Бесплатная доставка только в пределах квадрата",
			kz: "Тегiн жеткiзу тек шаршы аумағында",
		},
		streetTop: "Аль-Фараби",
		streetBottom: "Райымбека",
		streetLeft: "Достык",
		streetRight: "Момышулы",
		pickupPoint: {
			ru: "Доставка осуществляется с адреса: г. Алматы, ул. Тажибаевой 184.",
			kz: "Жеткiзу мекенжайы: Алматы қ., Тәжiбаева к-сi 184.",
		},
		minOrderText: {
			ru: "Минимальная сумма заказа 5000 тг. Без учёта стоимости доставки!",
			kz: "Тапсырыстың ең төменгi сомасы 5000 теңге. Жеткiзу құнын есепке алмағанда!",
		},
		paymentBlocks: [
			{
				title: { ru: "Оплата наличными", kz: "Қолма-қол төлем" },
				body: {
					ru: "При выборе варианта оплаты наличными, вы дожидаетесь приезда курьера и передаёте ему сумму за товар в тенге. Курьер предоставляет товар, который можно осмотреть на предмет повреждений. Покупатель подписывает товаросопроводительные документы, вносит денежные средства и получает чек.",
					kz: "Қолма-қол төлеу нұсқасын таңдаған кезде, курьердiң келуiн күтiп, тауар үшiн соманы теңгемен берiңiз. Курьер тауарды ұсынады, оны зақым-зақымдары жоқтығына көзiңiз жетедi. Сатып алушы тауардың сүйеулi құжаттарына қол қояды, ақшаны қосады және чек алады.",
				},
			},
			{
				title: { ru: "Условия доставки", kz: "Жеткiзу шарттары" },
				body: {
					ru: "Предлагаем вкусные суши, пиццы, супы, салаты и фри с быстрой бесплатной доставкой по Алматы (в пределах зоны). Качество, приятные цены и отличный сервис заслужили доверие наших клиентов.",
					kz: "Алматы бойынша (аймақ шегiнде) тегiн жылдам жеткiзумен дәмдi суши, пицца, көже, салаттар мен картоп ұсынамыз. Сапа, жайлы бағалар мен жақсы қызмет тұтынушыларымыздың сенiмiне ие.",
				},
			},
		],
	},
	reviews: [
		{
			id: "r1",
			clientName: "Айгерим",
			rating: 5,
			createdAt: "2026-04-12",
			body: {
				ru: "Заказывали сет на компанию из 6 человек. Свежо, быстро, очень вкусно. Курьер вежливый.",
				kz: "6 адамға сет тапсырдық. Жаңа, жылдам, өте дәмдi. Курьер сыпайы.",
			},
		},
		{
			id: "r2",
			clientName: "Дамир",
			rating: 5,
			createdAt: "2026-03-30",
			body: {
				ru: "Лучшие роллы в Алматы. Берём раз в неделю — никогда не подводили.",
				kz: "Алматыдағы ең үздiк роллдар. Аптасына бiр рет аламыз — әрдайым жоғары деңгейде.",
			},
			adminReply: {
				ru: "Спасибо! Ждём вас снова.",
				kz: "Рахмет! Тағы күтемiз.",
			},
		},
	],
	instagram: {
		handle: "@dve_palochki.kz",
		tiles: [
			{
				id: "i1",
				imageUrl: "/marketplaces/dve-palochki/insta-1.jpg",
				href: "https://instagram.com/dve_palochki.kz",
			},
			{
				id: "i2",
				imageUrl: "/marketplaces/dve-palochki/insta-2.jpg",
				href: "https://instagram.com/dve_palochki.kz",
			},
			{
				id: "i3",
				imageUrl: "/marketplaces/dve-palochki/insta-3.jpg",
				href: "https://instagram.com/dve_palochki.kz",
			},
			{
				id: "i4",
				imageUrl: "/marketplaces/dve-palochki/insta-4.jpg",
				href: "https://instagram.com/dve_palochki.kz",
			},
		],
	},
	legalLinks: [
		{
			id: "privacy",
			label: {
				ru: "Политика конфиденциальности",
				kz: "Құпиялылық саясаты",
			},
			route: "/privacy",
		},
	],
};
