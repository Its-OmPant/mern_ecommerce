import Pagination from "./Pagination";
import { Link } from "react-router";
import Data from "../../../../mock_data.json";
import { StarIcon } from "@heroicons/react/20/solid";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
	fetchAllProductsAsync,
	getAllProducts,
	getLoadingState,
} from "../productSlice";

// const products = Data.products;

export default function AllProducts() {
	const products = useSelector(getAllProducts);
	const isLoading = useSelector(getLoadingState);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchAllProductsAsync());
	}, []);

	if (isLoading.toLowerCase() == "loading") return <h1>Loading</h1>;

	return products.length == 0 ? (
		<h2>Products not available</h2>
	) : (
		<>
			<div className="bg-white mb-10">
				<div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
					<div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
						{products.map((product) => (
							<Link to="product-details" key={product.id}>
								<div className="group relative">
									<img
										alt="product Image"
										src={product.thumbnail}
										className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-60"
									/>
									<div className="mt-4 flex justify-between">
										<div>
											<h3 className="text-sm text-gray-700">
												{product.title}
											</h3>

											<p className="text-sm font-medium text-gray-900">
												$ {product.price}
											</p>
										</div>
										<p className="mt-1 text-sm text-gray-500 flex gap-1">
											<StarIcon className="w-4 h-4" />{" "}
											{product.rating}
										</p>
									</div>
								</div>
							</Link>
						))}
					</div>
				</div>
			</div>
			<Pagination />
		</>
	);
}
