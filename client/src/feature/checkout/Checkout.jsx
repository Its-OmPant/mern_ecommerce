import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { Link } from "react-router";

const products = [
	{
		id: 1,
		name: "Throwback Hip Bag",
		href: "#",
		color: "Salmon",
		price: "$90.00",
		quantity: 1,
		imageSrc:
			"https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
		imageAlt:
			"Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
	},
	{
		id: 2,
		name: "Medium Stuff Satchel",
		href: "#",
		color: "Blue",
		price: "$32.00",
		quantity: 1,
		imageSrc:
			"https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
		imageAlt:
			"Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
	},
	{
		id: 3,
		name: "Zip Tote Basket",
		href: "#",
		color: "White and black",
		price: "$140.00",
		quantity: 1,
		imageSrc:
			"https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-03.jpg",
		imageAlt:
			"Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.",
	},
];

export default function Checkout() {
	return (
		<div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
			<div className="w-full grid lg:grid-cols-5">
				<form className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 col-span-3">
					<div className="border-b border-gray-900/10 pb-12 dark:border-white/10">
						<h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
							Personal Information
						</h2>
						<p className="mt-1 text-sm/6 text-gray-600 dark:text-gray-400">
							Use a permanent address where you can receive mail.
						</p>

						<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
							<div className="sm:col-span-3">
								<label
									htmlFor="first-name"
									className="block text-sm/6 font-medium text-gray-900 dark:text-white"
								>
									First name
								</label>
								<div className="mt-2">
									<input
										id="first-name"
										name="first-name"
										type="text"
										autoComplete="given-name"
										className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
									/>
								</div>
							</div>

							<div className="sm:col-span-3">
								<label
									htmlFor="last-name"
									className="block text-sm/6 font-medium text-gray-900 dark:text-white"
								>
									Last name
								</label>
								<div className="mt-2">
									<input
										id="last-name"
										name="last-name"
										type="text"
										autoComplete="family-name"
										className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
									/>
								</div>
							</div>

							<div className="sm:col-span-4">
								<label
									htmlFor="email"
									className="block text-sm/6 font-medium text-gray-900 dark:text-white"
								>
									Email address
								</label>
								<div className="mt-2">
									<input
										id="email"
										name="email"
										type="email"
										autoComplete="email"
										className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
									/>
								</div>
							</div>

							<div className="sm:col-span-3">
								<label
									htmlFor="country"
									className="block text-sm/6 font-medium text-gray-900 dark:text-white"
								>
									Country
								</label>
								<div className="mt-2 grid grid-cols-1">
									<select
										id="country"
										name="country"
										autoComplete="country-name"
										className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:*:bg-gray-800 dark:focus:outline-indigo-500"
									>
										<option>United States</option>
										<option>Canada</option>
										<option>Mexico</option>
									</select>
									<ChevronDownIcon
										aria-hidden="true"
										className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4 dark:text-gray-400"
									/>
								</div>
							</div>

							<div className="col-span-full">
								<label
									htmlFor="street-address"
									className="block text-sm/6 font-medium text-gray-900 dark:text-white"
								>
									Street address
								</label>
								<div className="mt-2">
									<input
										id="street-address"
										name="street-address"
										type="text"
										autoComplete="street-address"
										className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
									/>
								</div>
							</div>

							<div className="sm:col-span-2 sm:col-start-1">
								<label
									htmlFor="city"
									className="block text-sm/6 font-medium text-gray-900 dark:text-white"
								>
									City
								</label>
								<div className="mt-2">
									<input
										id="city"
										name="city"
										type="text"
										autoComplete="address-level2"
										className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
									/>
								</div>
							</div>

							<div className="sm:col-span-2">
								<label
									htmlFor="region"
									className="block text-sm/6 font-medium text-gray-900 dark:text-white"
								>
									State / Province
								</label>
								<div className="mt-2">
									<input
										id="region"
										name="region"
										type="text"
										autoComplete="address-level1"
										className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
									/>
								</div>
							</div>

							<div className="sm:col-span-2">
								<label
									htmlFor="postal-code"
									className="block text-sm/6 font-medium text-gray-900 dark:text-white"
								>
									ZIP / Postal code
								</label>
								<div className="mt-2">
									<input
										id="postal-code"
										name="postal-code"
										type="text"
										autoComplete="postal-code"
										className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
									/>
								</div>
							</div>
							<div className="mt-6 flex items-center justify-end gap-x-6 sm:col-span-6">
								<button
									type="button"
									className="text-sm/6 font-semibold text-gray-900 dark:text-white"
								>
									Reset
								</button>
								<button
									type="submit"
									className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:shadow-none dark:focus-visible:outline-indigo-500"
								>
									Add Address
								</button>
							</div>
						</div>
					</div>

					<div className="border-b border-gray-900/10 pb-12 dark:border-white/10">
						<div className="mt-10 space-y-10">
							<fieldset>
								<legend className="text-sm/6 font-semibold text-gray-900 dark:text-white">
									Address
								</legend>
								<p className="text-gray-700 text-sm">
									Choose from existing address
								</p>
								<div className="mt-6 space-y-6">
									<div className="flex items-center gap-x-3">
										<input
											id="address1"
											name="address"
											type="radio"
											className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 dark:border-white/10 dark:bg-white/5 dark:checked:border-indigo-500 dark:checked:bg-indigo-500 dark:focus-visible:outline-indigo-500 dark:disabled:border-white/5 dark:disabled:bg-white/10 dark:disabled:before:bg-white/20 forced-colors:appearance-auto forced-colors:before:hidden"
										/>
										<label
											htmlFor="address1"
											className="block text-sm/6 text-gray-600 dark:text-white"
										>
											11th Street, Park West Avenue,
											london UK
										</label>
									</div>
									<div className="flex items-center gap-x-3">
										<input
											id="address2"
											name="address"
											type="radio"
											className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 dark:border-white/10 dark:bg-white/5 dark:checked:border-indigo-500 dark:checked:bg-indigo-500 dark:focus-visible:outline-indigo-500 dark:disabled:border-white/5 dark:disabled:bg-white/10 dark:disabled:before:bg-white/20 forced-colors:appearance-auto forced-colors:before:hidden"
										/>
										<label
											htmlFor="address2"
											className="block text-sm/6 text-gray-600 dark:text-white"
										>
											255 Aldwych, The Waldorf Hilton,
											Greater London, London, UK
										</label>
									</div>
								</div>
							</fieldset>

							<fieldset>
								<legend className="text-sm/6 font-semibold text-gray-900 dark:text-white">
									Payment Method
								</legend>
								<p className="mt-1 text-sm/6 text-gray-600 dark:text-gray-400">
									Select a payment method
								</p>
								<div className="mt-6 space-y-6">
									<div className="flex items-center gap-x-3">
										<input
											id="cash"
											name="payments"
											type="radio"
											className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 dark:border-white/10 dark:bg-white/5 dark:checked:border-indigo-500 dark:checked:bg-indigo-500 dark:focus-visible:outline-indigo-500 dark:disabled:border-white/5 dark:disabled:bg-white/10 dark:disabled:before:bg-white/20 forced-colors:appearance-auto forced-colors:before:hidden"
										/>
										<label
											htmlFor="cash"
											className="block text-sm/6 text-gray-600 dark:text-white"
										>
											By Cash
										</label>
									</div>
									<div className="flex items-center gap-x-3">
										<input
											id="card"
											name="payments"
											type="radio"
											className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 dark:border-white/10 dark:bg-white/5 dark:checked:border-indigo-500 dark:checked:bg-indigo-500 dark:focus-visible:outline-indigo-500 dark:disabled:border-white/5 dark:disabled:bg-white/10 dark:disabled:before:bg-white/20 forced-colors:appearance-auto forced-colors:before:hidden"
										/>
										<label
											htmlFor="card"
											className="block text-sm/6 text-gray-600 dark:text-white"
										>
											By Card
										</label>
									</div>
								</div>
							</fieldset>
						</div>
					</div>
				</form>
				{/* cart summary components */}
				<div className="col-span-2">
					<div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 ">
						<h1 className="text-2xl my-2 font-medium text-gray-900">
							Cart Summary
						</h1>

						<div className="mt-8">
							<div className="flow-root">
								<ul
									role="list"
									className="-my-6 divide-y divide-gray-200"
								>
									{products.map((product) => (
										<li
											key={product.id}
											className="flex py-6"
										>
											<div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
												<img
													alt={product.imageAlt}
													src={product.imageSrc}
													className="size-full object-cover"
												/>
											</div>

											<div className="ml-4 flex flex-1 flex-col">
												<div>
													<div className="flex justify-between text-base font-medium text-gray-900">
														<h3>
															<a
																href={
																	product.href
																}
															>
																{product.name}
															</a>
														</h3>
														<p className="ml-4">
															{product.price}
														</p>
													</div>
													<p className="mt-1 text-sm text-gray-500">
														{product.color}
													</p>
													<p className="mt-1 text-sm text-gray-500">
														Quantity:{" "}
														{product.quantity}
													</p>
												</div>
											</div>
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>

					<div className="border-t border-gray-200 px-4 py-6 sm:px-6">
						<div className="flex justify-between text-base font-medium text-gray-900">
							<p>Subtotal</p>
							<p>$262.00</p>
						</div>
						<p className="mt-0.5 text-sm text-gray-500">
							Inclusive of all Taxes.
						</p>
						<div className="mt-6">
							<Link
								to="/pay"
								className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700"
							>
								Pay and Order
							</Link>
						</div>
						<div className="mt-6 flex justify-center text-center text-sm text-gray-500">
							<p>
								wanna add more items ?{" "}
								<Link to="/cart">
									<button
										type="button"
										className="font-medium text-indigo-600 hover:text-indigo-500"
									>
										go to cart
									</button>
								</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
