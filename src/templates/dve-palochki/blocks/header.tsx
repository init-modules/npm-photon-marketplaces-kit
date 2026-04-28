"use client";

import {
	COMMERCE_TAXONOMY_CATEGORIES_SOURCE,
	type CommerceTaxonomyTermView,
} from "@init/commerce-photon";
import {
	definePhotonBlockDefinition,
	headerActionsSlot,
	headerUtilitySlot,
	PhotonLink,
	type PhotonBlock,
	usePhotonResolvedSlot,
	usePhotonValueAtPath,
} from "@init/photon/public";
import { Menu, MessageCircle, Phone, Search } from "lucide-react";
import {
	type ComponentType,
	useEffect,
	useId,
	useRef,
	useState,
} from "react";
import { MarketplaceCategoryIcon } from "../../../shared/icons/category-icons";
import type { MarketplaceCategoryIconKey } from "../../shared";
import { openDvePalochkiBurgerMenu } from "./mobile-burger-menu";

/**
 * Utility-row links and the right-aligned action area (account, cart,
 * etc.) are populated from contributions registered into the
 * `header.utility` and `header.actions` slots. Override per profile via
 * the `contribution-list` inspector fields on this block.
 *
 * The category list is sourced from the
 * `commerce.taxonomy.categories` binding (configured on this block via
 * `block.bindings.categories`). The `categories` prop below is kept as
 * a manual override / fallback for environments without taxonomy
 * hydration (e.g. seed previews).
 */
type HeaderProps = {
	brandLabel: string;
	brandTagline: string;
	logoUrl: string;
	homeHref: string;
	deliveryNote: string;
	deliveryHighlight: string;
	primaryPhone: string;
	whatsappPhone: string;
	phones: ReadonlyArray<{
		id: string;
		phone: string;
		whatsapp?: boolean;
	}>;
	searchPlaceholder: string;
	categories: ReadonlyArray<{
		id: string;
		label: string;
		href: string;
		icon: MarketplaceCategoryIconKey;
	}>;
	localeSwitcher: ReadonlyArray<{
		id: string;
		label: string;
		href: string;
		isActive?: boolean;
	}>;
};

const pickLocalized = (
	value: Record<string, string> | undefined,
	fallback: string,
): string => {
	if (!value) return fallback;
	return value.en ?? value.ru ?? Object.values(value)[0] ?? fallback;
};

const HEADER_BLOCK_TYPE = "marketplaces.dve-palochki.header";

const sanitizeTel = (raw: string): string => raw.replace(/[^+\d]/g, "");
const sanitizeWhatsapp = (raw: string): string => raw.replace(/[^\d]/g, "");

type ContactsDropdownEntry = {
	id: string;
	phone: string;
	whatsapp?: boolean;
};

const ContactsDropdown = ({
	primaryPhone,
	phones,
	whatsappPhone,
}: {
	primaryPhone: string;
	phones: ReadonlyArray<ContactsDropdownEntry>;
	whatsappPhone: string;
}) => {
	const [open, setOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (!open) return;
		const handler = (event: MouseEvent) => {
			if (!containerRef.current) return;
			if (!containerRef.current.contains(event.target as Node)) {
				setOpen(false);
			}
		};
		document.addEventListener("mousedown", handler);
		return () => document.removeEventListener("mousedown", handler);
	}, [open]);

	const hasWhatsapp = whatsappPhone.length > 0;
	const hasMultiple = phones.length > 1 || (phones.length === 1 && hasWhatsapp);

	if (phones.length === 0 && primaryPhone.length === 0 && !hasWhatsapp) {
		return null;
	}

	if (!hasMultiple) {
		const single = phones[0]?.phone ?? primaryPhone;
		if (!single) return null;
		return (
			<a
				href={`tel:${sanitizeTel(single)}`}
				className="inline-flex items-center gap-1.5 font-medium hover:text-[var(--mp-accent,#E32636)]"
			>
				<Phone className="h-3.5 w-3.5" /> {single}
			</a>
		);
	}

	const triggerLabel = primaryPhone || phones[0]?.phone || "";

	return (
		<div ref={containerRef} className="relative">
			<button
				type="button"
				onClick={() => setOpen((v) => !v)}
				aria-haspopup="menu"
				aria-expanded={open}
				className="inline-flex items-center gap-1.5 font-medium hover:text-[var(--mp-accent,#E32636)]"
			>
				<Phone className="h-3.5 w-3.5" /> {triggerLabel}
			</button>
			{open ? (
				<div
					role="menu"
					className="absolute right-0 top-full z-50 mt-2 min-w-[220px] rounded-md border border-[var(--photon-site-border,#E5E5E5)] bg-[var(--photon-site-surface,#fff)] p-2 shadow-lg"
				>
					<ul className="flex flex-col">
						{phones.map((entry) => (
							<li key={entry.id}>
								<a
									href={`tel:${sanitizeTel(entry.phone)}`}
									className="flex items-center gap-2 rounded px-2 py-1.5 text-sm hover:bg-[color:rgba(0,0,0,0.04)]"
								>
									<Phone className="h-3.5 w-3.5 text-[var(--mp-accent,#E32636)]" />
									<span>{entry.phone}</span>
								</a>
							</li>
						))}
						{hasWhatsapp ? (
							<li>
								<a
									href={`https://wa.me/${sanitizeWhatsapp(whatsappPhone)}`}
									target="_blank"
									rel="noreferrer"
									className="flex items-center gap-2 rounded px-2 py-1.5 text-sm hover:bg-[color:rgba(0,0,0,0.04)]"
								>
									<MessageCircle className="h-3.5 w-3.5 text-[#25D366]" />
									<span>WhatsApp</span>
								</a>
							</li>
						) : null}
					</ul>
				</div>
			) : null}
		</div>
	);
};

