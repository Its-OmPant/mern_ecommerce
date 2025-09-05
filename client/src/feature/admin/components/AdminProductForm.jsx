import { useForm } from "react-hook-form";
import { useParams, Link, Navigate, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
	addProductAsync,
	selectAllBrands,
	selectAllCategories,
	selectProductById,
	updateProductAsync,
} from "../../product/productSlice";

export default function AdminProductForm() {
	const { verb, id } = useParams();
	const navigator = useNavigate();
	const dispatch = useDispatch();
	const allBrands = useSelector(selectAllBrands);
	const allCategories = useSelector(selectAllCategories);
	const selectedProduct = useSelector(selectProductById(id));
	const {
		register,
		reset,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm();

	if (verb == "edit" && id) {
		setValue("title", selectedProduct.title);
		setValue("description", selectedProduct.description);
		setValue("category", selectedProduct.category);
		setValue("brand", selectedProduct.brand);
		setValue("price", selectedProduct.price);
		setValue("discountPercentage", selectedProduct.discountPercentage);
		setValue("stock", selectedProduct.stock);
		setValue("image", selectedProduct.images[0] ?? "");
		setValue("thumbnail", selectedProduct.thumbnail);
	}

	function handleFormSubmission(data, e) {
		e.preventDefault();
		const prdSchema = {
			title: "",
			description: "",
			category: "",
			price: 0,
			discountPercentage: 0,
			rating: 0,
			stock: 0,
			tags: [""],
			brandLabel: "",
			brand: "",
			sku: "",
			weight: "N/A",
			dimensions: {
				width: "N/A",
				height: "N/A",
				depth: "N/A",
			},
			warrantyInformation: "N/A",
			shippingInformation: "N/A",
			availabilityStatus: "N/A",
			reviews: [],
			returnPolicy: "No return policy",
			minimumOrderQuantity: 1,
			meta: {
				createdAt: "",
				updatedAt: "",
				barcode: "",
				qrCode: "",
			},
			images: [],
			thumbnail: "",
		};
		if (verb == "add") {
			const product = { ...prdSchema, images: [] };
			product.title = data.title;
			product.description = data.description;
			product.category = data.category;
			product.brandLabel = data.brand;
			product.brand = data.brand.trim().toLowerCase().replace(" ", "-");
			product.price = +data.price;
			product.discountPercentage = +data.discountPercentage;
			product.stock = +data.stock;
			product.images.push(data.image);
			product.thumbnail = data.thumbnail;

			dispatch(addProductAsync(product));
			reset();
			alert("Product Added Successfully");
			navigator("/admin");
		} else if (verb == "edit") {
			const product = { ...prdSchema, images: [] };
			product.title = data.title;
			product.description = data.description;
			product.category = data.category;
			product.brandLabel = data.brand;
			product.brand = data.brand.trim().toLowerCase().replace(" ", "-");
			product.price = +data.price;
			product.discountPercentage = +data.discountPercentage;
			product.stock = +data.stock;
			product.images.push(data.image);
			product.thumbnail = data.thumbnail;
			product.id = id;
			dispatch(updateProductAsync(product));
			reset();
			alert("Product Updated Successfully");
			navigator("/admin");
		}
	}

	if (verb == "add" || verb == "edit") {
		return (
			<div className="bg-white">
				<div className="w-full m-2 sm:max-w-3xl mx-auto py-10">
					<h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-3xl">
						<Link to="/admin">Dashboard</Link>{" "}
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
						{verb[0].toUpperCase() + verb.slice(1)} Product
					</h1>
					<form onSubmit={handleSubmit(handleFormSubmission)}>
						<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
							{/* Title Input */}
							<div className="sm:col-span-full">
								<label
									htmlFor="title"
									className="block text-sm/6 font-medium text-gray-900 dark:text-white"
								>
									Product Title
								</label>
								<div className="mt-2">
									<input
										id="title"
										name="title"
										type="text"
										{...register("title", {
											required:
												"Product Title is required",
										})}
										className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
									/>
								</div>
								{errors?.title && (
									<p className="text-sm text-red-500 my-1">
										{errors.title.message}
									</p>
								)}
							</div>
							{/* Description Input */}
							<div className="sm:col-span-full">
								<label
									htmlFor="description"
									className="block text-sm/6 font-medium text-gray-900 dark:text-white"
								>
									Product Description
								</label>
								<div className="mt-2">
									<textarea
										rows={2}
										id="description"
										name="description"
										type="text"
										{...register("description", {
											required:
												"Product Description is required",
										})}
										className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
									/>
								</div>
								{errors?.description && (
									<p className="text-sm text-red-500 my-1">
										{errors.description.message}
									</p>
								)}
							</div>
							{/* Image Input */}
							<div className="sm:col-span-3">
								<label
									htmlFor="image"
									className="block text-sm/6 font-medium text-gray-900 dark:text-white"
								>
									Image URL
								</label>
								<div className="mt-2">
									<input
										id="image"
										name="image"
										type="text"
										{...register("image", {
											required: "Image URL is required",
										})}
										className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
									/>
								</div>
								{errors?.image && (
									<p className="text-sm text-red-500 my-1">
										{errors.image.message}
									</p>
								)}
							</div>
							{/* thumbnail Input */}
							<div className="sm:col-span-3">
								<label
									htmlFor="thumbnail"
									className="block text-sm/6 font-medium text-gray-900 dark:text-white"
								>
									Thumbnail URL
								</label>
								<div className="mt-2">
									<input
										id="thumbnail"
										name="thumbnail"
										type="text"
										{...register("thumbnail", {
											required:
												"Thumbnail URL is required",
										})}
										className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
									/>
								</div>
								{errors?.thumbnail && (
									<p className="text-sm text-red-500 my-1">
										{errors.thumbnail.message}
									</p>
								)}
							</div>
							{/* Price Input */}
							<div className="sm:col-span-2">
								<label
									htmlFor="price"
									className="block text-sm/6 font-medium text-gray-900 dark:text-white"
								>
									Price
								</label>
								<div className="mt-2">
									<input
										id="price"
										name="price"
										step="0.01"
										type="number"
										{...register("price", {
											required: "Price is required",
											min: 0,
										})}
										className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
									/>
								</div>
								{errors?.price && (
									<p className="text-sm text-red-500 my-1">
										{errors.price.message}
									</p>
								)}
							</div>
							{/* Discount Percentage Input */}
							<div className="sm:col-span-2">
								<label
									htmlFor="discountPercentage"
									className="block text-sm/6 font-medium text-gray-900 dark:text-white"
								>
									Discount Percentage
								</label>
								<div className="mt-2">
									<input
										id="discountPercentage"
										name="discountPercentage"
										step="0.01"
										type="number"
										{...register("discountPercentage", {
											required:
												"Discount Percentage is required",
											min: 0,
											max: 100,
										})}
										className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
									/>
								</div>
								{errors?.discountPercentage && (
									<p className="text-sm text-red-500 my-1">
										{errors.discountPercentage.message}
									</p>
								)}
							</div>
							{/* Stock Input */}
							<div className="sm:col-span-2">
								<label
									htmlFor="stock"
									className="block text-sm/6 font-medium text-gray-900 dark:text-white"
								>
									Stock
								</label>
								<div className="mt-2">
									<input
										id="stock"
										name="stock"
										step="0.01"
										type="number"
										{...register("stock", {
											required: "stock is required",
											min: 1,
										})}
										className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
									/>
								</div>
								{errors?.stock && (
									<p className="text-sm text-red-500 my-1">
										{errors.stock.message}
									</p>
								)}
							</div>

							{/* brand input */}
							<div className="sm:col-span-3">
								<label
									htmlFor="brand"
									className="block text-sm/6 font-medium text-gray-900 dark:text-white"
								>
									Brand
								</label>
								<div className="mt-2">
									<select
										{...register("brand", {
											required: "Brand Is Required",
										})}
										className="outline-1 outline-gray-300 rounded-sm text-sm px-3 py-1 w-full"
										id="brand"
									>
										<option value="">
											-- Select Brand
										</option>

										{allBrands.map(
											(b, idx) =>
												b && (
													<option key={idx} value={b}>
														{(
															b[0].toUpperCase() +
															b.slice(1)
														).replace("-", " ")}
													</option>
												)
										)}
									</select>
								</div>
								{errors?.brand && (
									<p className="text-sm text-red-500 my-1">
										{errors.brand.message}
									</p>
								)}
							</div>
							{/* category input */}
							<div className="sm:col-span-3">
								<label
									htmlFor="category"
									className="block text-sm/6 font-medium text-gray-900 dark:text-white"
								>
									Category
								</label>
								<div className="mt-2">
									<select
										{...register("category", {
											required: "Category Is Required",
										})}
										className="outline-1 outline-gray-300 rounded-sm text-sm px-3 py-1 w-full"
										id="category"
									>
										<option value="">
											-- Select Category
										</option>
										{allCategories.map(
											(c, idx) =>
												c && (
													<option key={idx} value={c}>
														{(
															c[0].toUpperCase() +
															c.slice(1)
														).replace("-", " ")}
													</option>
												)
										)}
									</select>
								</div>
								{errors?.category && (
									<p className="text-sm text-red-500 my-1">
										{errors.category.message}
									</p>
								)}
							</div>

							<div className="mb-3 flex items-center justify-end gap-x-6 sm:col-span-6">
								{verb == "add" ? (
									<button
										type="button"
										className="rounded-md hover:bg-slate-200 px-3 py-2 text-sm font-semibold shadow-xs"
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
										? "Add Product"
										: "Edit Product"}
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
