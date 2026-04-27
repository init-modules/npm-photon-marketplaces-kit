"use client";

import {
	createPhotonLocalizedDefault,
	definePhotonBlockDefinition,
	type PhotonBlock,
} from "@init/photon/public";
import { Instagram } from "lucide-react";

type Tile = { id: string; imageUrl: string; href: string };

type Props = {
	handle: string;
	ctaLabel: string;
	tiles: Tile[];
};

const BLOCK_TYPE = "marketplaces.dve-palochki.instagram-strip";

const InstagramStripBlock = ({ block }: { block: PhotonBlock<Props> }) => {
	const { handle, ctaLabel, tiles } = block.props;
	if (!tiles.length) return null;

	const middle = (
		<a
			href={`https://instagram.com/${handle.replace(/^@/, "")}`}
			target="_blank"
			rel="noreferrer"
			className="flex aspect-square w-full flex-col items-center justify-center rounded-md border border-[var(--photon-site-border,#E5E5E5)] bg-[var(--photon-site-surface,#fff)] p-4 transition hover:border-[var(--mp-accent,#E32636)]"
		>
			<Instagram className="h-10 w-10 text-[var(--photon-site-text,#0F0F0F)]" />
			<span className="mt-2 text-sm font-medium">{handle}</span>
			<span className="mt-2 inline-flex rounded-md border border-[var(--mp-accent,#E32636)] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--mp-accent,#E32636)]">
				{ctaLabel}
			</span>
		</a>
	);

	return (
		<section className="mx-auto w-full max-w-7xl px-4 py-8">
			<div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
				{tiles.slice(0, 2).map((t) => (
					<a key={t.id} href={t.href} target="_blank" rel="noreferrer">
						<img
							src={t.imageUrl}
							alt=""
							className="aspect-square w-full rounded-md object-cover"
						/>
					</a>
				))}
				{middle}
				{tiles.slice(2, 4).map((t) => (
					<a key={t.id} href={t.href} target="_blank" rel="noreferrer">
						<img
							src={t.imageUrl}
							alt=""
							className="aspect-square w-full rounded-md object-cover"
						/>
					</a>
				))}
			</div>
		</section>
	);
};

export const dvePalochkiInstagramStripDefinition =
	definePhotonBlockDefinition<Props>({
		type: BLOCK_TYPE,
		label: "Instagram Strip (Dve Palochki)",
		description:
			"4 Instagram tiles with a centered CTA card linking to the brand profile.",
		category: "Marketplaces / Dve Palochki",
		icon: "instagram",
		component: InstagramStripBlock,
		defaults: {
			handle: "@dve_palochki.kz",
			ctaLabel: createPhotonLocalizedDefault({
				ru: "Подписаться",
				en: "Follow",
			}),
			tiles: [],
		},
		fields: [
			{ path: "handle", label: "Instagram handle", kind: "text", localization: "shared" },
			{ path: "ctaLabel", label: "CTA label", kind: "text", localization: "localized" },
			{
				path: "tiles",
				label: "Tiles",
				kind: "repeater",
				localization: "shared",
				itemLabelPath: "imageUrl",
				addLabel: "Add tile",
				fields: [
					{ path: "imageUrl", label: "Image URL", kind: "image" },
					{ path: "href", label: "Href", kind: "url" },
				],
			},
		],
	});