const LocaleDropdown = ({
	localeSwitcher,
}: {
	localeSwitcher: HeaderProps["localeSwitcher"];
}) => {
	const id = useId();
	if (localeSwitcher.length === 0) return null;
	const active = localeSwitcher.find((l) => l.isActive)?.id ?? localeSwitcher[0]?.id;
	return (
		<select
			id={id}
			value={active}
			onChange={(event) => {
				const target = localeSwitcher.find((l) => l.id === event.target.value);
				if (target) {
					window.location.href = target.href;
				}
			}}
			className="ml-2 appearance-none rounded border border-[var(--photon-site-border,#E5E5E5)] bg-transparent px-2 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--photon-site-text,#0F0F0F)] hover:bg-[color:rgba(0,0,0,0.04)]"
			aria-label="Language"
		>
			{localeSwitcher.map((l) => (
				<option key={l.id} value={l.id}>
					{l.label}
				</option>
			))}
		</select>
	);
};

const HeaderBlock = ({ block }: { block: PhotonBlock<HeaderProps> }) => {
	const props = block.props;
	const resolvedUtility = usePhotonResolvedSlot(headerUtilitySlot);
	const resolvedActions = usePhotonResolvedSlot(headerActionsSlot);

	// Bound categories via `block.bindings.categories` -> commerce taxonomy.
	// Falls back to props.categories so seed previews still work without
	// a hydrated taxonomy resource.
	const boundCategories = usePhotonValueAtPath(block.id, "categories") as
		| readonly CommerceTaxonomyTermView[]
		| undefined;
	const resolvedCategories =
		Array.isArray(boundCategories) && boundCategories.length > 0
			? boundCategories.map((term) => ({
					id: term.id,
					label: term.label,
					href: term.href,
					icon: (term.icon ?? "supplements") as MarketplaceCategoryIconKey,
				}))
			: props.categories;

	const sentinelRef = useRef<HTMLDivElement | null>(null);
	const [isStuck, setIsStuck] = useState(false);
	useEffect(() => {
		const sentinel = sentinelRef.current;
		if (!sentinel || typeof IntersectionObserver === "undefined") return;
		const io = new IntersectionObserver(
			(entries) => {
				const entry = entries[0];
				if (entry) {
					setIsStuck(!entry.isIntersecting);
				}
			},
			{ rootMargin: "0px", threshold: 0 },
		);
		io.observe(sentinel);
		return () => io.disconnect();
	}, []);

	const categoriesNav = (
		<nav className="border-y border-[var(--photon-site-border,#E5E5E5)] bg-[var(--photon-site-surface,#fff)]">
			<div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-4 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
				{resolvedCategories.map((c) => (
					<PhotonLink
						key={c.id}
						href={c.href}
						className="inline-flex shrink-0 items-center gap-2 rounded-full px-3 py-1.5 text-sm text-[var(--photon-site-text,#0F0F0F)] hover:bg-[color:rgba(0,0,0,0.04)] hover:text-[var(--mp-accent,#E32636)]"
					>
						<span className="inline-flex h-7 w-7 items-center justify-center text-[var(--mp-accent,#E32636)]">
							<MarketplaceCategoryIcon icon={c.icon} className="h-6 w-6" />
						</span>
						<span>{c.label}</span>
					</PhotonLink>
				))}
			</div>
		</nav>
	);

	return (
		<header className="bg-[var(--photon-site-surface,#fff)] text-[var(--photon-site-text,#0F0F0F)]">
			<div className="sticky top-0 z-40 bg-[var(--photon-site-surface,#fff)]">
				<div className="border-b border-[var(--photon-site-border,#E5E5E5)]">
					<div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 text-xs">
						<div className="flex items-center gap-2 text-[var(--photon-site-muted-text,#5C5C5C)]">
							<svg
								viewBox="0 0 24 24"
								className="h-4 w-4 text-[var(--mp-accent,#E32636)]"
								fill="currentColor"
								aria-hidden
							>
								<path d="M5 13h2l1.5-3.5h7L17 13h2v3h-1a2 2 0 1 1-4 0H10a2 2 0 1 1-4 0H5z" />
							</svg>
							<span>
								{props.deliveryNote}{" "}
								<strong className="text-[var(--photon-site-text,#0F0F0F)]">
									{props.deliveryHighlight}
								</strong>
							</span>
						</div>
						<div className="hidden items-center gap-4 md:flex">
							<ContactsDropdown
								primaryPhone={props.primaryPhone}
								phones={props.phones}
								whatsappPhone={props.whatsappPhone}
							/>
							<nav className="flex items-center gap-3">
								{resolvedUtility.map(({ resolved: r }) => (
									<PhotonLink
										key={r.contributionId}
										href={r.href ?? "#"}
										className="hover:text-[var(--mp-accent,#E32636)]"
									>
										{pickLocalized(r.label, r.contributionId)}
									</PhotonLink>
								))}
							</nav>
						</div>
					</div>
				</div>

				<div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4">
					<button
						type="button"
						aria-label="Menu"
						onClick={() => openDvePalochkiBurgerMenu()}
						className="-ml-1 inline-flex h-9 w-9 items-center justify-center rounded-md text-[var(--photon-site-text,#0F0F0F)] hover:bg-[color:rgba(0,0,0,0.04)] md:hidden"
					>
						<Menu className="h-5 w-5" />
					</button>
					<PhotonLink
						href={props.homeHref}
						className="flex items-center gap-3 text-left"
					>
						{props.logoUrl ? (
							<img
								src={props.logoUrl}
								alt={props.brandLabel}
								className="h-12 w-auto"
							/>
						) : null}
						<span className="hidden flex-col leading-tight text-xs uppercase tracking-wide text-[var(--photon-site-muted-text,#5C5C5C)] md:flex">
							<span className="text-sm font-bold text-[var(--photon-site-text,#0F0F0F)]">
								{props.brandLabel}
							</span>
							<span>{props.brandTagline}</span>
						</span>
					</PhotonLink>
					<LocaleDropdown localeSwitcher={props.localeSwitcher} />
					<form
						role="search"
						className="ml-2 flex flex-1 items-center gap-2"
						onSubmit={(e) => e.preventDefault()}
					>
						<button
							type="button"
							className="hidden whitespace-nowrap rounded-md bg-[var(--mp-accent,#E32636)] px-3 py-2 text-sm font-semibold text-white sm:inline-flex"
						>
							{props.searchPlaceholder}
						</button>
						<label className="flex flex-1 items-center gap-2 rounded-md border border-[var(--photon-site-border,#E5E5E5)] px-3 py-2 text-sm">
							<Search className="h-4 w-4 text-[var(--photon-site-muted-text,#5C5C5C)]" />
							<input
								type="search"
								placeholder={props.searchPlaceholder}
								className="w-full bg-transparent outline-none"
							/>
						</label>
					</form>
					<nav className="ml-2 hidden items-center gap-2 md:flex">
						{resolvedActions.map(({ contribution, resolved: r }) => {
							const Component = contribution.component as ComponentType<
								Record<string, unknown>
							>;
							return (
								<Component
									key={r.contributionId}
									{...(r as unknown as Record<string, unknown>)}
								/>
							);
						})}
					</nav>
				</div>
			</div>

			<div ref={sentinelRef} className="h-px" aria-hidden />

			{isStuck ? (
				<>
					<div className="fixed inset-x-0 top-0 z-50 bg-[var(--photon-site-surface,#fff)] shadow-sm">
						{categoriesNav}
					</div>
					<div className="h-[60px]" aria-hidden />
				</>
			) : (
				categoriesNav
			)}
		</header>
	);
};

