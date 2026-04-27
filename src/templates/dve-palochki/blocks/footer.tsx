"use client";

import {
	definePhotonBlockDefinition,
	PhotonLink,
	type PhotonBlock,
} from "@init/photon/public";
import { Phone } from "lucide-react";

type FooterLink = { id: string; label: string; href: string };

type FooterProps = {
	brandLabel: string;
	brandDescription: string;
	logoUrl: string;
	categoriesTitle: string;
	categories: FooterLink[];
	contactsTitle: string;
	phones: { id: string; phone: string }[];
	address: string;
	cta: { label: string; href: string } | null;
	legalLinks: FooterLink[];
	copyright: string;
	credit: string;
	creditHref: string;
};

const FOOTER_BLOCK_TYPE = "marketplaces.dve-palochki.footer";

const FooterBlock = ({ block }: { block: PhotonBlock<FooterProps> }) => {
	const p = block.props;

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
					{p.cta ? (
						<PhotonLink
							href={p.cta.href}
							className="inline-flex items-center justify-center rounded-md border border-[var(--mp-accent,#E32636)] px-4 py-2 text-sm font-semibold text-[var(--mp-accent,#E32636)] transition hover:bg-[var(--mp-accent,#E32636)] hover:text-white"
						>
							{p.cta.label}
						</PhotonLink>
					) : null}
				</div>

				<div>
					<h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--mp-footer-heading,#fff)]">
						{p.categoriesTitle}
					</h4>
					<ul className="space-y-2 text-sm">
						{p.categories.slice(0, Math.ceil(p.categories.length / 2)).map((c) => (
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
					<h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-transparent">
						.
					</h4>
					<ul className="space-y-2 text-sm">
						{p.categories.slice(Math.ceil(p.categories.length / 2)).map((c) => (
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
									className="inline-flex items-center gap-2 hover:text-[var(--mp-accent,#E32636)]"
								>
									<Phone className="h-3.5 w-3.5" /> {ph.phone}
								</a>
							</li>
						))}
						<li className="pt-2 text-[color:rgba(255,255,255,0.7)]">{p.address}</li>
					</ul>
				</div>
			</div>

			<div className="border-t border-[color:rgba(255,255,255,0.08)]">
				<div className="mx-auto flex max-w-7xl flex-col items-start gap-3 px-4 py-5 text-xs sm:flex-row sm:items-center sm:justify-between">
					<div>
						<div className="text-[color:rgba(255,255,255,0.85)]">{p.copyright}</div>
						<ul className="mt-1 flex flex-wrap gap-3 text-[color:rgba(255,255,255,0.6)]">
							{p.legalLinks.map((l) => (
								<li key={l.id}>
									<PhotonLink
										href={l.href}
										className="hover:text-[var(--mp-accent,#E32636)]"
									>
										{l.label}
									</PhotonLink>
								</li>
							))}
						</ul>
					</div>
					<a
						href={p.creditHref}
						className="text-[color:rgba(255,255,255,0.6)] hover:text-white"
						target="_blank"
						rel="noreferrer"
					>
						{p.credit}
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
			categoriesTitle: "",
			categories: [],
			contactsTitle: "",
			phones: [],
			address: "",
			cta: null,
			legalLinks: [],
			copyright: "",
			credit: "",
			creditHref: "",
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
				path: "legalLinks",
				label: "Legal links",
				kind: "repeater",
				group: "content",
				localization: "localized",
				itemLabelPath: "label",
				addLabel: "Add link",
				fields: [
					{ path: "label", label: "Label", kind: "text" },
					{ path: "href", label: "Href", kind: "url", localization: "shared" },
				],
			},
			{
				path: "copyright",
				label: "Copyright line",
				kind: "text",
				group: "content",
				localization: "localized",
			},
		],
	},
);
