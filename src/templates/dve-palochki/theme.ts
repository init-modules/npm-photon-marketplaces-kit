/**
 * Design tokens for the `dve-palochki` template family. Applied to
 * `site.settings.design` at preset application time so all blocks
 * consume them via `var(--photon-site-*)` and `var(--mp-*)`
 * fallbacks.
 */
export const dvePalochkiThemeTokens = {
	id: "marketplaces-dve-palochki",
	label: "Two Sticks (sushi delivery)",
	colors: {
		accent: "#E32636",
		accentForeground: "#FFFFFF",
		surface: "#FFFFFF",
		surfaceMuted: "#F4F4F5",
		cardBackground: "#F5F4F2",
		text: "#0F0F0F",
		textMuted: "#5C5C5C",
		border: "#E5E5E5",
		footerBackground: "#0A0A0A",
		footerForeground: "#A1A1A1",
		footerHeading: "#FFFFFF",
		danger: "#E32636",
	},
	primaryScale: {
		"50": "hsl(0, 91%, 97%)",
		"100": "hsl(0, 91%, 93%)",
		"200": "hsl(0, 91%, 86%)",
		"300": "hsl(0, 91%, 75%)",
		"400": "hsl(0, 91%, 64%)",
		"500": "hsl(0, 91%, 53%)",
		"600": "hsl(0, 91%, 45%)",
		"700": "hsl(0, 91%, 38%)",
		"800": "hsl(0, 91%, 30%)",
		"900": "hsl(0, 91%, 22%)",
	},
	secondaryScale: {
		"50": "hsl(24, 10%, 97%)",
		"100": "hsl(24, 10%, 93%)",
		"200": "hsl(24, 10%, 85%)",
		"300": "hsl(24, 10%, 73%)",
		"400": "hsl(24, 10%, 60%)",
		"500": "hsl(24, 10%, 47%)",
		"600": "hsl(24, 10%, 38%)",
		"700": "hsl(24, 10%, 29%)",
		"800": "hsl(24, 10%, 20%)",
		"900": "hsl(24, 10%, 12%)",
	},
	radius: {
		sm: "6px",
		md: "10px",
		lg: "14px",
		"2xl": "16px",
		pill: "9999px",
	},
	font: {
		display:
			'var(--font-display, "Inter", "SF Pro Text", system-ui, -apple-system, "Segoe UI", sans-serif)',
		body: 'var(--font-body, "Inter", system-ui, sans-serif)',
	},
	brand: {
		faviconUrl: "/marketplaces/dve-palochki/logo.svg",
	},
} as const;

export type DvePalochkiThemeTokens = typeof dvePalochkiThemeTokens;

/**
 * Patch fragment placed under `site.settings.design`. Top-level keys
 * match the schema consumed by `resolvePhotonPublicSiteDesignSettings`
 * (photon-foundation/photon) which projects them to CSS variables on
 * the site surface.
 *
 * Marketplace-specific CSS vars (`--mp-*`) are injected separately
 * via `dvePalochkiSiteFrameTokens` (rendered as an inline <style>
 * block by the kit's site-frame chrome) so they don't have to fight
 * the photon design schema.
 */
export const dvePalochkiSiteDesignPatch = {
	presetId: dvePalochkiThemeTokens.id,
	bodyFontFamily: dvePalochkiThemeTokens.font.body,
	headingFontFamily: dvePalochkiThemeTokens.font.display,
	backgroundColor: dvePalochkiThemeTokens.colors.surface,
	surfaceColor: dvePalochkiThemeTokens.colors.surface,
	textColor: dvePalochkiThemeTokens.colors.text,
	mutedTextColor: dvePalochkiThemeTokens.colors.textMuted,
	accentColor: dvePalochkiThemeTokens.colors.accent,
	borderColor: dvePalochkiThemeTokens.colors.border,
	radius: dvePalochkiThemeTokens.radius.lg,
} as const;

/**
 * Marketplace-specific CSS variables (`--mp-*`) emitted as a string
 * suitable for `<style>{`:root { ... }`}</style>`. Kept separate from
 * `dvePalochkiSiteDesignPatch` because photon's design-settings
 * schema only projects a fixed set of top-level keys.
 */
export const dvePalochkiSiteFrameTokens = `:root {
	--mp-accent: ${dvePalochkiThemeTokens.colors.accent};
	--mp-card-bg: ${dvePalochkiThemeTokens.colors.cardBackground};
	--mp-radius-2xl: ${dvePalochkiThemeTokens.radius["2xl"]};
	--mp-primary-50: ${dvePalochkiThemeTokens.primaryScale["50"]};
	--mp-primary-100: ${dvePalochkiThemeTokens.primaryScale["100"]};
	--mp-primary-200: ${dvePalochkiThemeTokens.primaryScale["200"]};
	--mp-primary-300: ${dvePalochkiThemeTokens.primaryScale["300"]};
	--mp-primary-400: ${dvePalochkiThemeTokens.primaryScale["400"]};
	--mp-primary-500: ${dvePalochkiThemeTokens.primaryScale["500"]};
	--mp-primary-600: ${dvePalochkiThemeTokens.primaryScale["600"]};
	--mp-primary-700: ${dvePalochkiThemeTokens.primaryScale["700"]};
	--mp-primary-800: ${dvePalochkiThemeTokens.primaryScale["800"]};
	--mp-primary-900: ${dvePalochkiThemeTokens.primaryScale["900"]};
	--mp-secondary-50: ${dvePalochkiThemeTokens.secondaryScale["50"]};
	--mp-secondary-500: ${dvePalochkiThemeTokens.secondaryScale["500"]};
	--mp-secondary-700: ${dvePalochkiThemeTokens.secondaryScale["700"]};
	--mp-secondary-900: ${dvePalochkiThemeTokens.secondaryScale["900"]};
	--mp-footer-bg: ${dvePalochkiThemeTokens.colors.footerBackground};
	--mp-footer-fg: ${dvePalochkiThemeTokens.colors.footerForeground};
	--mp-footer-heading: ${dvePalochkiThemeTokens.colors.footerHeading};
}`;

/**
 * Brand-level patch placed under `site.settings.brand`. Consumed by
 * the host shell (e.g. Next.js layout) to render `<link rel="icon">`
 * and similar brand metadata.
 */
export const dvePalochkiSiteBrandPatch = {
	faviconUrl: dvePalochkiThemeTokens.brand.faviconUrl,
} as const;
