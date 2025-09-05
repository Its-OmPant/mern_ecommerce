import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
	fetchAllFilters,
	fetchSortingOptions,
	fetchAllProducts,
	fetchAllProductsByFilters,
	getProductById,
	addProduct,
	updateProduct,
	fetchAllBrandsAndCategories,
	deleteProduct,
} from "./productAPI";

const initialState = {
	products: [],
	filters: [],
	allBrands: [],
	allCategories: [],
	sortOptions: [],
	selectedProduct: null,
	totalItems: 0,
	totalPages: 0,
	state: "idle",
};

export const fetchAllProductsAsync = createAsyncThunk(
	"products/fetchAllProducts",
	async () => {
		const res = await fetchAllProducts();
		return res.data;
	}
);

export const fetchAllProductByFiltersAsync = createAsyncThunk(
	"products/fetchAllProductsByFilters",
	async ({ appliedFilter, appliedSort, appliedPagination }) => {
		const res = await fetchAllProductsByFilters(
			appliedFilter,
			appliedSort,
			appliedPagination
		);
		return res;
	}
);

export const fetchAllFiltersAsync = createAsyncThunk(
	"products/fetchAllFilters",
	async () => {
		const res = await fetchAllFilters();
		return res.data;
	}
);

export const fetchSortingOptionsAsync = createAsyncThunk(
	"products/fetchSortingOptions",
	async () => {
		const res = await fetchSortingOptions();
		return res.data;
	}
);

export const fetchProductByIdAsync = createAsyncThunk(
	"products/fetchProductById",
	async (id) => {
		const res = await getProductById(id);
		return res.data;
	}
);

export const addProductAsync = createAsyncThunk(
	"products/addProduct",
	async (product) => {
		const res = await addProduct(product);
		return res;
	}
);

export const deleteProductAsync = createAsyncThunk(
	"products/deleteProduct",
	async (id) => {
		const res = await deleteProduct(id);
		return res;
	}
);

export const updateProductAsync = createAsyncThunk(
	"products/updateProduct",
	async (product) => {
		const res = await updateProduct(product);
		return res;
	}
);
export const fetchBrandsAndCategoriesAsync = createAsyncThunk(
	"products/fetchBrandsAndCategories",
	async () => {
		const res = await fetchAllBrandsAndCategories();
		return res;
	}
);

export const productSlice = createSlice({
	name: "productList",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAllProductsAsync.pending, (state) => {
				state.state = "loading";
			})
			.addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
				state.products = action.payload;
				state.state = "idle";
			})
			.addCase(fetchAllProductByFiltersAsync.pending, (state) => {
				state.state = "loading";
			})
			.addCase(
				fetchAllProductByFiltersAsync.fulfilled,
				(state, action) => {
					state.products = action.payload.data;
					state.totalItems = action.payload.totalItems;
					state.totalPages = action.payload.totalPages;
					state.state = "idle";
				}
			)
			.addCase(fetchAllFiltersAsync.pending, (state) => {
				state.state = "loading";
			})
			.addCase(fetchAllFiltersAsync.fulfilled, (state, action) => {
				state.filters = action.payload;
				state.state = "idle";
			})
			.addCase(fetchSortingOptionsAsync.pending, (state) => {
				state.state = "loading";
			})
			.addCase(fetchSortingOptionsAsync.fulfilled, (state, action) => {
				state.sortOptions = action.payload;
				state.state = "idle";
			})
			.addCase(fetchProductByIdAsync.pending, (state) => {
				state.state = "loading";
			})
			.addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
				state.selectedProduct = action.payload;
				state.state = "idle";
			})
			.addCase(addProductAsync.pending, (state) => {
				state.state = "loading";
			})
			.addCase(addProductAsync.fulfilled, (state, action) => {
				state.state = "idle";
				state.products.push(action.payload);
			})
			.addCase(deleteProductAsync.pending, (state) => {
				state.state = "loading";
			})
			.addCase(deleteProductAsync.fulfilled, (state, action) => {
				state.state = "idle";
				const idx = state.products.findIndex(
					(p) => p.id == action.payload.id
				);
				state.products.splice(idx, 1);
			})
			.addCase(updateProductAsync.pending, (state) => {
				state.state = "loading";
			})
			.addCase(updateProductAsync.fulfilled, (state, action) => {
				state.state = "idle";
				const idx = state.products.findIndex(
					(p) => p.id == action.payload.id
				);
				state.products.splice(idx, 1, action.payload);
			})
			.addCase(fetchBrandsAndCategoriesAsync.pending, (state) => {
				state.state = "loading";
			})
			.addCase(
				fetchBrandsAndCategoriesAsync.fulfilled,
				(state, action) => {
					state.state = "idle";
					state.allBrands = action.payload.brands;
					state.allCategories = action.payload.categories;
				}
			);
	},
});

// selectors
export const selectAllProducts = (state) => state.product.products;
export const selectLoadingState = (state) => state.product.state;
export const selectTotalItems = (state) => state.product.totalItems;
export const selectTotalPages = (state) => state.product.totalPages;
export const selectAllFilters = (state) => state.product.filters;
export const selectAllSortOptions = (state) => state.product.sortOptions;
export const selectCurrentProduct = (state) => state.product.selectedProduct;
export const selectAllBrands = (state) => state.product.allBrands;
export const selectAllCategories = (state) => state.product.allCategories;

export const selectProductById = (id) => (state) =>
	state.product.products.find((p) => p.id == id);

export default productSlice.reducer;
