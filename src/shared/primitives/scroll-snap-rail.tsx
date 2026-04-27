"use client";

import {
	type CSSProperties,
	type ReactNode,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";

export type ScrollSnapRailProps = {
	children: ReactNode;
	/**
	 * Auto-advance interval in ms. `0` (default) disables autoplay.
	 * Pauses on hover and on document `visibilitychange === hidden`.
	 */
	autoplayMs?: number;
	/**
	 * Whether to render the dot pager. Pager dots are derived from
	 * the count of immediate children of the rail.
	 */
	showPager?: boolean;
	/**
	 * Snap padding/inline padding for the inner rail. Use to
	 * offset the rail so partial slides peek on either side.
	 */
	railClassName?: string;
	className?: string;
	style?: CSSProperties;
	/**
	 * Whether to loop. When false, autoplay stops at the last slide.
	 */
	loop?: boolean;
	"aria-label"?: string;
};

/**
 * CSS-snap horizontal rail with dot pager and optional autoplay.
 * Intentionally has no carousel dependency — `scroll-snap-type` plus
 * an `IntersectionObserver` driven pager replaces swiper/embla in
 * the marketplaces kit. See `THATS_THE_WAY_IT_SHOULD_BE.md` decision
 * "Carousels".
 */
export function ScrollSnapRail({
	children,
	autoplayMs = 0,
	showPager = true,
	railClassName,
	className,
	style,
	loop = true,
	"aria-label": ariaLabel,
}: ScrollSnapRailProps) {
	const railRef = useRef<HTMLDivElement | null>(null);
	const slideRefs = useRef<Array<HTMLElement | null>>([]);
	const [activeIndex, setActiveIndex] = useState(0);
	const [hovered, setHovered] = useState(false);
	const [count, setCount] = useState(0);

	const collectSlides = useCallback(() => {
		const rail = railRef.current;
		if (!rail) {
			slideRefs.current = [];
			setCount(0);
			return;
		}
		const slides = Array.from(rail.children).filter(
			(node): node is HTMLElement => node instanceof HTMLElement,
		);
		slideRefs.current = slides;
		setCount(slides.length);
	}, []);

	useEffect(() => {
		collectSlides();
	}, [collectSlides, children]);

	useEffect(() => {
		const rail = railRef.current;
		if (!rail || slideRefs.current.length === 0) return;
		const observer = new IntersectionObserver(
			(entries) => {
				let bestIndex = activeIndex;
				let bestRatio = 0;
				for (const entry of entries) {
					const idx = slideRefs.current.indexOf(entry.target as HTMLElement);
					if (idx === -1) continue;
					if (entry.intersectionRatio > bestRatio) {
						bestRatio = entry.intersectionRatio;
						bestIndex = idx;
					}
				}
				if (bestRatio > 0) {
					setActiveIndex(bestIndex);
				}
			},
			{ root: rail, threshold: [0.25, 0.5, 0.75, 1] },
		);
		for (const el of slideRefs.current) {
			if (el) observer.observe(el);
		}
		return () => observer.disconnect();
	}, [count, activeIndex]);

	const goTo = useCallback((idx: number) => {
		const target = slideRefs.current[idx];
		const rail = railRef.current;
		if (!target || !rail) return;
		rail.scrollTo({
			left: target.offsetLeft - rail.offsetLeft,
			behavior: "smooth",
		});
	}, []);

	useEffect(() => {
		if (autoplayMs <= 0) return;
		if (hovered) return;
		if (count <= 1) return;
		let timer: ReturnType<typeof setInterval> | null = null;
		const tick = () => {
			const next = activeIndex + 1;
			if (next >= count) {
				if (loop) goTo(0);
				return;
			}
			goTo(next);
		};
		const onVisibility = () => {
			if (document.hidden) {
				if (timer) clearInterval(timer);
				timer = null;
			} else if (!timer) {
				timer = setInterval(tick, autoplayMs);
			}
		};
		timer = setInterval(tick, autoplayMs);
		document.addEventListener("visibilitychange", onVisibility);
		return () => {
			if (timer) clearInterval(timer);
			document.removeEventListener("visibilitychange", onVisibility);
		};
	}, [autoplayMs, hovered, count, activeIndex, goTo, loop]);

	return (
		<div
			className={className}
			style={style}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			aria-label={ariaLabel}
			aria-roledescription="carousel"
		>
			<div
				ref={railRef}
				className={
					railClassName ??
					"flex snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden gap-3"
				}
				style={{ scrollSnapType: "x mandatory" }}
			>
				{children}
			</div>
			{showPager && count > 1 ? (
				<div className="mt-3 flex items-center justify-center gap-1.5">
					{Array.from({ length: count }, (_, i) => i).map((i) => (
						<button
							key={i}
							type="button"
							aria-label={`Go to slide ${i + 1}`}
							aria-current={i === activeIndex}
							onClick={() => goTo(i)}
							className={[
								"h-1.5 w-6 rounded-full transition-all",
								i === activeIndex
									? "bg-[var(--mp-accent,#E32636)]"
									: "bg-[color:rgba(0,0,0,0.18)] hover:bg-[color:rgba(0,0,0,0.32)]",
							].join(" ")}
						/>
					))}
				</div>
			) : null}
		</div>
	);
}
