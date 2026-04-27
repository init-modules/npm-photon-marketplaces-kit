import type { ReactElement, SVGProps } from "react";
import type { MarketplaceCategoryIconKey } from "../../templates/shared";

const Base = (
	props: SVGProps<SVGSVGElement> & { children: React.ReactNode },
) => {
	const { children, ...rest } = props;
	return (
		<svg
			viewBox="0 0 32 32"
			fill="none"
			stroke="currentColor"
			strokeWidth={1.6}
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			focusable="false"
			{...rest}
		>
			{children}
		</svg>
	);
};

const SupplementsIcon = (p: SVGProps<SVGSVGElement>) => (
	<Base {...p}>
		<path d="M11 8h6l-1 4h-4z" />
		<path d="M9 12h10v14H9z" />
		<path d="M13 16h2M13 19h2M13 22h2" />
	</Base>
);

const RollsIcon = (p: SVGProps<SVGSVGElement>) => (
	<Base {...p}>
		<rect x="4" y="11" width="6" height="10" rx="3" />
		<rect x="13" y="11" width="6" height="10" rx="3" />
		<rect x="22" y="11" width="6" height="10" rx="3" />
		<circle cx="7" cy="16" r="1.4" />
		<circle cx="16" cy="16" r="1.4" />
		<circle cx="25" cy="16" r="1.4" />
	</Base>
);

const PizzaIcon = (p: SVGProps<SVGSVGElement>) => (
	<Base {...p}>
		<path d="M16 5l11 19H5z" />
		<circle cx="13" cy="17" r="1.2" />
		<circle cx="19" cy="17" r="1.2" />
		<circle cx="16" cy="21" r="1.2" />
	</Base>
);

const SetsIcon = (p: SVGProps<SVGSVGElement>) => (
	<Base {...p}>
		<rect x="4" y="6" width="24" height="20" rx="3" />
		<path d="M4 12h24M4 18h24M14 6v20M22 6v20" />
	</Base>
);

const FriedRollsIcon = (p: SVGProps<SVGSVGElement>) => (
	<Base {...p}>
		<rect x="5" y="10" width="22" height="12" rx="6" />
		<path d="M9 14l1.4-1.4M14 14l1.4-1.4M19 14l1.4-1.4M24 14l1.4-1.4" />
	</Base>
);

const GunkansIcon = (p: SVGProps<SVGSVGElement>) => (
	<Base {...p}>
		<rect x="5" y="14" width="22" height="9" rx="2" />
		<path d="M5 14h22M9 14V9q3-2 7-2t7 2v5" />
	</Base>
);

const DrinksIcon = (p: SVGProps<SVGSVGElement>) => (
	<Base {...p}>
		<path d="M10 6h12l-1 20H11z" />
		<path d="M10 11h12" />
		<path d="M14 6V4M18 6V4" />
	</Base>
);

const NigiriIcon = (p: SVGProps<SVGSVGElement>) => (
	<Base {...p}>
		<rect x="4" y="14" width="24" height="6" rx="3" />
		<path d="M9 14q3-4 7-4t7 4" />
	</Base>
);

const SnacksIcon = (p: SVGProps<SVGSVGElement>) => (
	<Base {...p}>
		<path d="M6 26l4-15h12l4 15z" />
		<path d="M6 26h20" />
	</Base>
);

const BakedRollsIcon = (p: SVGProps<SVGSVGElement>) => (
	<Base {...p}>
		<rect x="6" y="10" width="20" height="12" rx="6" />
		<path d="M11 14q1-2 2 0t2 0t2 0t2 0t2 0" />
	</Base>
);

const NoodlesIcon = (p: SVGProps<SVGSVGElement>) => (
	<Base {...p}>
		<path d="M5 10c4 4 6 4 11 4s7 0 11-4" />
		<path d="M5 16c4 4 6 4 11 4s7 0 11-4" />
		<path d="M5 22c4 4 6 4 11 4s7 0 11-4" />
	</Base>
);

const SoupIcon = (p: SVGProps<SVGSVGElement>) => (
	<Base {...p}>
		<path d="M5 14h22l-2 11H7z" />
		<path d="M11 11q1-3 2 0M16 11q1-3 2 0M21 11q1-3 2 0" />
	</Base>
);

const SaladIcon = (p: SVGProps<SVGSVGElement>) => (
	<Base {...p}>
		<path d="M4 14h24l-2 11H6z" />
		<path d="M9 14q1-4 5-4M15 14q1-4 5-4M21 14q1-4 5-4" />
	</Base>
);

const DessertIcon = (p: SVGProps<SVGSVGElement>) => (
	<Base {...p}>
		<path d="M9 16l3-7h8l3 7z" />
		<path d="M7 16h18l-2 10H9z" />
	</Base>
);

const ICONS: Record<
	MarketplaceCategoryIconKey,
	(p: SVGProps<SVGSVGElement>) => JSX.Element
> = {
	supplements: SupplementsIcon,
	rolls: RollsIcon,
	pizza: PizzaIcon,
	sets: SetsIcon,
	"fried-rolls": FriedRollsIcon,
	gunkans: GunkansIcon,
	drinks: DrinksIcon,
	nigiri: NigiriIcon,
	snacks: SnacksIcon,
	"baked-rolls": BakedRollsIcon,
	noodles: NoodlesIcon,
	soup: SoupIcon,
	salad: SaladIcon,
	dessert: DessertIcon,
};

export function MarketplaceCategoryIcon({
	icon,
	className,
}: {
	icon: MarketplaceCategoryIconKey;
	className?: string;
}) {
	const Cmp = ICONS[icon];
	if (!Cmp) return null;
	return <Cmp className={className} />;
}
