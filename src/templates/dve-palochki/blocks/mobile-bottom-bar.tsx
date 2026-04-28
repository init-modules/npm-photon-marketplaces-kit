"use client";

import {
	definePhotonBlockDefinition,
	mobileBottomBarItemsSlot,
	type PhotonBlock,
	usePhotonResolvedSlot,
} from "@init/photon/public";
import type React from "react";

/**
 * Items come from contributions registered into the
 * `mobile-bottom-bar.items` slot via `definePhotonSiteFrameContribution`.
 * Inspector edits go through the `contribution-list` field on this
 * block (per-profile overrides write into `siteSettings.contributionOverrides`).
 */
type MobileBottomBarProps = Record<string, never>;

const MOBILE_BOTTOM_BAR_BLOCK_TYPE =
	"marketplaces.dve-palochki.mobile-bottom-bar";

const MobileBottomBarBlock = (_props: {
	block: PhotonBlock<MobileBottomBarProps>;
}) => {
	const resolved = usePhotonResolvedSlot(mobileBottomBarItemsSlot);

	if (resolved.length === 0) {
		return null;
	}

	return (
		<div
			data-marketplace-mobile-bottom-bar
			className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--photon-site-border,#E5E5E5)] bg-[var(--photon-site-surface,#fff)] md:hidden"
		>
			<nav className="mx-auto flex max-w-md items-stretch justify-around">
				{resolved.map(({ contribution, resolved: r }) => {
					const Component = contribution.component as React.ComponentType<
						Record<string, unknown>
					>;
					return (
						<Component
							key={r.contributionId}
							{...(r as unknown as Record<string, unknown>)}
						/>
					);
				})}
			</nav>
		</div>
	);
};

export const dvePalochkiMobileBottomBarDefinition =
	definePhotonBlockDefinition<MobileBottomBarProps>({
		type: MOBILE_BOTTOM_BAR_BLOCK_TYPE,
		label: "Mobile Bottom Bar (Dve Palochki)",
		description:
			"Fixed mobile bottom navigation. Items contributed via mobile-bottom-bar.items slot.",
		category: "Marketplaces / Dve Palochki",
		icon: "panel-bottom-dashed",
		component: MobileBottomBarBlock,
		defaults: {},
		fields: [
			{
				path: "__contributions",
				label: "Bottom bar items",
				kind: "contribution-list",
				slotId: "mobile-bottom-bar.items",
				group: "content",
			},
		],
	});
