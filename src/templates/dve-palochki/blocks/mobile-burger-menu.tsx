"use client";

import {
	definePhotonBlockDefinition,
	PhotonLink,
	type PhotonBlock,
} from "@init/photon/public";
import { MessageCircle, Phone, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Tiny client-side event bus used by the dve-palochki header (B5b)
 * to open this fullscreen mobile menu without a direct import
 * cycle between the header block and this block.
 *
 * The header dispatches `open`; the menu component subscribes via
 * `useEffect` on mount. Both modules can be tree-shaken / split
 * without leaking React state across boundaries.
 */
const burgerMenuChannel: EventTarget | null =
	typeof window !== "undefined" ? new EventTarget() : null;

export const openDvePalochkiBurgerMenu = (): void => {
	burgerMenuChannel?.dispatchEvent(new Event("open"));
};

export const closeDvePalochkiBurgerMenu = (): void => {
	burgerMenuChannel?.dispatchEvent(new Event("close"));
};

type MobileBurgerMenuProps = {
	navItems: Array<{ id: string; label: string; href: string }>;
	contactsHeading: string;
	phones: Array<{ id: string; phone: string }>;
	whatsappPhone: string;
	closeLabel: string;
	loginLabel: string;
	loginHref: string;
	dashboardLabel: string;
	dashboardHref: string;
};

const MOBILE_BURGER_MENU_BLOCK_TYPE =
	"marketplaces.dve-palochki.mobile-burger-menu";

const sanitizeTel = (raw: string): string => raw.replace(/[^+\d]/g, "");
const sanitizeWhatsapp = (raw: string): string => raw.replace(/[^\d]/g, "");

const MobileBurgerMenuBlock = ({
	block,
}: {
	block: PhotonBlock<MobileBurgerMenuProps>;
}) => {
	const props = block.props;
	const [open, setOpen] = useState(false);
	const pathname = usePathname();

	// Subscribe to the global open/close bus so the header trigger
	// (B5b) can pop this menu without importing the component.
	useEffect(() => {
		if (!burgerMenuChannel) return;
		const handleOpen = () => setOpen(true);
		const handleClose = () => setOpen(false);
		burgerMenuChannel.addEventListener("open", handleOpen);
		burgerMenuChannel.addEventListener("close", handleClose);
		return () => {
			burgerMenuChannel.removeEventListener("open", handleOpen);
			burgerMenuChannel.removeEventListener("close", handleClose);
		};
	}, []);

	// Auto-close on route change so the menu doesn't linger after a
	// nav-link navigation (PhotonLink uses next/link under the hood).
	useEffect(() => {
		setOpen(false);
	}, [pathname]);

	// Close on Escape.
	useEffect(() => {
		if (!open) return;
		const onKey = (event: KeyboardEvent) => {
			if (event.key === "Escape") setOpen(false);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open]);

	// Auto-disable on desktop: if the viewport grows past the md
	// breakpoint, close the menu so it doesn't get stuck open after
	// resize / orientation change.
	useEffect(() => {
		if (typeof window === "undefined" || !window.matchMedia) return;
		const mql = window.matchMedia("(min-width: 768px)");
		const apply = () => {
			if (mql.matches) setOpen(false);
		};
		apply();
		if (typeof mql.addEventListener === "function") {
			mql.addEventListener("change", apply);
			return () => mql.removeEventListener("change", apply);
		}
		// Safari < 14 fallback.
		mql.addListener(apply);
		return () => mql.removeListener(apply);
	}, []);

	if (!open) return null;

	const hasWhatsapp = props.whatsappPhone.length > 0;

	return (
		<div
			data-marketplace-mobile-burger-menu
			className="fixed inset-0 z-50 overflow-y-auto bg-[var(--photon-site-surface,white)] text-[var(--photon-site-text,#0F0F0F)] md:hidden"
			role="dialog"
			aria-modal="true"
		>
			<div className="flex items-center justify-end border-b border-[var(--photon-site-border,#E5E5E5)] px-4 py-3">
				<button
					type="button"
					onClick={() => setOpen(false)}
					aria-label={props.closeLabel}
					className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-[color:rgba(0,0,0,0.04)]"
				>
					<X className="h-5 w-5" />
				</button>
			</div>

			<div className="mx-auto flex max-w-md flex-col gap-6 px-4 py-6">
				{props.navItems.length > 0 ? (
					<nav className="flex flex-col">
						{props.navItems.map((item) => (
							<PhotonLink
								key={item.id}
								href={item.href}
								className="border-b border-[var(--photon-site-border,#E5E5E5)] py-3 text-lg font-semibold hover:text-[var(--mp-accent,#E32636)]"
							>
								{item.label}
							</PhotonLink>
						))}
					</nav>
				) : null}

				{(props.loginLabel.length > 0 || props.dashboardLabel.length > 0) ? (
					<div className="flex flex-col gap-2">
						{props.loginLabel.length > 0 ? (
							<PhotonLink
								href={props.loginHref}
								className="rounded-md border border-[var(--photon-site-border,#E5E5E5)] px-4 py-2 text-center text-sm font-semibold hover:bg-[color:rgba(0,0,0,0.04)]"
							>
								{props.loginLabel}
							</PhotonLink>
						) : null}
						{props.dashboardLabel.length > 0 ? (
							<PhotonLink
								href={props.dashboardHref}
								className="rounded-md border border-[var(--photon-site-border,#E5E5E5)] px-4 py-2 text-center text-sm font-semibold hover:bg-[color:rgba(0,0,0,0.04)]"
							>
								{props.dashboardLabel}
							</PhotonLink>
						) : null}
					</div>
				) : null}

				{(props.phones.length > 0 || hasWhatsapp) ? (
					<section>
						{props.contactsHeading.length > 0 ? (
							<h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--photon-site-muted-text,#5C5C5C)]">
								{props.contactsHeading}
							</h2>
						) : null}
						<ul className="flex flex-col gap-1">
							{props.phones.map((entry) => (
								<li key={entry.id}>
									<a
										href={`tel:${sanitizeTel(entry.phone)}`}
										className="flex items-center gap-2 rounded px-2 py-2 text-sm hover:bg-[color:rgba(0,0,0,0.04)]"
									>
										<Phone className="h-4 w-4 text-[var(--mp-accent,#E32636)]" />
										<span>{entry.phone}</span>
									</a>
								</li>
							))}
							{hasWhatsapp ? (
								<li>
									<a
										href={`https://wa.me/${sanitizeWhatsapp(props.whatsappPhone)}`}
										target="_blank"
										rel="noreferrer"
										className="flex items-center gap-2 rounded px-2 py-2 text-sm hover:bg-[color:rgba(0,0,0,0.04)]"
									>
										<MessageCircle className="h-4 w-4 text-[#25D366]" />
										<span>WhatsApp</span>
									</a>
								</li>
							) : null}
						</ul>
					</section>
				) : null}
			</div>
		</div>
	);
};

export const dvePalochkiMobileBurgerMenuDefinition =
	definePhotonBlockDefinition<MobileBurgerMenuProps>({
		type: MOBILE_BURGER_MENU_BLOCK_TYPE,
		label: "Mobile burger menu (Dve Palochki)",
		description:
			"Fullscreen mobile menu overlay with nav links, locale switcher, account, contacts.",
		category: "Marketplaces / Dve Palochki",
		icon: "menu",
		component: MobileBurgerMenuBlock,
		defaults: {
			navItems: [],
			contactsHeading: "",
			phones: [],
			whatsappPhone: "",
			closeLabel: "",
			loginLabel: "",
			loginHref: "",
			dashboardLabel: "",
			dashboardHref: "",
		},
		fields: [
			{
				path: "navItems",
				label: "Nav items",
				kind: "repeater",
				group: "content",
				localization: "localized",
				itemLabelPath: "label",
				addLabel: "Add nav item",
				fields: [
					{ path: "label", label: "Label", kind: "text" },
					{ path: "href", label: "Href", kind: "url", localization: "shared" },
				],
			},
			{
				path: "contactsHeading",
				label: "Contacts heading",
				kind: "text",
				group: "content",
				localization: "localized",
			},
			{
				path: "phones",
				label: "Contact phones",
				kind: "repeater",
				group: "content",
				localization: "shared",
				itemLabelPath: "phone",
				addLabel: "Add phone",
				fields: [{ path: "phone", label: "Phone", kind: "text" }],
			},
			{
				path: "whatsappPhone",
				label: "WhatsApp phone",
				kind: "text",
				group: "content",
				localization: "shared",
			},
			{
				path: "closeLabel",
				label: "Close button label",
				kind: "text",
				group: "content",
				localization: "localized",
			},
			{
				path: "loginLabel",
				label: "Login label",
				kind: "text",
				group: "content",
				localization: "localized",
			},
			{
				path: "loginHref",
				label: "Login href",
				kind: "url",
				group: "content",
				localization: "shared",
			},
			{
				path: "dashboardLabel",
				label: "Dashboard label",
				kind: "text",
				group: "content",
				localization: "localized",
			},
			{
				path: "dashboardHref",
				label: "Dashboard href",
				kind: "url",
				group: "content",
				localization: "shared",
			},
		],
	});
