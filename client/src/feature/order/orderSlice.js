import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createOrder } from "./orderAPI";

const initialState = {
	orders: [],
	state: "idle",
};

export const createOrderAsync = createAsyncThunk(
	"order/create",
	async (order) => {
		return await createOrder(order);
	}
);
export const orderSlice = createSlice({
	name: "orderSlice",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(createOrderAsync.pending, (state) => {
			state.state = "loading";
		});
		builder.addCase(createOrderAsync.fulfilled, (state, action) => {
			state.state = "idle";
			state.orders.push(action.payload);
		});
	},
});

export const selectAllOrders = (state) => state.order.orders;

export default orderSlice.reducer;
