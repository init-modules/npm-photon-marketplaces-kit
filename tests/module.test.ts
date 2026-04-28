import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
	createMarketplacesProfileDocumentTree,
	MARKETPLACE_ROUTES,
	marketplacesProfileStarterPresets,
} from "../src/documents";
import {
	getMarketplaceTemplateFamily,
	marketplaceBlockDefinitions,
	marketplaceTemplateFamilies,
} from "../src/templates";

describe("@init/photon-marketplaces-kit module", () => {
	it("exposes a template-family registry", () => {
		assert.ok(Array.isArray(marketplaceTemplateFamilies));
	});

	it("each family declares a non-empty blockTypes list", () => {
		for (const f of marketplaceTemplateFamilies) {
			assert.ok(f.blockTypes.length > 0, `family ${f.id} has empty blockTypes`);
		}
	});

	it("all block types are unique across families and namespaced under marketplaces.<family>.*", () => {
		const seen = new Set<string>();
		for (const f of marketplaceTemplateFamilies) {
			for (const type of f.blockTypes) {
				assert.ok(!seen.has(type), `duplicate block type: ${type}`);
				seen.add(type);
				assert.ok(
					type.startsWith(`marketplaces.${f.id}.`),
					`block type ${type} is not namespaced under marketplaces.${f.id}.*`,
				);
			}
		}
	});

	it("collected block definitions match the union of family block types", () => {
		const fromDefinitions = new Set(marketplaceBlockDefinitions.map((d) => d.type));
		const fromFamilies = new Set(
			marketplaceTemplateFamilies.flatMap((f) => f.blockTypes),
		);
		assert.deepEqual(
			[...fromDefinitions].sort(),
			[...fromFamilies].sort(),
		);
	});

	it("getMarketplaceTemplateFamily resolves every registered family and throws on unknown id", () => {
		for (const f of marketplaceTemplateFamilies) {
			assert.equal(getMarketplaceTemplateFamily(f.id).id, f.id);
		}
		assert.throws(() => {
			// @ts-expect-error -- intentional unknown id for the contract test
			getMarketplaceTemplateFamily("__unknown__");
		});
	});

	it("ships a starter preset per family", () => {
		const familyIds = new Set(marketplaceTemplateFamilies.map((f) => f.id));
		const presetFamilyIds = new Set(
			marketplacesProfileStarterPresets.map((p) => p.familyId),
		);
		for (const id of familyIds) {
			assert.ok(presetFamilyIds.has(id), `no preset for family ${id}`);
		}
	});

	it("createMarketplacesProfileDocumentTree produces all the expected page documents for every family", () => {
		for (const family of marketplaceTemplateFamilies) {
			const tree = createMarketplacesProfileDocumentTree({
				familyId: family.id,
			});
			const routes = new Set(Object.values(tree.documents).map((d) => d.route));
			const expected = [
				MARKETPLACE_ROUTES.home,
				MARKETPLACE_ROUTES.cart,
				MARKETPLACE_ROUTES.checkout,
				MARKETPLACE_ROUTES.about,
				MARKETPLACE_ROUTES.contacts,
				MARKETPLACE_ROUTES.paymentAndDelivery,
				MARKETPLACE_ROUTES.privacy,
				MARKETPLACE_ROUTES.reviews,
				MARKETPLACE_ROUTES.success,
				MARKETPLACE_ROUTES.notFound,
				MARKETPLACE_ROUTES.accountOrders,
				MARKETPLACE_ROUTES.accountProfile,
			];
			for (const r of expected) {
				assert.ok(routes.has(r), `family ${family.id}: missing route ${r}`);
			}
			assert.ok(tree.siteRegions.header.blocks.length > 0);
			assert.ok(tree.siteRegions.footer.blocks.length > 0);
		}
	});

	it("starter document tree only references known block types for every family", () => {
		const knownTypes = new Set(marketplaceBlockDefinitions.map((d) => d.type));
		const externalTypes = new Set([
			"commerce-product-grid",
			"commerce-product-detail",
			"commerce-add-to-cart",
			"commerce-cart-summary",
			"commerce-checkout-form",
			"commerce-order-list",
		]);
		for (const family of marketplaceTemplateFamilies) {
			const tree = createMarketplacesProfileDocumentTree({
				familyId: family.id,
			});
			const allBlocks = [
				...Object.values(tree.documents).flatMap((d) => d.blocks),
				...tree.siteRegions.header.blocks,
				...tree.siteRegions.footer.blocks,
			];
			for (const b of allBlocks) {
				const ok = knownTypes.has(b.type) || externalTypes.has(b.type);
				assert.ok(ok, `family ${family.id}: unknown block type ${b.type}`);
			}
		}
	});
});
