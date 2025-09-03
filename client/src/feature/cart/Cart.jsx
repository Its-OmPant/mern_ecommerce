import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import {
	removeCartItemAsync,
	selectCartItems,
	updateCartAsync,
} from "./cartSlice";
import { selectLoggedInUser } from "../user/userSlice";

export default function Cart() {
	const user = useSelector(selectLoggedInUser);
	const allCartItems = useSelector(selectCartItems);
	const cartItems = allCartItems.filter((i) => i.user_id === user.id);
	const dispatch = useDispatch();
	const items_total_price = cartItems
		.reduce((total, item) => total + item.price * item.quantity, 0)
		.toFixed(2);

	const total_item_count = cartItems.reduce(
		(acc, item) => item.quantity + acc,
		0
	);

	function handleQuantityChange(e, item) {
		const action = e.target.value;

		if (action === "-") {
			if (item.quantity > 1) {
				dispatch(
					updateCartAsync({ ...item, quantity: item.quantity - 1 })
				);
			} else {
				console.log(
					"can't decrease quantity further Please remove the Item"
				);
			}
		} else if (action === "+") {
			dispatch(updateCartAsync({ ...item, quantity: item.quantity + 1 }));
		} else {
			console.log("Invalid Operation");
			return;
		}
	}

	function handleItemRemove(e, itemId) {
		dispatch(removeCartItemAsync(itemId));
	}
	return (
		<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<h1 className="text-2xl mt-10 mb-4 px-6 font-medium text-gray-900">
				Shopping Cart
			</h1>
			{cartItems?.length > 0 ? (
				<>
					<div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
						<div className="mt-8">
							<div className="flow-root">
								<ul
									role="list"
									className="-my-6 divide-y divide-gray-200"
								>
									{cartItems.map((item) => (
										<li key={item.id} className="flex py-6">
											<div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
												<img
													alt={item.title}
													src={item.thumbnail}
													className="size-full object-cover"
												/>
											</div>

											<div className="ml-4 flex flex-1 flex-col">
												<div>
													<div className="flex justify-between text-base font-medium text-gray-900">
														<h3>{item.title}</h3>
														<p className="ml-4">
															{item.price}
														</p>
													</div>
													<p className="mt-1 text-sm text-gray-500 inline-flex gap-1 items-center">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="16"
															height="16"
															viewBox="0 0 24 24"
															fill="none"
															stroke="currentColor"
															strokeWidth="2"
															strokeLinecap="round"
															strokeLinejoin="round"
															className="lucide lucide-star-icon lucide-star"
														>
															<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
														</svg>
														{item.rating}
													</p>
												</div>
												<div className="flex flex-1 items-end justify-between text-sm">
													<div className="text-gray-500 flex flex-col gap-2">
														<span>Quantity</span>
														<div className="flex gap-3">
															{item.quantity >
																1 && (
																<button
																	className="px-2 bg-slate-200 cursor-pointer"
																	value="-"
																	onClick={(
																		e
																	) =>
																		handleQuantityChange(
																			e,
																			item
																		)
																	}
																>
																	-
																</button>
															)}
															<span>
																{item.quantity}
															</span>
															<button
																className="px-2 bg-slate-200 cursor-pointer"
																value="+"
																onClick={(e) =>
																	handleQuantityChange(
																		e,
																		item
																	)
																}
															>
																+
															</button>
														</div>
													</div>

													<div className="flex">
														<button
															type="button"
															className="font-medium text-indigo-600 hover:text-indigo-500"
															onClick={(e) =>
																handleItemRemove(
																	e,
																	item.id
																)
															}
														>
															Remove
														</button>
													</div>
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
							<p>Total Items</p>
							<p>{total_item_count}</p>
						</div>
						<div className="flex justify-between text-base font-medium text-gray-900">
							<p>Subtotal</p>
							<p>${items_total_price}</p>
						</div>
						<p className="mt-0.5 text-sm text-gray-500">
							Shipping and taxes calculated at checkout.
						</p>
						<div className="mt-6">
							<Link
								to="/checkout"
								className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700"
							>
								Checkout
							</Link>
						</div>
						<div className="mt-6 flex justify-center text-center text-sm text-gray-500">
							<p>
								or{" "}
								<Link to="/">
									<button
										type="button"
										className="font-medium text-indigo-600 hover:text-indigo-500"
									>
										Continue Shopping
										<span aria-hidden="true"> &rarr;</span>
									</button>
								</Link>
							</p>
						</div>
					</div>
				</>
			) : (
				<p className="text-slate-600 px-6 mt-20 text-center">
					No Items added to cart
				</p>
			)}
		</div>
	);
}
