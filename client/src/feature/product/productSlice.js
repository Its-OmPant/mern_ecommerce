import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllProducts, fetchAllProductsByFilters } from "./productAPI";

const initialState = {
	products: [],
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
	async (fliters) => {
		const res = await fetchAllProductsByFilters(fliters);
		return res.data;
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
					state.products = action.payload;
					state.state = "idle";
				}
			);
	},
});

export const getAllProducts = (state) => state.product.products;
export const getLoadingState = (state) => state.product.state;

export default productSlice.reducer;
