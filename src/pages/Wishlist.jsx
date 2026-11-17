import { Heart, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import { restaurants } from '../data/catalog';
import RestaurantCard from '../components/common/RestaurantsCard';
import { useWishlist } from '../hooks/WishlistContext';

const Wishlist = () => {
	const { wishlistIds, removeFromWishlist, clearWishlist } = useWishlist();
	const navigate = useNavigate();

	const wishlistRestaurants = restaurants.filter(restaurant =>
		wishlistIds.includes(restaurant.id),
	);

	// TODO: only one details page exists for now (/restaurants/:id later)
	const handleViewDetails = () => navigate('/restaurants/taza-041');

	return (
		<div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
			<section className="mx-auto max-w-2xl py-8 text-center md:py-20">
				<h1 className="mt-6">
					My{' '}
					<span className="font-logo logo-gradient text-[1.3em]">
						Wishlist...
					</span>
				</h1>

				<p className="mt-5 leading-8 text-muted">
					All your favorite restaurants, gathered in one place.
				</p>
			</section>

			<div className=" flex items-center justify-between gap-4">
				<p className="text-sm text-[grey]">
					Showing{' '}
					<span className="font-bold text-ink">
						{wishlistRestaurants.length}
					</span>{' '}
					{wishlistRestaurants.length === 1 ? 'restaurant' : 'restaurants'}
				</p>

				{wishlistRestaurants.length > 0 && (
					<button
						type="button"
						onClick={clearWishlist}
						className="cursor-pointer text-sm font-semibold text-primary hover:text-primary-hover underline-offset-4 border-b border-transparent hover:border-primary transition font-blod"
					>
						Clear wishlist
					</button>
				)}
			</div>

			{wishlistRestaurants.length > 0 ? (
				<div className="mt-5 grid grid-cols-1 gap-5 min-[451px]:grid-cols-2 min-[791px]:grid-cols-3 min-[1024px]:grid-cols-4">
					{wishlistRestaurants.map(restaurant => (
						<RestaurantCard
							key={restaurant.id}
							restaurant={restaurant}
							isFavorite
							onToggleFavorite={r => removeFromWishlist(r.id)}
							onViewDetails={handleViewDetails}
						/>
					))}
				</div>
			) : (
				<div className="mt-5 rounded-card border border-line bg-surface px-4 py-16 text-center shadow-card">
					<span className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
						<Heart size={30} />
					</span>
					<h2 className="mt-5 text-xl text-ink">Your wishlist is empty</h2>
					<p className="mt-2 text-sm text-[grey]">
						Explore our restaurants and save the ones you love.
					</p>
					<Link to="/restaurants" className="btn btn-primary mt-5 no-underline">
						<ShoppingBag size={20} />
						Browse restaurants
					</Link>
				</div>
			)}
		</div>
	);
};

export default Wishlist;
