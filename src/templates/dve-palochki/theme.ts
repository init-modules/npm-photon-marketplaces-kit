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
		text: "#0F0F0F",
		textMuted: "#5C5C5C",
		border: "#E5E5E5",
		footerBackground: "#0A0A0A",
		footerForeground: "#A1A1A1",
		footerHeading: "#FFFFFF",
		danger: "#E32636",
	},
	radius: {
		sm: "6px",
		md: "10px",
		lg: "14px",
		pill: "9999px",
	},
	font: {
		display:
			'var(--font-display, "Inter", "SF Pro Text", system-ui, -apple-system, "Segoe UI", sans-serif)',
		body: 'var(--font-body, "Inter", system-ui, sans-serif)',
	},
} as const;

export type DvePalochkiThemeTokens = typeof dvePalochkiThemeTokens;

/**
 * Patch fragment placed under `site.settings.design`. Site frame
 * and block components read these via `usePhotonStore`.
 */
export const dvePalochkiSiteDesignPatch = {
	presetId: dvePalochkiThemeTokens.id,
	tokens: {
		"--photon-site-accent": dvePalochkiThemeTokens.colors.accent,
		"--photon-site-accent-foreground":
			dvePalochkiThemeTokens.colors.accentForeground,
		"--photon-site-surface": dvePalochkiThemeTokens.colors.surface,
		"--photon-site-surface-muted": dvePalochkiThemeTokens.colors.surfaceMuted,
		"--photon-site-text": dvePalochkiThemeTokens.colors.text,
		"--photon-site-muted-text": dvePalochkiThemeTokens.colors.textMuted,
		"--photon-site-border": dvePalochkiThemeTokens.colors.border,
		"--mp-accent": dvePalochkiThemeTokens.colors.accent,
		"--mp-footer-bg": dvePalochkiThemeTokens.colors.footerBackground,
		"--mp-footer-fg": dvePalochkiThemeTokens.colors.footerForeground,
		"--mp-footer-heading": dvePalochkiThemeTokens.colors.footerHeading,
	},
} as const;
