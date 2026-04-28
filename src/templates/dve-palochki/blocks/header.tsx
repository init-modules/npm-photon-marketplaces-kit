"use client";

import {
	definePhotonBlockDefinition,
	headerActionsSlot,
	headerUtilitySlot,
	PhotonLink,
	type PhotonBlock,
	usePhotonResolvedSlot,
} from "@init/photon/public";
import { Phone, Search, User } from "lucide-react";
import { MarketplaceCategoryIcon } from "../../../shared/icons/category-icons";
import type { MarketplaceCategoryIconKey } from "../../shared";

/**
 * Utility-row links and the right-aligned action area (account, cart,
 * etc.) are populated from contributions registered into the
 * `header.utility` and `header.actions` slots. Override per profile via
 * the `contribution-list` inspector fields on this block.
 */
type HeaderProps = {
	brandLabel: string;
	brandTagline: string;
	logoUrl: string;
	homeHref: string;
	deliveryNote: string;
	deliveryHighlight: string;
	primaryPhone: string;
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

const HeaderBlock = ({ block }: { block: PhotonBlock<HeaderProps> }) => {
	const props = block.props;
	const resolvedUtility = usePhotonResolvedSlot(headerUtilitySlot);
	const resolvedActions = usePhotonResolvedSlot(headerActionsSlot);

	return (
		<header className="bg-[var(--photon-site-surface,#fff)] text-[var(--photon-site-text,#0F0F0F)]">
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
						{props.primaryPhone ? (
							<a
								href={`tel:${props.primaryPhone.replace(/[^+\d]/g, "")}`}
								className="inline-flex items-center gap-1.5 font-medium hover:text-[var(--mp-accent,#E32636)]"
							>
								<Phone className="h-3.5 w-3.5" /> {props.primaryPhone}
							</a>
						) : null}
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
							{resolvedActions.map(({ resolved: r }) => (
								<PhotonLink
									key={r.contributionId}
									href={r.href ?? "#"}
									className="inline-flex items-center gap-1 hover:text-[var(--mp-accent,#E32636)]"
								>
									<User className="h-3.5 w-3.5" />
									{pickLocalized(r.label, r.contributionId)}
								</PhotonLink>
							))}
						</nav>
					</div>
				</div>
			</div>

			<div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4">
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
				{props.localeSwitcher.length > 0 ? (
					<div className="ml-2 inline-flex overflow-hidden rounded-md border border-[var(--photon-site-border,#E5E5E5)] text-xs font-semibold uppercase">
						{props.localeSwitcher.map((l) => (
							<PhotonLink
								key={l.id}
								href={l.href}
								className={[
									"px-2.5 py-1.5 transition",
									l.isActive
										? "bg-[var(--mp-accent,#E32636)] text-white"
										: "text-[var(--photon-site-muted-text,#5C5C5C)] hover:bg-[color:rgba(0,0,0,0.04)]",
								].join(" ")}
							>
								{l.label}
							</PhotonLink>
						))}
					</div>
				) : null}
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
			</div>

			<nav className="border-y border-[var(--photon-site-border,#E5E5E5)] bg-[var(--photon-site-surface,#fff)]">
				<div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-4 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
					{props.categories.map((c) => (
						<PhotonLink
							key={c.id}
							href={c.href}
							className="inline-flex shrink-0 items-center gap-2 rounded-full px-3 py-1.5 text-sm text-[var(--photon-site-text,#0F0F0F)] hover:bg-[color:rgba(0,0,0,0.04)] hover:text-[var(--mp-accent,#E32636)]"
						>
							<span className="inline-flex h-7 w-7 items-center justify-center text-[var(--mp-accent,#E32636)]">
								<MarketplaceCategoryIcon
									icon={c.icon}
									className="h-6 w-6"
								/>
							</span>
							<span>{c.label}</span>
						</PhotonLink>
					))}
				</div>
			</nav>
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
				path: "searchPlaceholder",
				label: "Catalog button label",
				kind: "text",
				group: "content",
				localization: "localized",
			},
			{
				path: "categories",
				label: "Category shortcuts",
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
