"use client";

import {
	createPhotonLocalizedDefault,
	definePhotonBlockDefinition,
	PhotonLink,
	type PhotonBlock,
} from "@init/photon/public";
import { ScrollSnapRail } from "../../../shared/primitives/scroll-snap-rail";

type Slide = {
	id: string;
	imageUrl?: string;
	videoUrl?: string;
	title?: string;
	subtitle?: string;
	href?: string;
	ctaLabel?: string;
	overlay: "none" | "soft" | "strong";
};

type HeroSliderProps = {
	slides: Slide[];
	autoplayMs: number;
	height: "sm" | "md" | "lg";
};

const HERO_SLIDER_BLOCK_TYPE = "marketplaces.dve-palochki.hero-slider";

const heightClass: Record<HeroSliderProps["height"], string> = {
	sm: "h-[280px] md:h-[360px]",
	md: "h-[360px] md:h-[480px]",
	lg: "h-[420px] md:h-[600px]",
};

const overlayClass: Record<Slide["overlay"], string> = {
	none: "",
	soft: "bg-gradient-to-t from-black/55 to-transparent",
	strong: "bg-black/55",
};

const HeroSliderBlock = ({ block }: { block: PhotonBlock<HeroSliderProps> }) => {
	const { slides, autoplayMs, height } = block.props;
	if (!slides.length) return null;

	const Slide = ({ slide }: { slide: Slide }) => {
		const content = (
			<div
				className={[
					"relative shrink-0 snap-start basis-full overflow-hidden rounded-lg bg-[color:rgba(0,0,0,0.04)]",
					heightClass[height],
				].join(" ")}
			>
				{slide.videoUrl ? (
					<video
						src={slide.videoUrl}
						autoPlay
						muted
						loop
						playsInline
						className="absolute inset-0 h-full w-full object-cover"
					/>
				) : slide.imageUrl ? (
					<img
						src={slide.imageUrl}
						alt={slide.title ?? ""}
						className="absolute inset-0 h-full w-full object-cover"
					/>
				) : null}
				{slide.overlay !== "none" ? (
					<div
						className={`absolute inset-0 ${overlayClass[slide.overlay]}`}
						aria-hidden
					/>
				) : null}
				{slide.title || slide.subtitle ? (
					<div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-6">
						{slide.title ? (
							<h2 className="text-lg font-bold sm:text-2xl">{slide.title}</h2>
						) : null}
						{slide.subtitle ? (
							<p className="mt-1 max-w-md text-sm sm:text-base">{slide.subtitle}</p>
						) : null}
						{slide.ctaLabel && slide.href ? (
							<span className="mt-3 inline-flex items-center gap-2 rounded-md bg-[var(--mp-accent,#E32636)] px-3 py-1.5 text-xs font-semibold uppercase tracking-wide">
								{slide.ctaLabel}
							</span>
						) : null}
					</div>
				) : null}
			</div>
		);
		return slide.href ? (
			<PhotonLink href={slide.href} className="block w-full shrink-0 basis-full">
				{content}
			</PhotonLink>
		) : (
			content
		);
	};

	return (
		<section className="mx-auto w-full max-w-7xl px-4 py-4">
			<ScrollSnapRail
				autoplayMs={autoplayMs}
				showPager
				loop
				aria-label="Hero slider"
			>
				{slides.map((s) => (
					<Slide key={s.id} slide={s} />
				))}
			</ScrollSnapRail>
		</section>
	);
};

export const dvePalochkiHeroSliderDefinition =
	definePhotonBlockDefinition<HeroSliderProps>({
		type: HERO_SLIDER_BLOCK_TYPE,
		label: "Hero Slider (Dve Palochki)",
		description:
			"Auto-advancing hero slider with image/video slides, CSS scroll-snap (no carousel deps).",
		category: "Marketplaces / Dve Palochki",
		icon: "image-play",
		component: HeroSliderBlock,
		defaults: {
			slides: [
				{
					id: "slide-1",
					imageUrl: "/marketplaces/dve-palochki/hero-halal.jpg",
					title: createPhotonLocalizedDefault({ ru: "HALAL", en: "HALAL" }),
					subtitle: createPhotonLocalizedDefault({
						ru: "Вся еда соответствует халяльным стандартам",
						en: "All food is halal",
					}),
					overlay: "soft",
				},
			],
			autoplayMs: 5000,
			height: "lg",
		},
		fields: [
			{
				path: "slides",
				label: "Slides",
				kind: "repeater",
				group: "content",
				localization: "localized",
				itemLabelPath: "title",
				addLabel: "Add slide",
				fields: [
					{ path: "imageUrl", label: "Image URL", kind: "image", localization: "shared" },
					{ path: "videoUrl", label: "Video URL", kind: "url", localization: "shared" },
					{ path: "title", label: "Title", kind: "text" },
					{ path: "subtitle", label: "Subtitle", kind: "textarea" },
					{ path: "ctaLabel", label: "CTA label", kind: "text" },
					{ path: "href", label: "Slide href", kind: "url", localization: "shared" },
					{
						path: "overlay",
						label: "Overlay",
						kind: "select",
						localization: "shared",
						options: [
							{ value: "none", label: "None" },
							{ value: "soft", label: "Soft" },
							{ value: "strong", label: "Strong" },
						],
					},
				],
			},
			{
				path: "autoplayMs",
				label: "Autoplay (ms, 0 = off)",
				kind: "number",
				group: "layout",
				localization: "shared",
			},
			{
				path: "height",
				label: "Height",
				kind: "select",
				group: "layout",
				localization: "shared",
				options: [
					{ value: "sm", label: "Small" },
					{ value: "md", label: "Medium" },
					{ value: "lg", label: "Large" },
				],
			},
		],
	});
