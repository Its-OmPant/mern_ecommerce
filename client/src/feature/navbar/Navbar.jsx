import React from "react";

import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
	Menu,
	MenuButton,
	MenuItem,
	MenuItems,
} from "@headlessui/react";

import {
	Bars3Icon,
	ShoppingCartIcon,
	XMarkIcon,
} from "@heroicons/react/24/outline";

import { Link } from "react-router";
import { useSelector } from "react-redux";
import { selectCartItems } from "../cart/cartSlice";
import { selectLoggedInUser } from "../user/userSlice";

const navigation = [
	{ name: "Home", to: "/", current: true },
	{ name: "About", to: "/about", current: false },
];

const menu_items = [
	{
		name: "My Profile",
		to: "/profile",
	},
	{
		name: "My Orders",
		to: "/orders",
	},
	{
		name: "Signout",
		to: "/signout",
	},
];
function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

function Navbar() {
	const user = useSelector(selectLoggedInUser);
	const allCartItems = useSelector(selectCartItems);
	const cartItems = allCartItems.filter((i) => i.user_id === user.id);

	return (
		<Disclosure
			as="nav"
			className="relative bg-gray-800 dark:bg-gray-800/50 dark:after:pointer-events-none dark:after:absolute dark:after:inset-x-0 dark:after:bottom-0 dark:after:h-px dark:after:bg-white/10"
		>
			<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
				<div className="relative flex h-16 items-center justify-between">
					<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
						{/* Mobile menu button*/}
						<DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500">
							<span className="absolute -inset-0.5" />
							<span className="sr-only">Open main menu</span>
							<Bars3Icon
								aria-hidden="true"
								className="block size-6 group-data-open:hidden"
							/>
							<XMarkIcon
								aria-hidden="true"
								className="hidden size-6 group-data-open:block"
							/>
						</DisclosureButton>
					</div>
					<div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
						<div className="hidden sm:ml-6 sm:block">
							<div className="flex space-x-4">
								{navigation.map((item) => (
									<Link
										key={item.name}
										to={item.to}
										aria-current={
											item.current ? "page" : undefined
										}
										className={classNames(
											item.current
												? "bg-gray-900 text-white dark:bg-gray-950/50"
												: "text-gray-300 hover:bg-white/5 hover:text-white",
											"rounded-md px-3 py-2 text-sm font-medium"
										)}
									>
										{item.name}
									</Link>
								))}
							</div>
						</div>
					</div>
					<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
						<Link to="/cart">
							<button
								type="button"
								className="relative rounded-full p-1 mx-3 text-gray-400 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500 dark:hover:text-white"
							>
								<span className="absolute -inset-1.5" />
								<div className="relative">
									{cartItems?.length > 0 && (
										<span className="absolute -top-3 left-4 inline-flex items-center rounded-md bg-yellow-400/10 px-2 py-1 text-xs font-medium text-yellow-400 inset-ring inset-ring-red-400/20">
											{cartItems.length}
										</span>
									)}
									<ShoppingCartIcon
										aria-hidden="true"
										className="size-6 relative"
									/>
								</div>
							</button>
						</Link>

						{/* Profile dropdown */}
						<Menu as="div" className="relative ml-3">
							<MenuButton className="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
								<span className="absolute -inset-1.5" />
								<span className="sr-only">Open user menu</span>
								<img
									alt=""
									src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
									className="size-8 rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10"
								/>
							</MenuButton>

							<MenuItems
								transition
								className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg outline outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in dark:bg-gray-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10"
							>
								{menu_items.map((item, idx) => (
									<MenuItem key={idx}>
										<Link
											to={item.to}
											className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden dark:text-gray-300 dark:data-focus:bg-white/5"
										>
											{item.name}
										</Link>
									</MenuItem>
								))}
							</MenuItems>
						</Menu>
					</div>
				</div>
			</div>

			<DisclosurePanel className="sm:hidden">
				<div className="space-y-1 px-2 pt-2 pb-3">
					{navigation.map((item) => (
						<DisclosureButton
							key={item.name}
							as="a"
							href={item.href}
							aria-current={item.current ? "page" : undefined}
							className={classNames(
								item.current
									? "bg-gray-900 text-white dark:bg-gray-950/50"
									: "text-gray-300 hover:bg-white/5 hover:text-white",
								"block rounded-md px-3 py-2 text-base font-medium"
							)}
						>
							{item.name}
						</DisclosureButton>
					))}
				</div>
			</DisclosurePanel>
		</Disclosure>
	);
}

export default Navbar;
