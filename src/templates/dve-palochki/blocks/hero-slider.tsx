"use client";

import {
	definePhotonBlockDefinition,
	PhotonLink,
	type PhotonBlock,
} from "@init/photon/public";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

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
	sm: "h-[280px] md:h-[420px]",
	md: "h-[360px] md:h-[540px]",
	lg: "h-[420px] md:h-[640px]",
};

const overlayClass: Record<Slide["overlay"], string> = {
	none: "",
	soft: "bg-gradient-to-t from-black/55 to-transparent",
	strong: "bg-black/55",
};

const isBareSlide = (slide: Slide): boolean =>
	!slide.title && !slide.subtitle && !slide.ctaLabel;

const SlideMedia = ({ slide }: { slide: Slide }) => {
	if (slide.videoUrl) {
		return (
			<video
				src={slide.videoUrl}
				autoPlay
				muted
				loop
				playsInline
				className="absolute inset-0 h-full w-full object-cover"
			/>
		);
	}
	if (slide.imageUrl) {
		return (
			<img
				src={slide.imageUrl}
				alt={slide.title ?? ""}
				className="absolute inset-0 h-full w-full object-cover"
			/>
		);
	}
	return null;
};

const SlideContent = ({
	slide,
	height,
}: {
	slide: Slide;
	height: HeroSliderProps["height"];
}) => {
	const bare = isBareSlide(slide);
	const inner = (
		<div
			className={[
				"relative h-full w-full overflow-hidden rounded-lg bg-[color:rgba(0,0,0,0.04)]",
				heightClass[height],
			].join(" ")}
		>
			<SlideMedia slide={slide} />
			{!bare && slide.overlay !== "none" ? (
				<div
					className={`absolute inset-0 ${overlayClass[slide.overlay]}`}
					aria-hidden
				/>
			) : null}
			{!bare ? (
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
		<PhotonLink href={slide.href} className="block h-full w-full">
			{inner}
		</PhotonLink>
	) : (
		inner
	);
};

const HeroSliderBlock = ({ block }: { block: PhotonBlock<HeroSliderProps> }) => {
	const { slides, autoplayMs, height } = block.props;

	const [index, setIndex] = useState(0);
	const [isHovered, setIsHovered] = useState(false);
	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

	const slideCount = slides.length;
	const loop = slideCount > 1;

	const goTo = useCallback(
		(next: number) => {
			setIndex(((next % slideCount) + slideCount) % slideCount);
		},
		[slideCount],
	);

	const goNext = useCallback(() => {
		goTo(index + 1);
	}, [goTo, index]);

	const goPrev = useCallback(() => {
		goTo(index - 1);
	}, [goTo, index]);

	const clearAutoplay = useCallback(() => {
		if (intervalRef.current !== null) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
	}, []);

	// Autoplay: advance every autoplayMs ms when enabled, paused on hover.
	useEffect(() => {
		clearAutoplay();
		if (autoplayMs > 0 && loop && !isHovered) {
			intervalRef.current = setInterval(() => {
				setIndex((current) => (current + 1) % slideCount);
			}, autoplayMs);
		}
		return clearAutoplay;
	}, [autoplayMs, loop, isHovered, slideCount, clearAutoplay, index]);

	const handlePrev = useCallback(() => {
		goPrev();
	}, [goPrev]);

	const handleNext = useCallback(() => {
		goNext();
	}, [goNext]);

	const handleDotClick = useCallback(
		(target: number) => {
			goTo(target);
		},
		[goTo],
	);

	if (slideCount === 0) return null;

	return (
		<section className="mx-auto w-full max-w-7xl px-4 py-4">
			<div
				className={[
					"relative overflow-hidden rounded-lg",
					heightClass[height],
				].join(" ")}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				aria-roledescription="carousel"
				aria-label="Hero slider"
			>
				<div
					className="flex h-full w-full transition-transform duration-500 ease-out"
					style={{ transform: `translateX(-${index * 100}%)` }}
				>
					{slides.map((slide) => (
						<div key={slide.id} className="relative h-full w-full shrink-0 basis-full">
							<SlideContent slide={slide} height={height} />
						</div>
					))}
				</div>

				{loop ? (
					<>
						<button
							type="button"
							onClick={handlePrev}
							aria-label="Previous slide"
							className="absolute left-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-black shadow-md transition hover:bg-white md:flex"
						>
							<ChevronLeft className="h-5 w-5" aria-hidden />
						</button>
						<button
							type="button"
							onClick={handleNext}
							aria-label="Next slide"
							className="absolute right-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-black shadow-md transition hover:bg-white md:flex"
						>
							<ChevronRight className="h-5 w-5" aria-hidden />
						</button>

						<div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-2">
							{slides.map((slide, i) => {
								const active = i === index;
								return (
									<button
										key={slide.id}
										type="button"
										onClick={() => handleDotClick(i)}
										aria-label={`Go to slide ${i + 1}`}
										aria-current={active ? "true" : undefined}
										className={[
											"h-2 w-2 rounded-full transition",
											active
												? "bg-[var(--photon-site-accent,#E32636)]"
												: "bg-white/50 hover:bg-white/80",
										].join(" ")}
									/>
								);
							})}
						</div>
					</>
				) : null}
			</div>
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
			slides: [],
			autoplayMs: 0,
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
