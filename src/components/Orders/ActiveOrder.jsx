import {
	Clock,
	Bike,
	Pizza,
	Navigation,
	Check,
	Star,
	Phone,
	MessageSquare,
	FileText,
	HelpCircle,
	Info,
	Ban,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import OrderStepper from './OrderStepper';
import LiveMap from './LiveMap';
import { toActiveView, money, cardCls, downloadInvoice } from './ordersData';
import { cancelOrder } from '../../services/ordersService';

export default function ActiveOrder({ order }) {
	if (!order) {
		return (
			<section className={cardCls}>
				<div className="px-6 py-14 text-center">
					<Bike className="mx-auto size-10 text-muted" />
					<h2 className="mt-4 text-xl font-extrabold text-ink">
						No active orders right now
					</h2>
					<p className="mt-2 text-sm text-muted">
						When you place an order, live tracking will appear here.
					</p>
					<Link to="/restaurants" className="btn btn-primary mt-5 no-underline">
						Browse restaurants
					</Link>
				</div>
			</section>
		);
	}

	const o = toActiveView(order);

	const handleCancel = () => {
		if (!window.confirm('Cancel this order? This cannot be undone.')) return;
		cancelOrder(order.id);
	};

	return (
		<section>
			{/* Title + status pill */}
			<div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
				<h2 className="flex items-center gap-3 text-2xl font-extrabold text-ink">
					<span className="size-3 rounded-full bg-primary animate-pulse" />
					Live Delivery in Progress
				</h2>
				<div className="flex flex-wrap items-center gap-2">
					<span className="flex w-fit items-center gap-2 rounded-full border border-tertiary/20 bg-tertiary/10 px-4 py-1.5 text-xs font-semibold text-tertiary">
						<Clock className="size-4" />
						On Schedule ● {o.arriving}
					</span>
					{order.status === 'preparing' && (
						<button
							type="button"
							onClick={handleCancel}
							className="flex w-fit cursor-pointer items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary/10"
						>
							<Ban className="size-3.5" />
							Cancel Order
						</button>
					)}
				</div>
			</div>

			<div className={`${cardCls} overflow-hidden`}>
				{/* Top strip */}
				<div className="flex flex-col gap-3 border-b border-line bg-primary/5 p-5 sm:flex-row sm:items-center sm:justify-between">
					<div className="flex items-center gap-4">
						<div className="grid size-12 place-items-center rounded-xl bg-surface text-primary shadow-sm">
							<Pizza className="size-6" />
						</div>
						<div>
							<h3 className="flex flex-wrap items-center gap-2 font-bold text-ink">
								{o.restaurant}
								<span className="rounded bg-secondary/20 px-2 py-0.5 text-[10px] font-semibold text-ink">
									{o.tag}
								</span>
							</h3>
							<p className="text-xs text-muted">
								Order {o.number} • Placed at {o.placedAt} •{' '}
								<span className="text-primary">
									Estimated Delivery: {o.eta}
								</span>
							</p>
						</div>
					</div>

					<div className="flex items-center gap-2 rounded-lg border border-line bg-surface px-4 py-2">
						<Bike className="size-5 text-primary" />
						<div className="text-xs">
							<p className="text-[10px] text-muted">Delivery Partner</p>
							<p className="font-semibold text-ink">{o.partner}</p>
						</div>
					</div>
				</div>

				<OrderStepper steps={o.steps} />

				{/* Map + items */}
				<div className="grid border-t border-line lg:grid-cols-[1.15fr_1fr]">
					{/* Left: map + courier */}
					<div className="p-5">
						<div className="mb-3 flex items-center justify-between">
							<h3 className="flex items-center gap-2 font-bold text-ink">
								<Navigation className="size-5 text-primary" /> Courier Live
								Route
							</h3>
							<span className="rounded-full bg-tertiary/10 px-3 py-1 text-[11px] font-semibold text-tertiary">
								Speed: {o.speed} • {o.distance}
							</span>
						</div>

						<LiveMap destination={o.destination} />

						<div className="mt-4 flex flex-col gap-3 rounded-xl border border-line bg-page p-4 sm:flex-row sm:items-center sm:justify-between">
							<div className="flex items-center gap-3">
								<div className="relative">
									<div className="grid size-12 place-items-center rounded-full bg-ink text-surface text-sm font-bold">
										{o.courier.initials}
									</div>
									<span className="absolute -bottom-0.5 -right-0.5 grid size-4 place-items-center rounded-full bg-tertiary text-white">
										<Check className="size-3" />
									</span>
								</div>
								<div>
									<p className="flex items-center gap-2 font-bold text-ink">
										{o.courier.name}
										<span className="flex items-center gap-0.5 text-xs font-semibold text-muted">
											<Star className="size-3 fill-secondary text-secondary" />
											{o.courier.rating}
										</span>
									</p>
									<p className="text-[11px] text-muted">
										{o.courier.vehicle} • Plate {o.courier.plate}
									</p>
								</div>
							</div>

							<div className="flex gap-2">
								<button className="flex items-center gap-2 rounded-lg border border-line bg-surface px-4 py-2 text-xs font-semibold text-ink hover:bg-page">
									<Phone className="size-3.5 text-primary" /> Call Driver
								</button>
								<button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-bold text-white hover:bg-primary-hover">
									<MessageSquare className="size-3.5" /> Send Message
								</button>
							</div>
						</div>
					</div>

					{/* Right: items + totals */}
					<div className="border-t border-line p-5 lg:border-l lg:border-t-0">
						<div className="mb-4 flex items-center justify-between">
							<h3 className="font-bold text-ink">
								Order Items ({o.items.length})
							</h3>
							<span className="text-xs text-muted">
								Subtotal: {money(o.subtotal)}
							</span>
						</div>

						<div className="space-y-4">
							{o.items.map(it => (
								<div key={it.name} className="flex items-center gap-3">
									<img
										src={it.img}
										alt={it.name}
										className="size-14 shrink-0 rounded-xl bg-page object-cover"
									/>
									<div className="min-w-0 flex-1">
										<p className="text-base font-bold text-ink">{it.name}</p>
										<p className="mt-0.5 text-xs text-muted">{it.desc}</p>
										<p className="mt-0.5 text-xs font-semibold text-primary">
											Qty: {it.qty}
										</p>
									</div>
									<p className="text-base font-extrabold text-ink">
										{money(it.price)}
									</p>
								</div>
							))}
						</div>

						<div className="mt-5 space-y-2.5 border-t border-line pt-4 text-xs text-muted">
							<div className="flex items-center justify-between gap-3">
								<span className="min-w-0 truncate">
									Delivery Fee ({o.partner})
								</span>
								<span
									className={
										o.deliveryFee
											? 'shrink-0 text-sm font-semibold text-ink'
											: 'shrink-0 text-sm font-semibold text-tertiary'
									}
								>
									{o.deliveryFee ? money(o.deliveryFee) : 'FREE'}
								</span>
							</div>
							<div className="flex items-center justify-between gap-3">
								<span>Taxes &amp; Service Fees</span>
								<span className="shrink-0 text-sm font-semibold text-ink">
									{money(o.fees)}
								</span>
							</div>
						</div>

						<div className="mt-3 flex items-center justify-between border-t border-line pt-3">
							<span className="font-bold text-ink">Total Paid</span>
							<span className="text-xl font-extrabold text-primary">
								{money(o.total)}
							</span>
						</div>

						<div className="mt-3 flex items-center justify-between text-[11px] font-medium">
							<button
								onClick={() => downloadInvoice(order)}
								className="flex items-center gap-1.5 text-muted hover:text-ink"
							>
								<FileText className="size-3.5" /> Download Invoice
							</button>
							<button className="flex items-center gap-1.5 text-primary hover:underline">
								<HelpCircle className="size-3.5" /> Order Help &amp; Issues
							</button>
						</div>
					</div>
				</div>

				{/* Delivery note */}
				<div className="flex items-center justify-between gap-3 border-t border-line bg-primary/5 px-5 py-3 text-[11px] text-muted">
					<p className="flex items-center gap-2">
						<Info className="size-4 text-primary" />
						Delivery Note: "{o.note}"
					</p>
					<button className="shrink-0 font-semibold text-primary hover:underline">
						Edit Instructions
					</button>
				</div>
			</div>
		</section>
	);
}
