"use client";

import {
	createPhotonLocalizedDefault,
	definePhotonBlockDefinition,
	type PhotonBlock,
} from "@init/photon/public";

/**
 * Wrapper around `commerce-product-grid` (rendered as a separate
 * block in the page document) plus a section heading. The block
 * itself contains only presentation chrome — the live product list
 * is rendered by the commerce-photon block placed by the family
 * factory immediately after this header.
 */
type RecommendedStripProps = {
	eyebrow: string;
	title: string;
	description: string;
};

const BLOCK_TYPE = "marketplaces.dve-palochki.recommended-strip";

const RecommendedStripBlock = ({
	block,
}: {
	block: PhotonBlock<RecommendedStripProps>;
}) => {
	const { eyebrow, title, description } = block.props;
	if (!eyebrow && !title && !description) return null;

	return (
		<section className="mx-auto w-full max-w-7xl px-4 pt-8 pb-2">
			<div className="flex flex-col gap-1">
				{eyebrow ? (
					<span className="text-xs font-semibold uppercase tracking-wide text-[var(--mp-accent,#E32636)]">
						{eyebrow}
					</span>
				) : null}
				{title ? (
					<h2 className="text-xl font-semibold text-[var(--photon-site-text,#0F0F0F)] sm:text-2xl">
						{title}
					</h2>
				) : null}
				{description ? (
					<p className="max-w-2xl text-sm text-[var(--photon-site-muted-text,#5C5C5C)]">
						{description}
					</p>
				) : null}
			</div>
		</section>
	);
};

export const dvePalochkiRecommendedStripDefinition =
	definePhotonBlockDefinition<RecommendedStripProps>({
		type: BLOCK_TYPE,
		label: "Recommended Strip Heading (Dve Palochki)",
		description:
			"Eyebrow + title + description for a horizontal product rail. Render commerce-product-grid right after this block.",
		category: "Marketplaces / Dve Palochki",
		icon: "rows-3",
		component: RecommendedStripBlock,
		defaults: {
			eyebrow: createPhotonLocalizedDefault({ ru: "Каталог", en: "Catalog" }),
			title: createPhotonLocalizedDefault({
				ru: "Лучшие предложения",
				en: "Best offers",
			}),
			description: "",
		},
		fields: [
			{ path: "eyebrow", label: "Eyebrow", kind: "text", localization: "localized" },
			{ path: "title", label: "Title", kind: "text", localization: "localized" },
			{
				path: "description",
				label: "Description",
				kind: "textarea",
				localization: "localized",
			},
		],
	});
