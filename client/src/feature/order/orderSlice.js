import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createOrder, fetchAllOrders } from "./orderAPI";

const initialState = {
	orders: [],
	totalItems: [],
	totalPages: [],
	state: "idle",
};

export const createOrderAsync = createAsyncThunk(
	"order/create",
	async (order) => {
		return await createOrder(order);
	}
);

export const fetchAllOrdersAsync = createAsyncThunk(
	"order/fetchAllOrders",
	async ({ appliedFilter, appliedSort, appliedPagination }) => {
		return await fetchAllOrders(
			appliedFilter,
			appliedSort,
			appliedPagination
		);
	}
);
export const orderSlice = createSlice({
	name: "orderSlice",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(createOrderAsync.pending, (state) => {
				state.state = "loading";
			})
			.addCase(createOrderAsync.fulfilled, (state, action) => {
				state.state = "idle";
				state.orders.push(action.payload);
			})
			.addCase(fetchAllOrdersAsync.pending, (state) => {
				state.state = "loading";
			})
			.addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
				state.orders = action.payload.data;
				state.totalItems = action.payload.totalItems;
				state.totalPages = action.payload.totalPages;
				state.state = "idle";
			});
	},
});

export const selectAllOrders = (state) => state.order.orders;
export const selectTotalOrderItems = (state) => state.order.totalItems;
export const selectTotalOrderPages = (state) => state.order.totalPages;

export default orderSlice.reducer;
