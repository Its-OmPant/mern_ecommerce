import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../cart/cartSlice";
import { useState } from "react";
import {
	selectCurrentUser,
	selectUserAddresses,
	updateUserAsync,
} from "../auth/authSlice";

export default function Checkout() {
	const dispatch = useDispatch();
	const user = useSelector(selectCurrentUser);
	const userSavedAddresses = useSelector(selectUserAddresses);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const allCartItems = useSelector(selectCartItems);
	const cartItems = allCartItems.filter((i) => i.user_id === user.id);
	const items_total_price = cartItems
		.reduce((total, item) => total + item.price * item.quantity, 0)
		.toFixed(2);

	const total_item_count = cartItems.reduce(
		(acc, item) => item.quantity + acc,
		0
	);
	const [selectedTab, setSelectedTab] = useState(0);

	const [paymentMethod, setPaymentMethod] = useState("cash");
	const [selectedAddress, setSelectedAddress] = useState(0);

	function handleTabChange(e) {
		e.preventDefault();

		setSelectedTab((s) => (s == 0 ? 1 : 0));
	}

	function handleFormSubmission(data, e) {
		e.preventDefault();
		dispatch(
			updateUserAsync({ ...user, addresses: [...user.addresses, data] })
		);
		reset();
	}

	function handlePaymentMethodChange(e) {
		setPaymentMethod(e.target.value);
	}

	function handleAddressSelection(e) {
		console.log(e.target.value);
		setSelectedAddress(+e.target.value);
	}

	return (
		<div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
			<div className="w-full grid lg:grid-cols-5">
				{/* User Info Form */}
				<form
					className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 col-span-3 w-full"
					onSubmit={handleSubmit(handleFormSubmission)}
				>
					<div className="border-b border-gray-900/10 pb-3 dark:border-white/10">
						<h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
							Personal Information
						</h2>
						<p className="mt-1 text-sm/6 text-gray-600 dark:text-gray-400">
							Use a permanent address where you can receive mail.
						</p>
						{/* tabs */}
						<div className="bg-slate-200 flex mt-6 rounded-md text-sm">
							<button
								className={`w-1/2 p-2 rounded-md text-black/60 ${
									selectedTab === 0
										? "bg-slate-300 outline-1 outline-slate-400 text-black/90"
										: ""
								}`}
								onClick={(e) => handleTabChange(e)}
								value={0}
							>
								Add new address
							</button>
							<button
								className={`w-1/2 p-2 rounded-md text-black/60 ${
									selectedTab === 1
										? "bg-slate-300 outline-1 outline-slate-400 text-black/90"
										: ""
								}`}
								onClick={(e) => handleTabChange(e)}
								value={1}
							>
								Select from existing addresses
							</button>
						</div>

						{selectedTab === 0 ? (
							// tab 1 content
							<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
								<div className="sm:col-span-3">
									<label
										htmlFor="fullName"
										className="block text-sm/6 font-medium text-gray-900 dark:text-white"
									>
										Full name
									</label>
									<div className="mt-2">
										<input
											id="fullName"
											name="fullName"
											type="text"
											{...register("fullName", {
												required:
													"Full Name is required",
											})}
											className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
										/>
									</div>
									{errors?.fullName && (
										<p className="text-sm text-red-500 my-1">
											{errors.fullName.message}
										</p>
									)}
								</div>

								<div className="sm:col-span-3">
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
											type="text"
											{...register("email", {
												required: "email is required",
												pattern: {
													value: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
													message:
														"email should be valid",
												},
											})}
											className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
										/>
									</div>
									{errors?.email && (
										<p className="text-sm text-red-500 my-1">
											{errors.email.message}
										</p>
									)}
								</div>

								<div className="sm:col-span-4">
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
											{...register("address", {
												required:
													"Street Address is required",
											})}
											className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
										/>
									</div>
									{errors?.address && (
										<p className="text-sm text-red-500 my-1">
											{errors.address.message}
										</p>
									)}
								</div>

								<div className="sm:col-span-2">
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
											{...register("city", {
												required: "City is required",
											})}
											className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
										/>
									</div>
									{errors?.city && (
										<p className="text-sm text-red-500 my-1">
											{errors.city.message}
										</p>
									)}
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
											id="state"
											name="state"
											type="text"
											{...register("state", {
												required: "State is required",
											})}
											className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
										/>
									</div>
									{errors?.state && (
										<p className="text-sm text-red-500 my-1">
											{errors.state.message}
										</p>
									)}
								</div>

								<div className="sm:col-span-2">
									<label
										htmlFor="pinCode"
										className="block text-sm/6 font-medium text-gray-900 dark:text-white"
									>
										ZIP / Postal code
									</label>
									<div className="mt-2">
										<input
											id="pinCode"
											name="pinCode"
											type="text"
											{...register("pinCode", {
												required:
													"Pin Code is required",
											})}
											className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
										/>
									</div>
									{errors?.pinCode && (
										<p className="text-sm text-red-500 my-1">
											{errors.pinCode.message}
										</p>
									)}
								</div>
								<div className="sm:col-span-2">
									<label
										htmlFor="country"
										className="block text-sm/6 font-medium text-gray-900 dark:text-white"
									>
										Country
									</label>
									<div className="mt-2">
										<input
											id="country"
											name="country"
											type="text"
											defaultValue={"India"}
											{...register("country", {
												required: "Country is required",
											})}
											className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
										/>
									</div>
									{errors?.country && (
										<p className="text-sm text-red-500 my-1">
											{errors.country.message}
										</p>
									)}
								</div>
								<div className="mb-3 flex items-center justify-end gap-x-6 sm:col-span-6">
									<button
										type="button"
										className="text-sm/6 font-semibold text-gray-900 dark:text-white"
										onClick={() => reset()}
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
						) : (
							// Tab 2 content
							<div className="mt-10 space-y-2">
								{userSavedAddresses?.length > 1 ? (
									<fieldset className="w">
										<legend className="text-sm/6 font-semibold text-gray-900 dark:text-white">
											Choose from existing address
										</legend>
										<div className="mt-6 space-y-6">
											{userSavedAddresses.map(
												(add, idx) => (
													<div className="flex gap-x-4">
														<input
															id={add + idx}
															name="address"
															type="radio"
															value={idx}
															onChange={
																handleAddressSelection
															}
															checked={
																selectedAddress ===
																idx
															}
															className="flex-none relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 dark:border-white/10 dark:bg-white/5 dark:checked:border-indigo-500 dark:checked:bg-indigo-500 dark:focus-visible:outline-indigo-500 dark:disabled:border-white/5 dark:disabled:bg-white/10 dark:disabled:before:bg-white/20 forced-colors:appearance-auto forced-colors:before:hidden"
														/>
														<label
															htmlFor={add + idx}
															className="grow text-sm/6 text-gray-600 dark:text-white"
														>
															<div className="flex flex-col gap-1 basis-full">
																<div className="flex gap-10">
																	<span className="text-black font-semibold">
																		{
																			add.fullName
																		}
																	</span>
																	<span className="text-slate-500 inline-flex items-center gap-2">
																		<svg
																			xmlns="http://www.w3.org/2000/svg"
																			width="16"
																			height="16"
																			viewBox="0 0 24 24"
																			fill="none"
																			stroke="currentColor"
																			stroke-width="2"
																			stroke-linecap="round"
																			stroke-linejoin="round"
																			class="lucide lucide-mail-icon lucide-mail"
																		>
																			<path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
																			<rect
																				x="2"
																				y="4"
																				width="20"
																				height="16"
																				rx="2"
																			/>
																		</svg>
																		{
																			add.email
																		}
																	</span>
																	{add.phoneNo && (
																		<span className="text-slate-500 inline-flex items-center gap-2">
																			<svg
																				xmlns="http://www.w3.org/2000/svg"
																				width="16"
																				height="16"
																				viewBox="0 0 24 24"
																				fill="none"
																				stroke="currentColor"
																				stroke-width="2"
																				stroke-linecap="round"
																				stroke-linejoin="round"
																				class="lucide lucide-phone-icon lucide-phone"
																			>
																				<path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
																			</svg>
																			{
																				add.phoneNo
																			}
																		</span>
																	)}
																</div>

																<span className="text-slate-500 inline-flex items-center gap-2">
																	<svg
																		xmlns="http://www.w3.org/2000/svg"
																		width="16"
																		height="16"
																		viewBox="0 0 24 24"
																		fill="none"
																		stroke="currentColor"
																		stroke-width="2"
																		stroke-linecap="round"
																		stroke-linejoin="round"
																		class="lucide lucide-map-pin-icon lucide-map-pin"
																	>
																		<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
																		<circle
																			cx="12"
																			cy="10"
																			r="3"
																		/>
																	</svg>
																	{`${add.address}, ${add.city}, ${add.state}, ${add.country}, ${add.pinCode}`}
																</span>
															</div>
														</label>
													</div>
												)
											)}
										</div>
									</fieldset>
								) : (
									<p>
										No saved addresses found. Please add an
										address to choose from
									</p>
								)}
							</div>
						)}
					</div>

					<div className="border-b border-gray-900/10 pb-12 dark:border-white/10">
						<div className="mt-10 space-y-10">
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
											value="cash"
											checked={paymentMethod === "cash"}
											onChange={handlePaymentMethodChange}
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
											value="card"
											checked={paymentMethod === "card"}
											onChange={handlePaymentMethodChange}
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
					<h1 className="text-2xl mt-10 mb-4 px-6 font-medium text-gray-900">
						Cart Summary
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
												<li
													key={item.id}
													className="flex py-6"
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
																<h3>
																	{item.title}
																</h3>
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
														<div className="text-gray-500 flex flex-col gap-2 text-sm">
															<span>
																Quantity:{" "}
																{item.quantity}
															</span>
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
								<div className="mt-6">
									<Link
										to="/pay"
										className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700"
									>
										Pay
									</Link>
								</div>
								<div className="mt-6 flex justify-center text-center text-sm text-gray-500">
									<p>
										or{" "}
										<Link to="/cart">
											<button
												type="button"
												className="font-medium text-indigo-600 hover:text-indigo-500"
											>
												go back to cart
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
			</div>
		</div>
	);
}
