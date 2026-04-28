import {
	definePhotonBlockDefinition,
	type PhotonBlock,
} from "@init/photon/public";

type Props = {
	areaTitle: string;
	streetTop: string;
	streetBottom: string;
	streetLeft: string;
	streetRight: string;
};

const BLOCK_TYPE = "marketplaces.dve-palochki.delivery-square";

const DeliverySquareBlock = ({ block }: { block: PhotonBlock<Props> }) => {
	const p = block.props;

	if (!p.streetTop && !p.streetBottom && !p.streetLeft && !p.streetRight) {
		return null;
	}

	return (
		<section className="mx-auto w-full max-w-3xl px-4 py-8">
			<div className="rounded-lg border border-[var(--photon-site-border,#E5E5E5)] p-4">
				{p.areaTitle ? (
					<div className="text-sm font-semibold">{p.areaTitle}</div>
				) : null}
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
					<div className="col-span-3 text-center font-medium">
						{p.streetBottom}
					</div>
				</div>
			</div>
		</section>
	);
};

export const dvePalochkiDeliverySquareDefinition =
	definePhotonBlockDefinition<Props>({
		type: BLOCK_TYPE,
		label: "Delivery Square (Dve Palochki)",
		description:
			"Iconic free-delivery zone schematic — a 2x2 area framed by four street names.",
		category: "Marketplaces / Dve Palochki",
		icon: "square",
		component: DeliverySquareBlock,
		defaults: {
			areaTitle: "",
			streetTop: "",
			streetBottom: "",
			streetLeft: "",
			streetRight: "",
		},
		fields: [
			{
				path: "areaTitle",
				label: "Zone title",
				kind: "text",
				localization: "localized",
			},
			{
				path: "streetTop",
				label: "Street top",
				kind: "text",
				localization: "shared",
			},
			{
				path: "streetBottom",
				label: "Street bottom",
				kind: "text",
				localization: "shared",
			},
			{
				path: "streetLeft",
				label: "Street left",
				kind: "text",
				localization: "shared",
			},
			{
				path: "streetRight",
				label: "Street right",
				kind: "text",
				localization: "shared",
			},
		],
	});
