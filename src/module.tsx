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

export const marketplacesPhotonModule: PhotonModule = {
	...marketplacesPhotonModuleDescriptor,
	blocks: [...marketplaceBlockDefinitions],
};

export const marketplacesPhotonKit: PhotonInstallableKit = createPhotonKit({
	kind: "photon-installable-kit",
	key: "marketplaces",
	label: "Marketplaces",
	modules: [marketplacesPhotonModule],
	siteFrameExtensions: [marketplacesPhotonSiteFrameExtension],
	accountTabs: [marketplacesAccountProfileTab],
});
