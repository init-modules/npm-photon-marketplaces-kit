"use client";

import {
	definePhotonBlockDefinition,
	PhotonLink,
	type PhotonBlock,
} from "@init/photon/public";
import { LayoutGrid, ShoppingCart, User } from "lucide-react";

type Item = {
	id: string;
	label: string;
	href: string;
	icon: "menu" | "cart" | "account";
};

type MobileBottomBarProps = {
	items: Item[];
};

const ICONS = {
	menu: LayoutGrid,
	cart: ShoppingCart,
	account: User,
} as const;

const MOBILE_BOTTOM_BAR_BLOCK_TYPE = "marketplaces.dve-palochki.mobile-bottom-bar";

const MobileBottomBarBlock = ({
	block,
}: {
	block: PhotonBlock<MobileBottomBarProps>;
}) => {
	const items = block.props.items;

	if (!items.length) return null;

	return (
		<div
			data-marketplace-mobile-bottom-bar
			className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--photon-site-border,#E5E5E5)] bg-[var(--photon-site-surface,#fff)] md:hidden"
		>
			<nav className="mx-auto flex max-w-md items-stretch justify-around">
				{items.map((it) => {
					const Icon = ICONS[it.icon] ?? LayoutGrid;
					return (
						<PhotonLink
							key={it.id}
							href={it.href}
							className="flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-[11px] font-medium text-[var(--photon-site-text,#0F0F0F)] hover:text-[var(--mp-accent,#E32636)]"
						>
							<Icon className="h-5 w-5" />
							<span>{it.label}</span>
						</PhotonLink>
					);
				})}
			</nav>
		</div>
	);
};

export const dvePalochkiMobileBottomBarDefinition =
	definePhotonBlockDefinition<MobileBottomBarProps>({
		type: MOBILE_BOTTOM_BAR_BLOCK_TYPE,
		label: "Mobile Bottom Bar (Dve Palochki)",
		description:
			"Fixed mobile bottom navigation with Catalog, Cart, Account shortcuts. Hidden on desktop.",
		category: "Marketplaces / Dve Palochki",
		icon: "panel-bottom-dashed",
		component: MobileBottomBarBlock,
		defaults: {
			items: [],
		},
		fields: [
			{
				path: "items",
				label: "Bottom bar items",
				kind: "repeater",
				group: "content",
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
							{ value: "menu", label: "Menu" },
							{ value: "cart", label: "Cart" },
							{ value: "account", label: "Account" },
						],
					},
				],
			},
		],
	});
