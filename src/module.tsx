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
 * Single Photon module that registers every block contributed by
 * every marketplace template family. Adding a new family means
 * appending to `marketplaces-foundation/photon-marketplaces-kit
 * /src/templates/index.ts`'s registry — `module` itself never
 * changes.
 */
export const marketplacesPhotonModule: PhotonModule = {
	module: "marketplaces-photon",
	label: "Marketplaces",
	labelKey: "marketplacesKit.module.label",
	version: "0.1.0",
	blocks: [...marketplaceBlockDefinitions],
};

/**
 * Admin/studio installable kit. Registered with the host through
 * `package.json#photon.installableKitExport = "marketplacesPhotonKit"`.
 */
export const marketplacesPhotonKit: PhotonInstallableKit = createPhotonKit({
	key: "marketplaces",
	label: "Marketplaces",
	modules: [marketplacesPhotonModule],
	siteFrameExtensions: [marketplacesPhotonSiteFrameExtension],
	accountTabs: [marketplacesAccountProfileTab],
});
