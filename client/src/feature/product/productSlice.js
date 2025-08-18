import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllProducts, fetchAllProductsByFilters } from "./productAPI";

const initialState = {
	products: [],
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
			);
	},
});

// selectors
export const selectAllProducts = (state) => state.product.products;
export const selectLoadingState = (state) => state.product.state;
export const selectTotalItems = (state) => state.product.totalItems;
export const selectTotalPages = (state) => state.product.totalPages;

export default productSlice.reducer;
