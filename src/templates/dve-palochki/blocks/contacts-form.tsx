"use client";

import {
	definePhotonBlockDefinition,
	type PhotonBlock,
} from "@init/photon/public";

type Props = {
	title: string;
	subtitle: string;
	namePlaceholder: string;
	emailPlaceholder: string;
	phonePlaceholder: string;
	messagePlaceholder: string;
	submitLabel: string;
	successMessage: string;
};

const BLOCK_TYPE = "marketplaces.dve-palochki.contacts-form";

const ContactsFormBlock = ({ block }: { block: PhotonBlock<Props> }) => {
	const p = block.props;

	if (!p.title && !p.namePlaceholder && !p.submitLabel) return null;

	return (
		<section className="mx-auto w-full max-w-3xl px-4 py-8">
			<h2 className="text-2xl font-semibold">{p.title}</h2>
			{p.subtitle ? (
				<p className="mt-1 text-sm text-[var(--photon-site-muted-text,#5C5C5C)]">
					{p.subtitle}
				</p>
			) : null}
			<form
				className="mt-6 grid gap-3 sm:grid-cols-3"
				onSubmit={(e) => {
					e.preventDefault();
					// TODO: integrate with backend submit endpoint
					/*
					 * v1: this is a no-op stub. The interaction action
					 * `marketplaces.contact-request` will be wired in once
					 * a backend endpoint exists. See
					 * THATS_THE_WAY_IT_SHOULD_BE.md decision "Contact form".
					 */
				}}
			>
				<input
					type="text"
					placeholder={p.namePlaceholder}
					className="rounded-md border border-[var(--photon-site-border,#E5E5E5)] px-3 py-2 text-sm outline-none focus:border-[var(--mp-accent,#E32636)]"
				/>
				<input
					type="email"
					placeholder={p.emailPlaceholder}
					className="rounded-md border border-[var(--photon-site-border,#E5E5E5)] px-3 py-2 text-sm outline-none focus:border-[var(--mp-accent,#E32636)]"
				/>
				<input
					type="tel"
					placeholder={p.phonePlaceholder}
					className="rounded-md border border-[var(--photon-site-border,#E5E5E5)] px-3 py-2 text-sm outline-none focus:border-[var(--mp-accent,#E32636)]"
				/>
				<textarea
					rows={4}
					placeholder={p.messagePlaceholder}
					className="rounded-md border border-[var(--photon-site-border,#E5E5E5)] px-3 py-2 text-sm outline-none focus:border-[var(--mp-accent,#E32636)] sm:col-span-3"
				/>
				<button
					type="submit"
					className="rounded-md border border-[var(--mp-accent,#E32636)] px-4 py-2 text-sm font-semibold text-[var(--mp-accent,#E32636)] transition hover:bg-[var(--mp-accent,#E32636)] hover:text-white sm:col-start-1"
				>
					{p.submitLabel}
				</button>
			</form>
		</section>
	);
};

export const dvePalochkiContactsFormDefinition = definePhotonBlockDefinition<Props>(
	{
		type: BLOCK_TYPE,
		label: "Contacts Form (Dve Palochki)",
		description: "Inquiry form. Submission stub until a backend endpoint is wired.",
		category: "Marketplaces / Dve Palochki",
		icon: "mail-question",
		component: ContactsFormBlock,
		defaults: {
			title: "",
			subtitle: "",
			namePlaceholder: "",
			emailPlaceholder: "",
			phonePlaceholder: "",
			messagePlaceholder: "",
			submitLabel: "",
			successMessage: "",
		},
		fields: [
			{ path: "title", label: "Title", kind: "text", localization: "localized" },
			{
				path: "subtitle",
				label: "Subtitle",
				kind: "textarea",
				localization: "localized",
			},
			{
				path: "namePlaceholder",
				label: "Name placeholder",
				kind: "text",
				localization: "localized",
			},
			{
				path: "emailPlaceholder",
				label: "Email placeholder",
				kind: "text",
				localization: "localized",
			},
			{
				path: "phonePlaceholder",
				label: "Phone placeholder",
				kind: "text",
				localization: "localized",
			},
			{
				path: "messagePlaceholder",
				label: "Message placeholder",
				kind: "text",
				localization: "localized",
			},
			{
				path: "submitLabel",
				label: "Submit label",
				kind: "text",
				localization: "localized",
			},
			{
				path: "successMessage",
				label: "Success message",
				kind: "text",
				localization: "localized",
			},
		],
	},
);