export const dvePalochkiHeaderDefinition = definePhotonBlockDefinition<HeaderProps>(
	{
		type: HEADER_BLOCK_TYPE,
		label: "Marketplace Header (Dve Palochki)",
		description:
			"Dve Palochki storefront header with utility row, logo+search, and category sub-nav.",
		category: "Marketplaces / Dve Palochki",
		icon: "panel-top",
		component: HeaderBlock,
		defaults: {
			brandLabel: "",
			brandTagline: "",
			logoUrl: "",
			homeHref: "",
			deliveryNote: "",
			deliveryHighlight: "",
			primaryPhone: "",
			whatsappPhone: "",
			phones: [],
			searchPlaceholder: "",
			categories: [],
			localeSwitcher: [],
		},
		fields: [
			{
				path: "brandLabel",
				label: "Brand label",
				kind: "text",
				group: "content",
				localization: "localized",
			},
			{
				path: "brandTagline",
				label: "Brand tagline",
				kind: "text",
				group: "content",
				localization: "localized",
			},
			{
				path: "logoUrl",
				label: "Logo URL",
				kind: "image",
				group: "content",
				localization: "shared",
			},
			{
				path: "deliveryHighlight",
				label: "Delivery time text",
				kind: "text",
				group: "content",
				localization: "shared",
			},
			{
				path: "primaryPhone",
				label: "Primary phone",
				kind: "text",
				group: "content",
				localization: "shared",
			},
			{
				path: "whatsappPhone",
				label: "WhatsApp phone",
				kind: "text",
				group: "content",
				localization: "shared",
			},
			{
				path: "phones",
				label: "Contact phones",
				kind: "repeater",
				group: "content",
				localization: "shared",
				itemLabelPath: "phone",
				addLabel: "Add phone",
				fields: [
					{ path: "phone", label: "Phone", kind: "text" },
					{ path: "whatsapp", label: "WhatsApp?", kind: "toggle" },
				],
			},
			{
				path: "searchPlaceholder",
				label: "Catalog button label",
				kind: "text",
				group: "content",
				localization: "localized",
			},
			{
				path: "categories",
				label: "Category shortcuts (manual fallback)",
				kind: "repeater",
				group: "content",
				localization: "localized",
				itemLabelPath: "label",
				addLabel: "Add category",
				fields: [
					{ path: "label", label: "Label", kind: "text" },
					{
						path: "href",
						label: "Href",
						kind: "url",
						localization: "shared",
					},
					{
						path: "icon",
						label: "Icon",
						kind: "select",
						localization: "shared",
						options: [
							{ value: "supplements", label: "Supplements" },
							{ value: "rolls", label: "Rolls" },
							{ value: "pizza", label: "Pizza" },
							{ value: "sets", label: "Sets" },
							{ value: "fried-rolls", label: "Fried rolls" },
							{ value: "gunkans", label: "Gunkans" },
							{ value: "drinks", label: "Drinks" },
							{ value: "nigiri", label: "Nigiri" },
							{ value: "snacks", label: "Snacks" },
							{ value: "baked-rolls", label: "Baked rolls" },
							{ value: "noodles", label: "Noodles" },
							{ value: "soup", label: "Soup" },
							{ value: "salad", label: "Salad" },
							{ value: "dessert", label: "Dessert" },
						],
					},
				],
			},
			{
				path: "__utility_contributions",
				label: "Utility-row links",
				kind: "contribution-list",
				slotId: "header.utility",
				group: "content",
			},
			{
				path: "__action_contributions",
				label: "Header actions (cart, account, etc.)",
				kind: "contribution-list",
				slotId: "header.actions",
				group: "content",
			},
			{
				path: "localeSwitcher",
				label: "Locale switcher",
				kind: "repeater",
				group: "layout",
				localization: "shared",
				itemLabelPath: "label",
				addLabel: "Add locale",
				fields: [
					{ path: "label", label: "Label", kind: "text" },
					{ path: "href", label: "Href", kind: "url" },
					{ path: "isActive", label: "Is active", kind: "toggle" },
				],
			},
		],
	},
);

export const dvePalochkiHeaderCategoriesBindingSource =
	COMMERCE_TAXONOMY_CATEGORIES_SOURCE;
