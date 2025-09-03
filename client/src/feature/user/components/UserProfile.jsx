import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router";
import { selectLoggedInUser, updateUserAsync } from "../userSlice";

export default function UserProfile() {
	const user = useSelector(selectLoggedInUser);
	const dispatch = useDispatch();

	function handleAddressRemove(e, idx) {
		e.preventDefault();
		let updated_user = {
			...user,
			addresses: [...user.addresses],
		};
		updated_user.addresses.splice(idx, 1);
		dispatch(updateUserAsync(updated_user));
		alert("Successfully Deleted");
	}

	return (
		<div className="bg-white">
			<div className="w-full m-2 sm:max-w-3xl mx-auto py-10">
				<h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-3xl">
					My Profile
				</h1>
				<div className="my-4">
					<div className="flex justify-between items-center">
						<span className="text-lg font-semibold text-pink-900">
							Saved Addresses
						</span>
						<Link
							to="/profile/address/add"
							className="relative group"
						>
							<span className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-300 absolute -top-6 left-1/2 -translate-x-1/2 text-xs bg-blue-900 text-white p-1 rounded-md">
								Add
							</span>
							<button>
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
									className="lucide lucide-badge-plus-icon lucide-badge-plus"
								>
									<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
									<line x1="12" x2="12" y1="8" y2="16" />
									<line x1="8" x2="16" y1="12" y2="12" />
								</svg>
							</button>
						</Link>
					</div>
					{user?.addresses?.length > 0 ? (
						user.addresses.map((add, idx) => (
							<div
								key={idx}
								className="flex flex-col gap-1 basis-full bg-slate-100 my-3 px-6 py-4 rounded-md"
							>
								<div className="flex gap-10 relative">
									<div className="absolute top-1 right-4 flex gap-2 items-baseline">
										<div className="relative group">
											<span className="invisible pointer-events-none opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-300 absolute -top-5 left-1/2 -translate-x-1/2 text-xs bg-teal-900 text-white px-1 rounded-md">
												Edit
											</span>
											<Link
												to={`/profile/address/edit/${idx}`}
											>
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
													className="lucide lucide-file-pen-line-icon lucide-file-pen-line text-teal-900"
												>
													<path d="m18 5-2.414-2.414A2 2 0 0 0 14.172 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2" />
													<path d="M21.378 12.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
													<path d="M8 18h1" />
												</svg>
											</Link>
										</div>
										<div className="relative group">
											<span className="invisible pointer-events-none opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-300 absolute -top-5 left-1/2 -translate-x-1/2 text-xs bg-red-700 text-white px-1 rounded-md">
												Delete
											</span>
											<button
												onClick={(e) =>
													handleAddressRemove(e, idx)
												}
											>
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
													className="lucide lucide-trash2-icon lucide-trash-2 text-red-800"
												>
													<path d="M10 11v6" />
													<path d="M14 11v6" />
													<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
													<path d="M3 6h18" />
													<path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
												</svg>
											</button>
										</div>
									</div>
									<span className="text-black font-semibold">
										{add.fullName}
									</span>
									<span className="text-slate-500 inline-flex items-center gap-2">
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
											className="lucide lucide-mail-icon lucide-mail"
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
										{add.email}
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
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
												className="lucide lucide-phone-icon lucide-phone"
											>
												<path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
											</svg>
											{add.phoneNo}
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
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="lucide lucide-map-pin-icon lucide-map-pin"
									>
										<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
										<circle cx="12" cy="10" r="3" />
									</svg>
									{`${add.address}, ${add.city}, ${add.state}, ${add.country}, ${add.pinCode}`}
								</span>
							</div>
						))
					) : (
						<p className="text-center my-10 text-red-400">
							No Addresses Saved
						</p>
					)}
				</div>
			</div>
		</div>
	);
}
