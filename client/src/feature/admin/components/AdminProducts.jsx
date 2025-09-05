import { useEffect, useState } from "react";
import {
	Dialog,
	DialogBackdrop,
	DialogPanel,
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
	Menu,
	MenuButton,
	MenuItem,
	MenuItems,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
	ChevronDownIcon,
	FunnelIcon,
	MinusIcon,
	PlusIcon,
	Squares2X2Icon,
} from "@heroicons/react/20/solid";
import AdminProductGrid from "./AdminProductGrid";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchAllFiltersAsync,
	fetchAllProductByFiltersAsync,
	fetchSortingOptionsAsync,
	selectTotalItems,
	selectTotalPages,
	selectAllProducts,
	selectLoadingState,
	selectAllFilters,
	selectAllSortOptions,
} from "../../product/productSlice";
import AdminPagination from "./AdminPagination";
import { PAGINATION_LIMIT } from "../../../app/constants";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

function AdminProducts() {
	const products = useSelector(selectAllProducts);
	const loadState = useSelector(selectLoadingState);
	const totalItems = useSelector(selectTotalItems);
	const totalPages = useSelector(selectTotalPages);
	const filters = useSelector(selectAllFilters);
	const sortOptions = useSelector(selectAllSortOptions);

	const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
	const [appliedFilter, setAppliedFilter] = useState([]);
	const [page, setPage] = useState(1);
	const [appliedPagination, setAppliedPagination] = useState({
		_page: page,
		_per_page: PAGINATION_LIMIT,
	});
	const [appliedSort, setAppliedSort] = useState({});

	const dispatch = useDispatch();

	function handleFilterChange(e, section, option) {
		let fl = [];
		if (e.target.checked) {
			fl = [...appliedFilter, { [section.id]: option }];
		} else {
			fl = appliedFilter.filter((obj) => obj[section.id] !== option);
		}

		// not working correctly for multiple values due to mock json
		// TODO: create API to support multiple filters
		// console.log(fl);
		setAppliedFilter(fl);
		dispatch(
			fetchAllProductByFiltersAsync({
				appliedFilter: fl,
				appliedSort,
				appliedPagination,
			})
		);
	}

	function handleSort(e, sortOptionObject) {
		const new_sort = {
			_sort: sortOptionObject._sort,
		};
		setAppliedSort(new_sort);
		dispatch(
			fetchAllProductByFiltersAsync({
				appliedFilter,
				appliedSort: new_sort,
				appliedPagination: {
					_page: 1, // reseting page to 1, actual state updates are handled below in useEffect
					_per_page: PAGINATION_LIMIT,
				},
			})
		);
	}

	function handlePagination(page) {
		const new_pagination = {
			_page: page,
			_per_page: PAGINATION_LIMIT,
		};
		dispatch(
			fetchAllProductByFiltersAsync({
				appliedFilter,
				appliedSort,
				appliedPagination: new_pagination,
			})
		);
		setAppliedPagination(new_pagination);
		setPage(page);
	}

	useEffect(() => {
		dispatch(
			fetchAllProductByFiltersAsync({
				appliedFilter,
				appliedSort,
				appliedPagination,
			})
		);
	}, []);

	// resetting pagination, everytime filter changes or sort happens
	useEffect(() => {
		setPage(1);
		setAppliedPagination(() => {
			return {
				_page: 1,
				_per_page: PAGINATION_LIMIT,
			};
		});
	}, [appliedFilter, appliedSort]);

	useEffect(() => {
		dispatch(fetchAllFiltersAsync());
		dispatch(fetchSortingOptionsAsync());
	}, []);

	return (
		<div className="bg-white">
			<MobileFilters
				filters={filters}
				mobileFiltersOpen={mobileFiltersOpen}
				setMobileFiltersOpen={setMobileFiltersOpen}
				handleFilterChange={handleFilterChange}
			/>
			<main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex items-baseline justify-between border-b border-gray-200 pt-10 pb-6 sm:pt-16">
					<h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
						All Products
					</h1>

					<div className="flex items-center">
						<Menu
							as="div"
							className="relative inline-block text-left"
						>
							<MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
								Sort
								<ChevronDownIcon
									aria-hidden="true"
									className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
								/>
							</MenuButton>

							<MenuItems
								transition
								className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
							>
								<div className="py-1">
									{sortOptions && sortOptions.length > 1 ? (
										sortOptions.map((option) => (
											<MenuItem key={option.name}>
												<p
													onClick={(e) =>
														handleSort(e, option)
													}
													className={classNames(
														option.current
															? "font-medium text-gray-900"
															: "text-gray-500",
														"block px-4 py-2 text-sm data-focus:bg-gray-100 data-focus:outline-hidden"
													)}
												>
													{option.name}
												</p>
											</MenuItem>
										))
									) : (
										<h3 className="m-2">
											Sort Options Unavailable
										</h3>
									)}
								</div>
							</MenuItems>
						</Menu>
						<button
							type="button"
							onClick={() => setMobileFiltersOpen(true)}
							className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
						>
							<span className="sr-only">Filters</span>
							<FunnelIcon aria-hidden="true" className="size-5" />
						</button>
					</div>
				</div>

				<section aria-labelledby="products-heading" className="pt-6">
					<div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
						<DesktopFilters
							filters={filters}
							handleFilterChange={handleFilterChange}
						/>
						<div className="lg:col-span-3">
							<AdminProductGrid
								products={products}
								loadState={loadState}
							/>
						</div>
					</div>
				</section>
				<AdminPagination
					page={page}
					handlePagination={handlePagination}
					pagination_limit={PAGINATION_LIMIT}
					totalItems={totalItems}
					totalPages={totalPages}
				/>
			</main>
		</div>
	);
}

