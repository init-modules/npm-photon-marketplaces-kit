"use client";

import {
	createPhotonLocalizedDefault,
	definePhotonBlockDefinition,
	PhotonLink,
	type PhotonBlock,
} from "@init/photon/public";
import { MarketplaceCategoryIcon } from "../../../shared/icons/category-icons";
import type { MarketplaceCategoryIconKey } from "../../shared";

type Item = {
	id: string;
	label: string;
	href: string;
	icon: MarketplaceCategoryIconKey;
};

type CategoryShortcutsProps = {
	title: string;
	items: Item[];
	variant: "rail" | "grid";
};

const BLOCK_TYPE = "marketplaces.dve-palochki.category-shortcuts";

const CategoryShortcutsBlock = ({
	block,
}: {
	block: PhotonBlock<CategoryShortcutsProps>;
}) => {
	const { title, items, variant } = block.props;
	if (!items.length) return null;

	const Card = ({ it }: { it: Item }) => (
		<PhotonLink
			href={it.href}
			className="group flex shrink-0 snap-start flex-col items-center gap-2 rounded-lg border border-[var(--photon-site-border,#E5E5E5)] bg-[var(--photon-site-surface,#fff)] p-4 transition hover:border-[var(--mp-accent,#E32636)]"
		>
			<span className="inline-flex h-12 w-12 items-center justify-center text-[var(--mp-accent,#E32636)]">
				<MarketplaceCategoryIcon icon={it.icon} className="h-10 w-10" />
			</span>
			<span className="text-center text-sm font-medium text-[var(--photon-site-text,#0F0F0F)]">
				{it.label}
			</span>
		</PhotonLink>
	);

	return (
		<section className="mx-auto w-full max-w-7xl px-4 py-4">
			{title ? (
				<h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--photon-site-muted-text,#5C5C5C)]">
					{title}
				</h3>
			) : null}
			{variant === "grid" ? (
				<div className="grid grid-cols-3 gap-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-10">
					{items.map((it) => (
						<Card key={it.id} it={it} />
					))}
				</div>
			) : (
				<div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
					{items.map((it) => (
						<div key={it.id} className="w-32 shrink-0">
							<Card it={it} />
						</div>
					))}
				</div>
			)}
		</section>
	);
};

export const dvePalochkiCategoryShortcutsDefinition =
	definePhotonBlockDefinition<CategoryShortcutsProps>({
		type: BLOCK_TYPE,
		label: "Category Shortcuts (Dve Palochki)",
		description:
			"Iconified shortcut tiles to top-level catalog categories. Rail or grid layout.",
		category: "Marketplaces / Dve Palochki",
		icon: "grid-3x3",
		component: CategoryShortcutsBlock,
		defaults: {
			title: "",
			items: [],
			variant: "grid",
		},
		fields: [
			{ path: "title", label: "Section title", kind: "text", localization: "localized" },
			{
				path: "variant",
				label: "Variant",
				kind: "select",
				localization: "shared",
				options: [
					{ value: "rail", label: "Horizontal rail" },
					{ value: "grid", label: "Grid" },
				],
			},
			{
				path: "items",
				label: "Items",
				kind: "repeater",
				localization: "localized",
				itemLabelPath: "label",
				addLabel: "Add item",
				fields: [
					{ path: "label", label: "Label", kind: "text" },
					{ path: "href", label: "Href", kind: "url", localization: "shared" },
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
		],
	});
