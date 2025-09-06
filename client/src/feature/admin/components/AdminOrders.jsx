import { useEffect, useState } from "react";
import { PAGINATION_LIMIT } from "../../../app/constants";
import { useDispatch, useSelector } from "react-redux";
import AdminPagination from "./AdminPagination";
import {
	fetchAllOrdersAsync,
	selectAllOrders,
	selectTotalOrderItems,
	selectTotalOrderPages,
} from "../../order/orderSlice";

export default function AdminOrders() {
	const [appliedFilter, setAppliedFilter] = useState([]);
	const [page, setPage] = useState(1);
	const [appliedPagination, setAppliedPagination] = useState({
		_page: page,
		_per_page: PAGINATION_LIMIT,
	});
	const [appliedSort, setAppliedSort] = useState({});
	const dispatch = useDispatch();
	const orders = useSelector(selectAllOrders);
	const totalItems = useSelector(selectTotalOrderItems);
	const totalPages = useSelector(selectTotalOrderPages);

	function handlePagination(page) {
		const new_pagination = {
			_page: page,
			_per_page: PAGINATION_LIMIT,
		};
		dispatch(
			fetchAllOrdersAsync({
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
			fetchAllOrdersAsync({
				appliedFilter,
				appliedSort,
				appliedPagination,
			})
		);
	}, []);

	return (
		<>
			<div className="overflow-x-hidden">
				<div className="min-w-screen min-h-screen flex pt-10 justify-center bg-gray-100 font-sans overflow-hidden">
					<div className="w-[90%] mx-auto">
						<div className="bg-white shadow-md rounded my-6">
							<table className="min-w-max w-full table-auto">
								<thead>
									<tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
										<th className="py-3 px-6 text-left">
											Id
										</th>
										<th className="py-3 px-6 text-left">
											Items
										</th>
										<th className="py-3 px-6 text-center">
											Price
										</th>
										<th className="py-3 px-6 text-center">
											Address
										</th>
										<th className="py-3 px-6 text-center">
											Status
										</th>
										<th className="py-3 px-6 text-center">
											Action
										</th>
									</tr>
								</thead>
								<tbody className="text-gray-600 text-sm font-light">
									{orders.map((order, idx) => (
										<tr
											key={idx}
											className="border-b border-gray-200 hover:bg-gray-100"
										>
											<td className="py-3 px-6 text-left whitespace-nowrap">
												#{order.id}
											</td>
											<td className="py-3 px-6 text-left">
												{order.total_item_count}
											</td>
											<td className="py-3 px-6 text-center">
												{order.total_price}
											</td>
											<td className="py-3 px-6 text-center">
												<div>
													{`${order.deliveryAddress.city}, ${order.deliveryAddress.state}`}
												</div>
											</td>
											<td className="py-3 px-6 text-center">
												<span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">
													Active
												</span>
											</td>
											<td className="py-3 px-6 text-center">
												<div className="flex item-center justify-center">
													<div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															fill="none"
															viewBox="0 0 24 24"
															stroke="currentColor"
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																strokeWidth={2}
																d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
															/>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																strokeWidth={2}
																d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
															/>
														</svg>
													</div>
													<div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															fill="none"
															viewBox="0 0 24 24"
															stroke="currentColor"
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																strokeWidth={2}
																d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
															/>
														</svg>
													</div>
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
							<AdminPagination
								page={page}
								handlePagination={handlePagination}
								pagination_limit={PAGINATION_LIMIT}
								totalItems={totalItems}
								totalPages={totalPages}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
