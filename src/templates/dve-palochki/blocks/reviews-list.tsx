"use client";

import {
	createPhotonLocalizedDefault,
	definePhotonBlockDefinition,
	type PhotonBlock,
} from "@init/photon/public";
import { MessageSquare, Star } from "lucide-react";

type Review = {
	id: string;
	clientName: string;
	rating: number;
	createdAt: string;
	body: string;
	adminReply: string;
};

type Props = {
	emptyTitle: string;
	emptyBody: string;
	formTitle: string;
	formBodyPlaceholder: string;
	formNamePlaceholder: string;
	formEmailPlaceholder: string;
	formSubmitLabel: string;
	adminReplyLabel: string;
	reviews: Review[];
};

const BLOCK_TYPE = "marketplaces.dve-palochki.reviews-list";

const Stars = ({ value }: { value: number }) => (
	<div
		role="img"
		aria-label={`${value} of 5 stars`}
		className="inline-flex items-center gap-0.5"
	>
		{Array.from({ length: 5 }, (_, i) => (
			<Star
				key={i}
				className={[
					"h-4 w-4",
					i < value
						? "fill-amber-400 text-amber-400"
						: "text-[color:rgba(0,0,0,0.18)]",
				].join(" ")}
			/>
		))}
	</div>
);

const ReviewsListBlock = ({ block }: { block: PhotonBlock<Props> }) => {
	const p = block.props;
	return (
		<section className="mx-auto w-full max-w-4xl space-y-8 px-4 py-6">
			{p.reviews.length > 0 ? (
				<ul className="space-y-4">
					{p.reviews.map((r) => (
						<li
							key={r.id}
							className="rounded-lg border border-[var(--photon-site-border,#E5E5E5)] p-4"
						>
							<div className="flex items-start justify-between gap-3">
								<div>
									<div className="text-sm font-semibold">{r.clientName}</div>
									<div className="text-xs text-[var(--photon-site-muted-text,#5C5C5C)]">
										{r.createdAt}
									</div>
								</div>
								<Stars value={Math.round(r.rating)} />
							</div>
							<p className="mt-3 text-sm leading-relaxed">{r.body}</p>
							{r.adminReply ? (
								<div className="mt-3 rounded-md bg-[var(--photon-site-surface-muted,#F4F4F5)] p-3">
									<div className="text-xs font-semibold uppercase tracking-wide text-[var(--photon-site-muted-text,#5C5C5C)]">
										{p.adminReplyLabel || "Admin reply"}
									</div>
									<p className="mt-1 text-sm">{r.adminReply}</p>
								</div>
							) : null}
						</li>
					))}
				</ul>
			) : (
				<div className="flex items-center gap-3 rounded-lg border border-[var(--photon-site-border,#E5E5E5)] p-6">
					<MessageSquare className="h-6 w-6 text-[var(--photon-site-muted-text,#5C5C5C)]" />
					<div>
						<div className="text-sm font-semibold">{p.emptyTitle}</div>
						<div className="text-sm text-[var(--photon-site-muted-text,#5C5C5C)]">
							{p.emptyBody}
						</div>
					</div>
				</div>
			)}
			<form
				className="space-y-3 rounded-lg border border-[var(--photon-site-border,#E5E5E5)] p-4"
				onSubmit={(e) => e.preventDefault()}
			>
				<h3 className="text-base font-semibold">{p.formTitle}</h3>
				<Stars value={5} />
				<textarea
					rows={4}
					placeholder={p.formBodyPlaceholder}
					className="w-full rounded-md border border-[var(--photon-site-border,#E5E5E5)] px-3 py-2 text-sm outline-none focus:border-[var(--mp-accent,#E32636)]"
				/>
				<div className="grid gap-3 sm:grid-cols-2">
					<input
						type="text"
						placeholder={p.formNamePlaceholder}
						className="rounded-md border border-[var(--photon-site-border,#E5E5E5)] px-3 py-2 text-sm outline-none focus:border-[var(--mp-accent,#E32636)]"
					/>
					<input
						type="email"
						placeholder={p.formEmailPlaceholder}
						className="rounded-md border border-[var(--photon-site-border,#E5E5E5)] px-3 py-2 text-sm outline-none focus:border-[var(--mp-accent,#E32636)]"
					/>
				</div>
				<button
					type="submit"
					className="rounded-md border border-[var(--mp-accent,#E32636)] px-4 py-2 text-sm font-semibold text-[var(--mp-accent,#E32636)] transition hover:bg-[var(--mp-accent,#E32636)] hover:text-white"
				>
					{p.formSubmitLabel}
				</button>
			</form>
		</section>
	);
};

export const dvePalochkiReviewsListDefinition = definePhotonBlockDefinition<Props>(
	{
		type: BLOCK_TYPE,
		label: "Reviews List (Dve Palochki)",
		description: "List of customer reviews with admin replies and a 'leave review' form.",
		category: "Marketplaces / Dve Palochki",
		icon: "star",
		component: ReviewsListBlock,
		defaults: {
			emptyTitle: createPhotonLocalizedDefault({
				ru: "Отзывов пока нет",
				en: "No reviews yet",
			}),
			emptyBody: createPhotonLocalizedDefault({
				ru: "Будьте первым, кто поделится своим мнением",
				en: "Be the first to share your opinion",
			}),
			formTitle: createPhotonLocalizedDefault({
				ru: "Оставить отзыв",
				en: "Leave a review",
			}),
			formBodyPlaceholder: createPhotonLocalizedDefault({
				ru: "Отзыв ...",
				en: "Review ...",
			}),
			formNamePlaceholder: createPhotonLocalizedDefault({
				ru: "Имя",
				en: "Name",
			}),
			formEmailPlaceholder: "Email",
			formSubmitLabel: createPhotonLocalizedDefault({
				ru: "Опубликовать",
				en: "Publish",
			}),
			adminReplyLabel: createPhotonLocalizedDefault({
				ru: "Ответ администратора",
				en: "Admin reply",
			}),
			reviews: [],
		},
		fields: [
			{
				path: "reviews",
				label: "Reviews",
				kind: "repeater",
				localization: "localized",
				itemLabelPath: "clientName",
				addLabel: "Add review",
				fields: [
					{ path: "clientName", label: "Client name", kind: "text" },
					{ path: "rating", label: "Rating", kind: "number" },
					{ path: "createdAt", label: "Created at", kind: "text" },
					{ path: "body", label: "Body", kind: "textarea" },
					{ path: "adminReply", label: "Admin reply", kind: "textarea" },
				],
			},
		],
	},
);
