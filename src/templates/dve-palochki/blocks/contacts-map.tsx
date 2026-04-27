"use client";

import {
	definePhotonBlockDefinition,
	type PhotonBlock,
} from "@init/photon/public";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

type Props = {
	addressTitle: string;
	address: string;
	phonesTitle: string;
	phones: { id: string; phone: string }[];
	emailTitle: string;
	email: string;
	hoursTitle: string;
	hours: string;
	mapEmbedUrl: string;
};

const BLOCK_TYPE = "marketplaces.dve-palochki.contacts-map";

const ContactsMapBlock = ({ block }: { block: PhotonBlock<Props> }) => {
	const p = block.props;

	if (!p.address && !p.phones.length && !p.email && !p.hours && !p.mapEmbedUrl) return null;

	return (
		<section className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-6 md:grid-cols-2">
			<dl className="space-y-4 text-sm">
				<div className="flex items-start gap-3">
					<MapPin className="mt-0.5 h-4 w-4 text-[var(--mp-accent,#E32636)]" />
					<div>
						<dt className="text-xs font-semibold uppercase tracking-wide text-[var(--photon-site-muted-text,#5C5C5C)]">
							{p.addressTitle}
						</dt>
						<dd>{p.address}</dd>
					</div>
				</div>
				<div className="flex items-start gap-3">
					<Phone className="mt-0.5 h-4 w-4 text-[var(--mp-accent,#E32636)]" />
					<div>
						<dt className="text-xs font-semibold uppercase tracking-wide text-[var(--photon-site-muted-text,#5C5C5C)]">
							{p.phonesTitle}
						</dt>
						<dd className="space-x-2">
							{p.phones.map((ph, i) => (
								<a
									key={ph.id}
									href={`tel:${ph.phone.replace(/[^+\d]/g, "")}`}
									className="hover:text-[var(--mp-accent,#E32636)]"
								>
									{ph.phone}
									{i < p.phones.length - 1 ? "," : ""}
								</a>
							))}
						</dd>
					</div>
				</div>
				<div className="flex items-start gap-3">
					<Mail className="mt-0.5 h-4 w-4 text-[var(--mp-accent,#E32636)]" />
					<div>
						<dt className="text-xs font-semibold uppercase tracking-wide text-[var(--photon-site-muted-text,#5C5C5C)]">
							{p.emailTitle}
						</dt>
						<dd>
							<a
								href={`mailto:${p.email}`}
								className="hover:text-[var(--mp-accent,#E32636)]"
							>
								{p.email}
							</a>
						</dd>
					</div>
				</div>
				<div className="flex items-start gap-3">
					<Clock className="mt-0.5 h-4 w-4 text-[var(--mp-accent,#E32636)]" />
					<div>
						<dt className="text-xs font-semibold uppercase tracking-wide text-[var(--photon-site-muted-text,#5C5C5C)]">
							{p.hoursTitle}
						</dt>
						<dd>{p.hours}</dd>
					</div>
				</div>
			</dl>
			<div className="aspect-video w-full overflow-hidden rounded-md bg-[var(--photon-site-surface-muted,#F4F4F5)]">
				{p.mapEmbedUrl ? (
					<iframe
						title="Map"
						src={p.mapEmbedUrl}
						className="h-full w-full border-0"
						loading="lazy"
						referrerPolicy="no-referrer-when-downgrade"
					/>
				) : null}
			</div>
		</section>
	);
};

export const dvePalochkiContactsMapDefinition = definePhotonBlockDefinition<Props>(
	{
		type: BLOCK_TYPE,
		label: "Contacts + Map (Dve Palochki)",
		description: "Address/phones/email/hours block paired with an iframe map.",
		category: "Marketplaces / Dve Palochki",
		icon: "map-pin",
		component: ContactsMapBlock,
		defaults: {
			addressTitle: "",
			address: "",
			phonesTitle: "",
			phones: [],
			emailTitle: "",
			email: "",
			hoursTitle: "",
			hours: "",
			mapEmbedUrl: "",
		},
		fields: [
			{ path: "address", label: "Address", kind: "textarea", localization: "localized" },
			{
				path: "phones",
				label: "Phones",
				kind: "repeater",
				localization: "shared",
				itemLabelPath: "phone",
				addLabel: "Add phone",
				fields: [{ path: "phone", label: "Phone", kind: "text" }],
			},
			{ path: "email", label: "Email", kind: "text", localization: "shared" },
			{ path: "hours", label: "Hours", kind: "text", localization: "shared" },
			{
				path: "mapEmbedUrl",
				label: "Map embed URL",
				kind: "url",
				localization: "shared",
			},
		],
	},
);
