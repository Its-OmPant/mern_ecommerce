import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

export default function AdminPagination({
	page,
	handlePagination,
	totalItems,
	totalPages,
	pagination_limit,
}) {
	let startItemNo = (page - 1) * pagination_limit + 1;
	let endItemNo =
		page * pagination_limit > totalItems
			? totalItems
			: page * pagination_limit;

	let items_arr = Array.from({
		length: totalPages,
	});

	function handlePreviousClick() {
		if (page > 1) handlePagination(page - 1);
	}

	function handleNextClick() {
		if (page < totalPages) handlePagination(page + 1);
	}

	return (
		<div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
			<div className="w-full flex flex-col gap-2 sm:hidden">
				<p className="text-sm text-gray-700 text-center">
					Showing <span className="font-medium">{startItemNo}</span>{" "}
					to <span className="font-medium">{endItemNo}</span> of{" "}
					<span className="font-medium">{totalItems}</span> results
				</p>
				<div className="flex flex-1 justify-between sm:hidden">
					<p
						onClick={handlePreviousClick}
						className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
					>
						Previous
					</p>
					<p
						onClick={handleNextClick}
						className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
					>
						Next
					</p>
				</div>
			</div>
			<div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
				<div>
					<p className="text-sm text-gray-700">
						Showing{" "}
						<span className="font-medium">{startItemNo}</span> to{" "}
						<span className="font-medium">{endItemNo}</span> of{" "}
						<span className="font-medium">{totalItems}</span>{" "}
						results
					</p>
				</div>
				<div>
					<nav
						aria-label="Pagination"
						className="isolate inline-flex -space-x-px rounded-md shadow-xs"
					>
						<p
							onClick={handlePreviousClick}
							className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 inset-ring inset-ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
						>
							<span className="sr-only">Previous</span>
							<ChevronLeftIcon
								aria-hidden="true"
								className="size-5"
							/>
						</p>
						{items_arr.map((_, index) => (
							<button
								key={index}
								aria-current={
									page === index + 1 ? "page" : undefined
								}
								className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 ${
									page === index + 1
										? "bg-indigo-600 text-white"
										: "bg-white text-gray-700 hover:bg-gray-50 inset-ring inset-ring-gray-300"
								}`}
								onClick={() => handlePagination(index + 1)}
							>
								{index + 1}
							</button>
						))}
						<p
							onClick={handleNextClick}
							className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 inset-ring inset-ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
						>
							<span className="sr-only">Next</span>
							<ChevronRightIcon
								aria-hidden="true"
								className="size-5"
							/>
						</p>
					</nav>
				</div>
			</div>
		</div>
	);
}
