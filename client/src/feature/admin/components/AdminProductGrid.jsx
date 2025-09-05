import { Link } from "react-router";
import { StarIcon } from "@heroicons/react/20/solid";
import { useDispatch } from "react-redux";
import { deleteProductAsync } from "../../product/productSlice";

export default function AdminProductGrid({ products, loadState }) {
	const dispatch = useDispatch();

	if (loadState.toLowerCase() == "loading") return <h1>Loading</h1>;

	function handleProductRemove(e, productId) {
		e.preventDefault();
		e.stopPropagation();
		dispatch(deleteProductAsync(productId));
		alert("Product Deleted Successfully");
		// todo: trigger pagination update, currently pagination isn't getting updated after product delete.
	}
	return products.length == 0 ? (
		<h2>Products not available</h2>
	) : (
		<>
			<div className="mb-10">
				<div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
					<div className="flex justify-end items-center">
						<Link
							to="/admin/product/add"
							className="inline-flex items-center gap-1 text-sm bg-blue-800 text-white px-4 py-1 rounded-md mb-5 "
						>
							Add Product
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
								className="lucide lucide-plus-icon lucide-plus"
							>
								<path d="M5 12h14" />
								<path d="M12 5v14" />
							</svg>
						</Link>
					</div>
					<div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
						{products &&
							products.map((product) => (
								<div key={product.id}>
									<div className="group relative">
										<div className="z-10 translate-x-6 opacity-0 transition-translate duration-400 group-hover:-translate-x-2 group-hover:opacity-100 absolute top-2 right-2 flex flex-col gap-2">
											<Link
												to={`product-details/${product.id}`}
												className="flex items-center gap-2 bg-yellow-700 text-white rounded p-1"
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
													className="lucide lucide-eye-icon lucide-eye"
												>
													<path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
													<circle
														cx="12"
														cy="12"
														r="3"
													/>
												</svg>
											</Link>
											<Link
												to={`/admin/product/edit/${product.id}`}
												className="flex items-center gap-2 bg-teal-900 text-white rounded p-1"
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
													className="lucide lucide-file-pen-line-icon lucide-file-pen-line"
												>
													<path d="m18 5-2.414-2.414A2 2 0 0 0 14.172 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2" />
													<path d="M21.378 12.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
													<path d="M8 18h1" />
												</svg>
											</Link>
											<button
												onClick={(e) =>
													handleProductRemove(
														e,
														product.id
													)
												}
												className="flex items-center gap-2 bg-pink-800 text-white rounded p-1"
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
													className="lucide lucide-trash2-icon lucide-trash-2"
												>
													<path d="M10 11v6" />
													<path d="M14 11v6" />
													<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
													<path d="M3 6h18" />
													<path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
												</svg>
											</button>
										</div>
										<img
											alt="product Image"
											src={product.thumbnail}
											className="aspect-square w-full rounded-md bg-gray-200 object-cover lg:aspect-auto lg:h-60"
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
								</div>
							))}
					</div>
				</div>
			</div>
		</>
	);
}
