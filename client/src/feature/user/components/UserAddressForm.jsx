import { useForm } from "react-hook-form";
import { useParams, Link, Navigate, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser, updateUserAsync } from "../userSlice";

export default function UserAddressForm() {
	const { verb, idx } = useParams();
	const navigator = useNavigate();
	const dispatch = useDispatch();
	const {
		register,
		reset,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm();
	const user = useSelector(selectLoggedInUser);

	if (verb == "edit" && idx) {
		const address = user.addresses[idx];
		setValue("fullName", address.fullName);
		setValue("email", address.email);
		setValue("address", address.address);
		setValue("city", address.city);
		setValue("state", address.state);
		setValue("pinCode", address.pinCode);
	}

	function handleFormSubmission(data, e) {
		e.preventDefault();
		if (verb == "add") {
			dispatch(
				updateUserAsync({
					...user,
					addresses: [...user.addresses, data],
				})
			);
			reset();
			navigator("/profile");
			alert("Address Added Successfully");
		} else if (verb == "edit") {
			let updated_user = {
				...user,
				addresses: [...user.addresses],
			};
			updated_user.addresses.splice(idx, 1, data);
			dispatch(updateUserAsync(updated_user));
			reset();
			navigator("/profile");
			alert("Address Updated Successfully");
		}
	}

	if (verb == "add" || verb == "edit") {
		return (
			<div className="bg-white">
				<div className="w-full m-2 sm:max-w-3xl mx-auto py-10">
					<h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-3xl">
						<Link to="/profile">My Profile</Link>{" "}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="40"
							height="30"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="4"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="lucide lucide-chevron-right-icon lucide-chevron-right text-xl inline"
						>
							<path d="m9 18 6-6-6-6" />
						</svg>{" "}
						{verb[0].toUpperCase() + verb.slice(1)} Address
					</h1>
					<form onSubmit={handleSubmit(handleFormSubmission)}>
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
											required: "Full Name is required",
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
											required: "Pin Code is required",
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
								{verb == "add" ? (
									<button
										type="button"
										className="text-sm/6 font-semibold text-gray-900 dark:text-white"
										onClick={() => reset()}
									>
										Reset
									</button>
								) : (
									<button
										type="button"
										className="text-sm/6 font-semibold text-gray-900 dark:text-white"
										onClick={() => navigator("/profile")}
									>
										Cancel
									</button>
								)}
								<button
									type="submit"
									className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:shadow-none dark:focus-visible:outline-indigo-500"
								>
									{verb == "add"
										? "Add Address"
										: "Edit Address"}
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		);
	} else {
		return <Navigate to="/404" />;
	}
}
