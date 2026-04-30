"use client";

import {
	createPhotonKit,
	type PhotonInstallableKit,
	type PhotonModule,
} from "@init/photon/public";
import {
	marketplaceBlockDefinitions,
	marketplacesAccountProfileTab,
	marketplacesPhotonModuleDescriptor,
	marketplacesPhotonSiteFrameExtension,
} from "./shared/block-renderers";

export const marketplacesPublicPhotonModule: PhotonModule = {
	...marketplacesPhotonModuleDescriptor,
	blocks: [...marketplaceBlockDefinitions],
};

export const marketplacesPublicPhotonKit: PhotonInstallableKit = createPhotonKit({
	kind: "photon-installable-kit",
	key: "marketplaces",
	label: "Marketplaces",
	modules: [marketplacesPublicPhotonModule],
	siteFrameExtensions: [marketplacesPhotonSiteFrameExtension],
	accountTabs: [marketplacesAccountProfileTab],
});
