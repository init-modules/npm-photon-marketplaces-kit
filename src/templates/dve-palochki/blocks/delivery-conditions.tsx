"use client";

import {
	createPhotonLocalizedDefault,
	definePhotonBlockDefinition,
	type PhotonBlock,
} from "@init/photon/public";

type Props = {
	areaTitle: string;
	streetTop: string;
	streetBottom: string;
	streetLeft: string;
	streetRight: string;
	pickupNote: string;
	minOrderNote: string;
	paymentBlocks: { id: string; title: string; body: string }[];
};

const BLOCK_TYPE = "marketplaces.dve-palochki.delivery-conditions";

const DeliveryConditionsBlock = ({ block }: { block: PhotonBlock<Props> }) => {
	const p = block.props;
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

			<div className="mt-8 rounded-lg border border-[var(--photon-site-border,#E5E5E5)] p-4">
				<div className="text-sm font-semibold">{p.areaTitle}</div>
				<div className="mt-3 grid grid-cols-[40px_1fr_40px] grid-rows-[auto_180px_auto] items-center text-xs">
					<div className="col-span-3 text-center font-medium">{p.streetTop}</div>
					<div className="-rotate-90 self-center justify-self-center">
						{p.streetLeft}
					</div>
					<div className="flex h-full flex-col items-center justify-center rounded-md bg-[var(--photon-site-surface-muted,#F4F4F5)] text-center text-sm font-semibold">
						{p.areaTitle}
					</div>
					<div className="rotate-90 self-center justify-self-center">
						{p.streetRight}
					</div>
					<div className="col-span-3 text-center font-medium">{p.streetBottom}</div>
				</div>
				<p className="mt-4 text-xs text-[var(--photon-site-muted-text,#5C5C5C)]">
					{p.pickupNote}
				</p>
				<p className="mt-2 text-sm font-semibold">{p.minOrderNote}</p>
			</div>
		</section>
	);
};

export const dvePalochkiDeliveryConditionsDefinition =
	definePhotonBlockDefinition<Props>({
		type: BLOCK_TYPE,
		label: "Delivery & Payment (Dve Palochki)",
		description:
			"Payment-and-delivery copy with the iconic free-delivery zone schematic.",
		category: "Marketplaces / Dve Palochki",
		icon: "truck",
		component: DeliveryConditionsBlock,
		defaults: {
			areaTitle: createPhotonLocalizedDefault({
				ru: "Бесплатная доставка только в пределах квадрата",
				en: "Free delivery within the marked area only",
			}),
			streetTop: "",
			streetBottom: "",
			streetLeft: "",
			streetRight: "",
			pickupNote: "",
			minOrderNote: "",
			paymentBlocks: [],
		},
		fields: [
			{
				path: "areaTitle",
				label: "Zone title",
				kind: "text",
				localization: "localized",
			},
			{ path: "streetTop", label: "Street top", kind: "text", localization: "shared" },
			{
				path: "streetBottom",
				label: "Street bottom",
				kind: "text",
				localization: "shared",
			},
			{ path: "streetLeft", label: "Street left", kind: "text", localization: "shared" },
			{
				path: "streetRight",
				label: "Street right",
				kind: "text",
				localization: "shared",
			},
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
