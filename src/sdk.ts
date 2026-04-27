"use client";

import {
	createPhotonAccountTabExtension,
	createPhotonSiteFrameExtension,
	type PhotonAccountTabExtension,
	type PhotonSiteFrameExtension,
} from "@init/photon/public";

/**
 * Site-frame extension for the marketplaces kit.
 *
 * Important: the marketplace site-frame does NOT register a cart
 * action — that comes from `@init/commerce-photon`'s site-frame
 * extension (which the kit composes alongside, see
 * THATS_THE_WAY_IT_SHOULD_BE.md decision "Site-frame ownership").
 *
 * The kit instead contributes:
 *  - utility-row "About / Reviews / Payment / Contacts" links
 *  - footer navigation columns (categories + contacts)
 *
 * The big visual chunks (header logo+search+sub-nav, mobile bottom
 * bar, footer block) live in dedicated marketplace blocks that the
 * starter preset places into the site-frame region documents,
 * rather than being assembled imperatively from extension slots.
 * This keeps the design fidelity high without forcing the generic
 * site-frame renderer to know about marketplace-specific layout.
 */
export const marketplacesPhotonSiteFrameExtension: PhotonSiteFrameExtension =
	createPhotonSiteFrameExtension({
		id: "marketplaces",
		label: "Marketplaces",
		order: 30,
		header: {
			slots: {
				utility: {
					links: [
						{
							id: "marketplaces:utility:about",
							label: "About",
							href: "/about",
							order: 10,
						},
						{
							id: "marketplaces:utility:reviews",
							label: "Reviews",
							href: "/reviews",
							order: 20,
						},
						{
							id: "marketplaces:utility:payment",
							label: "Payment & delivery",
							href: "/payment-and-delivery",
							order: 30,
						},
						{
							id: "marketplaces:utility:contacts",
							label: "Contacts",
							href: "/contacts",
							order: 40,
						},
					],
				},
			},
		},
		footer: {
			slots: {
				navigation: {
					navigationColumns: [
						{
							id: "marketplaces:footer:catalog",
							title: "Catalog",
							order: 10,
							links: [
								{
									id: "marketplaces:footer:catalog-all",
									label: "All categories",
									href: "/archive",
								},
							],
						},
					],
				},
				legal: {
					links: [
						{
							id: "marketplaces:footer:privacy",
							label: "Privacy policy",
							href: "/privacy",
						},
					],
				},
			},
		},
	});

/**
 * Account-tab extension for the marketplaces kit. Adds a
 * "Profile" tab at `/account/profile`. The "Orders" tab is
 * provided by `@init/commerce-photon` and not duplicated here.
 */
export const marketplacesAccountProfileTab: PhotonAccountTabExtension =
	createPhotonAccountTabExtension({
		id: "marketplaces:profile",
		label: "Profile",
		href: "/account/profile",
		icon: "user",
		match: {
			type: "prefix",
			href: "/account/profile",
		},
		order: 40,
	});
