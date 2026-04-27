"use client";

import {
	createPhotonKit,
	type PhotonInstallableKit,
	type PhotonModule,
} from "@init/photon/public";
import {
	marketplacesAccountProfileTab,
	marketplacesPhotonSiteFrameExtension,
} from "./sdk";
import { marketplaceBlockDefinitions } from "./templates";

/**
 * Public-runtime mirror of `marketplacesPhotonModule`. Same block
 * definitions — Photon resolves the public-runtime kit via
 * `package.json#photon.publicInstallableKitImportPath` and renders
 * blocks from the public bundle, keeping admin/studio modules out
 * of the public payload.
 */
export const marketplacesPublicPhotonModule: PhotonModule = {
	module: "marketplaces-photon",
	label: "Marketplaces",
	labelKey: "marketplacesKit.module.label",
	version: "0.1.0",
	blocks: [...marketplaceBlockDefinitions],
};

export const marketplacesPublicPhotonKit: PhotonInstallableKit = createPhotonKit({
	key: "marketplaces",
	label: "Marketplaces",
	modules: [marketplacesPublicPhotonModule],
	siteFrameExtensions: [marketplacesPhotonSiteFrameExtension],
	accountTabs: [marketplacesAccountProfileTab],
});
