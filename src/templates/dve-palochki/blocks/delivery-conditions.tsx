"use client";

import {
	definePhotonBlockDefinition,
	type PhotonBlock,
} from "@init/photon/public";

type Props = {
	pickupNote: string;
	minOrderNote: string;
	paymentBlocks: { id: string; title: string; body: string }[];
};

const BLOCK_TYPE = "marketplaces.dve-palochki.delivery-conditions";

const DeliveryConditionsBlock = ({ block }: { block: PhotonBlock<Props> }) => {
	const p = block.props;

	if (!p.pickupNote && !p.minOrderNote && !p.paymentBlocks.length) return null;

	return (
		<section className="mx-auto w-full max-w-3xl px-4 py-8">
			{p.paymentBlocks.length > 0 ? (
				<div className="space-y-6">
					{p.paymentBlocks.map((b) => (
						<article key={b.id}>
							<h3 className="mb-2 text-lg font-semibold">{b.title}</h3>
							<p className="text-sm leading-relaxed text-[var(--photon-site-muted-text,#5C5C5C)]">
								{b.body}
							</p>
						</article>
					))}
				</div>
			) : null}

			{p.pickupNote || p.minOrderNote ? (
				<div className="mt-8 rounded-lg border border-[var(--photon-site-border,#E5E5E5)] p-4">
					{p.pickupNote ? (
						<p className="text-xs text-[var(--photon-site-muted-text,#5C5C5C)]">
							{p.pickupNote}
						</p>
					) : null}
					{p.minOrderNote ? (
						<p className="mt-2 text-sm font-semibold">{p.minOrderNote}</p>
					) : null}
				</div>
			) : null}
		</section>
	);
};

export const dvePalochkiDeliveryConditionsDefinition =
	definePhotonBlockDefinition<Props>({
		type: BLOCK_TYPE,
		label: "Delivery & Payment (Dve Palochki)",
		description:
			"Payment-and-delivery copy paired with optional pickup/min-order notes.",
		category: "Marketplaces / Dve Palochki",
		icon: "truck",
		component: DeliveryConditionsBlock,
		defaults: {
			pickupNote: "",
			minOrderNote: "",
			paymentBlocks: [],
		},
		fields: [
			{
				path: "pickupNote",
				label: "Pickup note",
				kind: "textarea",
				localization: "localized",
			},
			{
				path: "minOrderNote",
				label: "Min order note",
				kind: "text",
				localization: "localized",
			},
			{
				path: "paymentBlocks",
				label: "Payment blocks",
				kind: "repeater",
				localization: "localized",
				itemLabelPath: "title",
				addLabel: "Add block",
				fields: [
					{ path: "title", label: "Title", kind: "text" },
					{ path: "body", label: "Body", kind: "textarea" },
				],
			},
		],
	});
