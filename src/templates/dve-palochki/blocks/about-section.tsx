"use client";

import {
	createPhotonLocalizedDefault,
	definePhotonBlockDefinition,
	type PhotonBlock,
} from "@init/photon/public";

type Props = {
	title: string;
	body: string;
	gallery: { id: string; imageUrl: string; alt: string }[];
	highlightTitle: string;
	highlightBody: string;
	highlightImageUrl: string;
};

const BLOCK_TYPE = "marketplaces.dve-palochki.about-section";

const AboutSectionBlock = ({ block }: { block: PhotonBlock<Props> }) => {
	const p = block.props;
	return (
		<>
			<section className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 md:grid-cols-2">
				<div className="space-y-4">
					<h2 className="text-2xl font-semibold">{p.title}</h2>
					<p className="text-sm leading-relaxed text-[var(--photon-site-muted-text,#5C5C5C)]">
						{p.body}
					</p>
				</div>
				<div className="grid grid-cols-2 gap-3">
					{p.gallery.map((g) => (
						<img
							key={g.id}
							src={g.imageUrl}
							alt={g.alt}
							className="aspect-square w-full rounded-md object-cover"
						/>
					))}
				</div>
			</section>
			{p.highlightTitle ? (
				<section className="mx-auto grid w-full max-w-7xl gap-6 px-4 pb-12 md:grid-cols-[1fr_1fr] md:items-center">
					{p.highlightImageUrl ? (
						<img
							src={p.highlightImageUrl}
							alt={p.highlightTitle}
							className="aspect-video w-full rounded-md object-cover"
						/>
					) : (
						<div className="aspect-video w-full rounded-md bg-[var(--photon-site-surface-muted,#F4F4F5)]" />
					)}
					<div>
						<h3 className="text-xl font-semibold">{p.highlightTitle}</h3>
						<p className="mt-2 text-sm leading-relaxed text-[var(--photon-site-muted-text,#5C5C5C)]">
							{p.highlightBody}
						</p>
					</div>
				</section>
			) : null}
		</>
	);
};

export const dvePalochkiAboutSectionDefinition =
	definePhotonBlockDefinition<Props>({
		type: BLOCK_TYPE,
		label: "About Section (Dve Palochki)",
		description:
			"About-page hero with copy + gallery and an optional highlight band underneath.",
		category: "Marketplaces / Dve Palochki",
		icon: "info",
		component: AboutSectionBlock,
		defaults: {
			title: "",
			body: "",
			gallery: [],
			highlightTitle: "",
			highlightBody: "",
			highlightImageUrl: "",
		},
		fields: [
			{ path: "title", label: "Title", kind: "text", localization: "localized" },
			{ path: "body", label: "Body", kind: "textarea", localization: "localized" },
			{
				path: "gallery",
				label: "Gallery",
				kind: "repeater",
				localization: "localized",
				itemLabelPath: "alt",
				addLabel: "Add image",
				fields: [
					{
						path: "imageUrl",
						label: "Image URL",
						kind: "image",
						localization: "shared",
					},
					{ path: "alt", label: "Alt text", kind: "text" },
				],
			},
			{
				path: "highlightTitle",
				label: "Highlight title",
				kind: "text",
				localization: "localized",
			},
			{
				path: "highlightBody",
				label: "Highlight body",
				kind: "textarea",
				localization: "localized",
			},
			{
				path: "highlightImageUrl",
				label: "Highlight image",
				kind: "image",
				localization: "shared",
			},
		],
	});