function MobileFilters({
	filters = { filters },
	mobileFiltersOpen,
	setMobileFiltersOpen,
	handleFilterChange,
}) {
	return (
		<Dialog
			open={mobileFiltersOpen}
			onClose={setMobileFiltersOpen}
			className="relative z-40 lg:hidden"
		>
			<DialogBackdrop
				transition
				className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
			/>

			<div className="fixed inset-0 z-40 flex">
				<DialogPanel
					transition
					className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white pt-4 pb-6 shadow-xl transition duration-300 ease-in-out data-closed:translate-x-full"
				>
					<div className="flex items-center justify-between px-4">
						<h2 className="text-lg font-medium text-gray-900">
							Filters
						</h2>
						<button
							type="button"
							onClick={() => setMobileFiltersOpen(false)}
							className="relative -mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
						>
							<span className="absolute -inset-0.5" />
							<span className="sr-only">Close menu</span>
							<XMarkIcon aria-hidden="true" className="size-6" />
						</button>
					</div>

					{/* Filters */}
					<form className="mt-4 border-t border-gray-200">
						{filters && filters.length > 1 ? (
							filters.map((section) => (
								<Disclosure
									key={section.id}
									as="div"
									className="border-t border-gray-200 px-4 py-6"
								>
									<h3 className="-mx-2 -my-3 flow-root">
										<DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
											<span className="font-medium text-gray-900">
												{section.name}
											</span>
											<span className="ml-6 flex items-center">
												<PlusIcon
													aria-hidden="true"
													className="size-5 group-data-open:hidden"
												/>
												<MinusIcon
													aria-hidden="true"
													className="size-5 group-not-data-open:hidden"
												/>
											</span>
										</DisclosureButton>
									</h3>
									<DisclosurePanel className="pt-6">
										<div className="space-y-6">
											{section.options.map(
												(option, optionIdx) => (
													<div
														key={option.value}
														className="flex gap-3"
													>
														<div className="flex h-5 shrink-0 items-center">
															<div className="group grid size-4 grid-cols-1">
																<input
																	defaultValue={
																		option.value
																	}
																	id={`filter-mobile-${section.id}-${optionIdx}`}
																	name={`${section.id}[]`}
																	type="checkbox"
																	onChange={(
																		e
																	) =>
																		handleFilterChange(
																			e,
																			section,
																			option.value
																		)
																	}
																	className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
																/>
																<svg
																	fill="none"
																	viewBox="0 0 14 14"
																	className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
																>
																	<path
																		d="M3 8L6 11L11 3.5"
																		strokeWidth={
																			2
																		}
																		strokeLinecap="round"
																		strokeLinejoin="round"
																		className="opacity-0 group-has-checked:opacity-100"
																	/>
																	<path
																		d="M3 7H11"
																		strokeWidth={
																			2
																		}
																		strokeLinecap="round"
																		strokeLinejoin="round"
																		className="opacity-0 group-has-indeterminate:opacity-100"
																	/>
																</svg>
															</div>
														</div>
														<label
															htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
															className="min-w-0 flex-1 text-gray-500"
														>
															{option.label}
														</label>
													</div>
												)
											)}
										</div>
									</DisclosurePanel>
								</Disclosure>
							))
						) : (
							<h3 className="m-3">No Filters Available</h3>
						)}
					</form>
				</DialogPanel>
			</div>
		</Dialog>
	);
}

function DesktopFilters({ filters = { filters }, handleFilterChange }) {
	return (
		<form className="hidden lg:block">
			{filters && filters.length > 1 ? (
				filters.map((section) => (
					<Disclosure
						key={section.id}
						as="div"
						className="border-b border-gray-200 py-6"
					>
						<h3 className="-my-3 flow-root">
							<DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
								<span className="font-medium text-gray-900">
									{section.name}
								</span>
								<span className="ml-6 flex items-center">
									<PlusIcon
										aria-hidden="true"
										className="size-5 group-data-open:hidden"
									/>
									<MinusIcon
										aria-hidden="true"
										className="size-5 group-not-data-open:hidden"
									/>
								</span>
							</DisclosureButton>
						</h3>
						<DisclosurePanel className="pt-6">
							<div className="space-y-4">
								{section.options.map((option, optionIdx) => (
									<div
										key={option.value}
										className="flex gap-3"
									>
										<div className="flex h-5 shrink-0 items-center">
											<div className="group grid size-4 grid-cols-1">
												<input
													defaultValue={option.value}
													defaultChecked={
														option.checked
													}
													id={`filter-${section.id}-${optionIdx}`}
													name={`${section.id}[]`}
													type="checkbox"
													onChange={(e) =>
														handleFilterChange(
															e,
															section,
															option.value
														)
													}
													className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
												/>
												<svg
													fill="none"
													viewBox="0 0 14 14"
													className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
												>
													<path
														d="M3 8L6 11L11 3.5"
														strokeWidth={2}
														strokeLinecap="round"
														strokeLinejoin="round"
														className="opacity-0 group-has-checked:opacity-100"
													/>
													<path
														d="M3 7H11"
														strokeWidth={2}
														strokeLinecap="round"
														strokeLinejoin="round"
														className="opacity-0 group-has-indeterminate:opacity-100"
													/>
												</svg>
											</div>
										</div>
										<label
											htmlFor={`filter-${section.id}-${optionIdx}`}
											className="text-sm text-gray-600"
										>
											{option.label}
										</label>
									</div>
								))}
							</div>
						</DisclosurePanel>
					</Disclosure>
				))
			) : (
				<h3>No Filters Available</h3>
			)}
		</form>
	);
}

export default AdminProducts;
