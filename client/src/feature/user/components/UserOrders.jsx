import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserOrdersAsync, selectUserOrders } from "../userSlice";
import { selectCurrentUser } from "../../auth/authSlice";
import Collapsible from "../../../components/Collapsible";

export default function UserOrders() {
	const dispatch = useDispatch();
	const user = useSelector(selectCurrentUser);
	const userOrders = useSelector(selectUserOrders);

	useEffect(() => {
		dispatch(fetchUserOrdersAsync(user.id));
	}, [dispatch, user.id]);

	return (
		<div className="bg-white">
			<div className="w-full m-2 sm:max-w-3xl mx-auto py-10">
				<h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-3xl">
					My Orders
				</h1>

				<div className="my-6">
					{userOrders?.length > 0 ? (
						userOrders.map((order) => (
							<div className="bg-slate-100 my-3 px-6 py-3 rounded-md">
								<div className="flex justify-between">
									<h4 className="text-xl font-semibold">
										Order #{order.id}
									</h4>
									<span className="inline-flex items-center gap-1 text-teal-700">
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
											className="lucide lucide-circle-dollar-sign-icon lucide-circle-dollar-sign"
										>
											<circle cx="12" cy="12" r="10" />
											<path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
											<path d="M12 18V6" />
										</svg>{" "}
										{order?.paymentMethod}
									</span>
								</div>
								<p className="text-green-800 text-sm">
									Status: {order?.status}
								</p>
								<p className="text-sm text-green-800">
									Address:{" "}
									{`${order.deliveryAddress?.address}, ${order.deliveryAddress?.city}, ${order.deliveryAddress?.state}, ${order.deliveryAddress?.pinCode}, ${order.deliveryAddress?.country}`}
								</p>
								<Collapsible
									title="Items"
									wrapperClasses="my-2"
									childWrapperClasses=""
									className="py-2"
								>
									{order.cartItems?.map((item) => (
										<li
											key={item.id}
											className="flex py-6 px-4 bg-white my-3"
										>
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
															$ {item.price}
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
													<div className="text-gray-500">
														<span>Quantity</span>{" "}
														{item.quantity}
													</div>
												</div>
											</div>
										</li>
									))}
								</Collapsible>
							</div>
						))
					) : (
						<p>No Orders Yet</p>
					)}
				</div>
			</div>
		</div>
	);
}
