"use client";

import {
	definePhotonBlockDefinition,
	footerLegalSlot,
	PhotonLink,
	type PhotonBlock,
	usePhotonResolvedSlot,
} from "@init/photon/public";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

type FooterLink = { id: string; label: string; href: string };

/**
 * Legal links come from contributions registered into `footer.legal`
 * (e.g. marketplace.footer.privacy from `photon-marketplaces-kit`).
 * Override per-profile via the `contribution-list` inspector field.
 */
type FooterProps = {
	brandLabel: string;
	brandDescription: string;
	logoUrl: string;
	ctaLabel: string;
	ctaHref: string;
	categoriesTitle: string;
	categories: FooterLink[];
	contactsTitle: string;
	phones: { id: string; phone: string }[];
	address: string;
	cta: { label: string; href: string } | null;
	copyright: string;
	credit: string;
	creditHref: string;
	creditLogoUrl: string;
	creditLogoAlt: string;
};

const pickLocalized = (
	value: Record<string, string> | undefined,
	fallback: string,
): string => {
	if (!value) return fallback;
	return value.en ?? value.ru ?? Object.values(value)[0] ?? fallback;
};

const FOOTER_BLOCK_TYPE = "marketplaces.dve-palochki.footer";

const FooterBlock = ({ block }: { block: PhotonBlock<FooterProps> }) => {
	const p = block.props;
	const resolvedLegal = usePhotonResolvedSlot(footerLegalSlot);

	return (
		<footer className="bg-[var(--mp-footer-bg,#0A0A0A)] text-[var(--mp-footer-fg,#A1A1A1)]">
			<div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
				<div className="space-y-4">
					{p.logoUrl ? (
						<img
							src={p.logoUrl}
							alt={p.brandLabel}
							className="h-14 w-auto"
						/>
					) : null}
					<p className="max-w-md text-sm leading-relaxed">{p.brandDescription}</p>
					{p.ctaLabel && p.ctaHref ? (
						<PhotonLink
							href={p.ctaHref}
							className="inline-flex items-center justify-center rounded-full border px-4 py-2 text-sm hover:bg-white hover:text-[var(--mp-footer-bg)]"
						>
							{p.ctaLabel}
						</PhotonLink>
					) : null}
				</div>

				<div className="md:col-span-2">
					<h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--mp-footer-heading,#fff)]">
						{p.categoriesTitle}
					</h4>
					<ul className="grid grid-cols-2 gap-y-3 gap-x-6 text-sm">
						{p.categories.slice(0, 12).map((c) => (
							<li key={c.id}>
								<PhotonLink
									href={c.href}
									className="hover:text-[var(--mp-accent,#E32636)]"
								>
									{c.label}
								</PhotonLink>
							</li>
						))}
					</ul>
				</div>

				<div>
					<h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--mp-footer-heading,#fff)]">
						{p.contactsTitle}
					</h4>
					<ul className="space-y-2 text-sm">
						{p.phones.map((ph) => (
							<li key={ph.id}>
								<a
									href={`tel:${ph.phone.replace(/[^+\d]/g, "")}`}
									className="flex items-center gap-2 hover:text-[var(--mp-accent,#E32636)]"
								>
									<Phone className="h-4 w-4 shrink-0" />
									<span>{ph.phone}</span>
								</a>
							</li>
						))}
						{p.address ? (
							<li className="flex items-start gap-2 pt-2 text-[color:rgba(255,255,255,0.7)]">
								<MapPin className="mt-0.5 h-4 w-4 shrink-0" />
								<span>{p.address}</span>
							</li>
						) : null}
					</ul>
				</div>
			</div>

			<div className="border-t border-[color:rgba(255,255,255,0.08)]">
				<div className="mx-auto flex max-w-7xl flex-col items-start gap-3 px-4 py-5 text-xs sm:flex-row sm:items-center sm:justify-between">
					<div>
						<div className="text-[color:rgba(255,255,255,0.85)]">{p.copyright}</div>
						<ul className="mt-1 flex flex-wrap gap-3 text-[color:rgba(255,255,255,0.6)]">
							{resolvedLegal.map(({ resolved: r }) => (
								<li key={r.contributionId}>
									<PhotonLink
										href={r.href ?? "#"}
										className="hover:text-[var(--mp-accent,#E32636)]"
									>
										{pickLocalized(r.label, r.contributionId)}
									</PhotonLink>
								</li>
							))}
						</ul>
					</div>
					<a
						href={p.creditHref}
						className="inline-flex items-center gap-2 text-[color:rgba(255,255,255,0.6)] hover:text-white"
						target="_blank"
						rel="noreferrer"
					>
						{p.creditLogoUrl ? (
							<img
								src={p.creditLogoUrl}
								alt={p.creditLogoAlt}
								className="h-5 w-auto opacity-60"
							/>
						) : null}
						<span>{p.credit}</span>
					</a>
				</div>
			</div>
		</footer>
	);
};

export const dvePalochkiFooterDefinition = definePhotonBlockDefinition<FooterProps>(
	{
		type: FOOTER_BLOCK_TYPE,
		label: "Marketplace Footer (Dve Palochki)",
		description:
			"Dve Palochki dark footer with brand block, two category columns, contacts and legal row.",
		category: "Marketplaces / Dve Palochki",
		icon: "panel-bottom",
		component: FooterBlock,
		defaults: {
			brandLabel: "",
			brandDescription: "",
			logoUrl: "",
			ctaLabel: "",
			ctaHref: "",
			categoriesTitle: "",
			categories: [],
			contactsTitle: "",
			phones: [],
			address: "",
			cta: null,
			copyright: "",
			credit: "",
			creditHref: "",
			creditLogoUrl: "",
			creditLogoAlt: "",
		},
		fields: [
			{
				path: "brandDescription",
				label: "Brand description",
				kind: "textarea",
				group: "content",
				localization: "localized",
			},
			{
				path: "ctaLabel",
				label: "CTA label",
				kind: "text",
				group: "content",
				localization: "localized",
			},
			{
				path: "ctaHref",
				label: "CTA href",
				kind: "url",
				group: "content",
				localization: "shared",
			},
			{
				path: "categories",
				label: "Categories",
				kind: "repeater",
				group: "content",
				localization: "localized",
				itemLabelPath: "label",
				addLabel: "Add category",
				fields: [
					{ path: "label", label: "Label", kind: "text" },
					{ path: "href", label: "Href", kind: "url", localization: "shared" },
				],
			},
			{
				path: "phones",
				label: "Phones",
				kind: "repeater",
				group: "content",
				localization: "shared",
				itemLabelPath: "phone",
				addLabel: "Add phone",
				fields: [{ path: "phone", label: "Phone", kind: "text" }],
			},
			{
				path: "address",
				label: "Address",
				kind: "textarea",
				group: "content",
				localization: "localized",
			},
			{
				path: "__legal_contributions",
				label: "Legal links",
				kind: "contribution-list",
				slotId: "footer.legal",
				group: "content",
			},
			{
				path: "copyright",
				label: "Copyright line",
				kind: "text",
				group: "content",
				localization: "localized",
			},
			{
				path: "creditLogoUrl",
				label: "Credit logo URL",
				kind: "image",
				group: "content",
				localization: "shared",
			},
			{
				path: "creditLogoAlt",
				label: "Credit logo alt",
				kind: "text",
				group: "content",
				localization: "shared",
			},
		],
	},
);
