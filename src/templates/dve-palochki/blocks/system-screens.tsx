"use client";

import {
	createPhotonLocalizedDefault,
	definePhotonBlockDefinition,
	PhotonLink,
	type PhotonBlock,
} from "@init/photon/public";

type SuccessProps = {
	title: string;
	body: string;
	primaryLabel: string;
	primaryHref: string;
};

const SUCCESS_BLOCK_TYPE = "marketplaces.dve-palochki.success-screen";

const SuccessBlock = ({ block }: { block: PhotonBlock<SuccessProps> }) => {
	const p = block.props;
	return (
		<section className="mx-auto flex w-full max-w-2xl flex-col items-center gap-4 px-4 py-16 text-center">
			<div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[var(--mp-accent,#E32636)]/10 text-[var(--mp-accent,#E32636)]">
				<svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={2}>
					<path d="m4 12 4 4 12-12" />
				</svg>
			</div>
			<h1 className="text-3xl font-semibold">{p.title}</h1>
			<p className="max-w-lg text-sm text-[var(--photon-site-muted-text,#5C5C5C)]">
				{p.body}
			</p>
			<PhotonLink
				href={p.primaryHref}
				className="mt-4 inline-flex items-center justify-center rounded-md border border-[var(--mp-accent,#E32636)] px-4 py-2 text-sm font-semibold text-[var(--mp-accent,#E32636)] transition hover:bg-[var(--mp-accent,#E32636)] hover:text-white"
			>
				{p.primaryLabel}
			</PhotonLink>
		</section>
	);
};

export const dvePalochkiSuccessScreenDefinition =
	definePhotonBlockDefinition<SuccessProps>({
		type: SUCCESS_BLOCK_TYPE,
		label: "Success Screen (Dve Palochki)",
		description: "Post-checkout success page with primary CTA back to home/catalog.",
		category: "Marketplaces / Dve Palochki",
		icon: "check-circle",
		component: SuccessBlock,
		defaults: {
			title: createPhotonLocalizedDefault({
				ru: "Заказ успешно оформлен!",
				en: "Order placed successfully!",
			}),
			body: createPhotonLocalizedDefault({
				ru: "Мы свяжемся с вами для подтверждения заказа.",
				en: "We will contact you to confirm the order.",
			}),
			primaryLabel: createPhotonLocalizedDefault({
				ru: "На главную",
				en: "Back to home",
			}),
			primaryHref: "/",
		},
		fields: [
			{ path: "title", label: "Title", kind: "text", localization: "localized" },
			{ path: "body", label: "Body", kind: "textarea", localization: "localized" },
			{
				path: "primaryLabel",
				label: "Primary CTA label",
				kind: "text",
				localization: "localized",
			},
			{
				path: "primaryHref",
				label: "Primary CTA href",
				kind: "url",
				localization: "shared",
			},
		],
	});

type NotFoundProps = {
	title: string;
	body: string;
	primaryLabel: string;
	primaryHref: string;
};

const NOT_FOUND_BLOCK_TYPE = "marketplaces.dve-palochki.not-found-screen";

const NotFoundBlock = ({ block }: { block: PhotonBlock<NotFoundProps> }) => {
	const p = block.props;
	return (
		<section className="mx-auto flex w-full max-w-2xl flex-col items-center gap-4 px-4 py-20 text-center">
			<div className="text-7xl font-bold tracking-tight text-[var(--mp-accent,#E32636)]">
				4<span className="text-[var(--photon-site-text,#0F0F0F)]">●</span>4
			</div>
			<h1 className="text-2xl font-semibold">{p.title}</h1>
			<p className="max-w-lg text-sm text-[var(--photon-site-muted-text,#5C5C5C)]">
				{p.body}
			</p>
			<PhotonLink
				href={p.primaryHref}
				className="mt-4 inline-flex items-center justify-center rounded-md border border-[var(--mp-accent,#E32636)] px-4 py-2 text-sm font-semibold text-[var(--mp-accent,#E32636)] transition hover:bg-[var(--mp-accent,#E32636)] hover:text-white"
			>
				{p.primaryLabel}
			</PhotonLink>
		</section>
	);
};

export const dvePalochkiNotFoundScreenDefinition =
	definePhotonBlockDefinition<NotFoundProps>({
		type: NOT_FOUND_BLOCK_TYPE,
		label: "Not Found Screen (Dve Palochki)",
		description: "404 page with branded styling and CTA back to home.",
		category: "Marketplaces / Dve Palochki",
		icon: "ghost",
		component: NotFoundBlock,
		defaults: {
			title: createPhotonLocalizedDefault({
				ru: "Эта страница не найдена.",
				en: "This page was not found.",
			}),
			body: createPhotonLocalizedDefault({
				ru: "Неправильно набран адрес, или такой страницы на сайте не существует.",
				en: "The address may be wrong, or the page no longer exists.",
			}),
			primaryLabel: createPhotonLocalizedDefault({
				ru: "На главную",
				en: "Back to home",
			}),
			primaryHref: "/",
		},
		fields: [
			{ path: "title", label: "Title", kind: "text", localization: "localized" },
			{ path: "body", label: "Body", kind: "textarea", localization: "localized" },
		],
	});

type SectionHeadingProps = {
	eyebrow: string;
	title: string;
	body: string;
};

const SECTION_HEADING_BLOCK_TYPE = "marketplaces.dve-palochki.section-heading";

const SectionHeadingBlock = ({
	block,
}: {
	block: PhotonBlock<SectionHeadingProps>;
}) => {
	const { eyebrow, title, body } = block.props;
	if (!eyebrow && !title && !body) return null;
	return (
		<section className="mx-auto w-full max-w-7xl px-4 pt-6 pb-3">
			{eyebrow ? (
				<span className="text-xs font-semibold uppercase tracking-wide text-[var(--mp-accent,#E32636)]">
					{eyebrow}
				</span>
			) : null}
			{title ? (
				<h2 className="mt-1 text-xl font-semibold sm:text-2xl">{title}</h2>
			) : null}
			{body ? (
				<p className="mt-1 max-w-2xl text-sm text-[var(--photon-site-muted-text,#5C5C5C)]">
					{body}
				</p>
			) : null}
		</section>
	);
};

export const dvePalochkiSectionHeadingDefinition =
	definePhotonBlockDefinition<SectionHeadingProps>({
		type: SECTION_HEADING_BLOCK_TYPE,
		label: "Section Heading (Dve Palochki)",
		description:
			"Generic eyebrow/title/body heading block reused across catalog and home rails.",
		category: "Marketplaces / Dve Palochki",
		icon: "heading",
		component: SectionHeadingBlock,
		defaults: { eyebrow: "", title: "", body: "" },
		fields: [
			{ path: "eyebrow", label: "Eyebrow", kind: "text", localization: "localized" },
			{ path: "title", label: "Title", kind: "text", localization: "localized" },
			{ path: "body", label: "Body", kind: "textarea", localization: "localized" },
		],
	});
