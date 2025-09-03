import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUserOrders } from "./userApi";

const initialState = {
	userOrders: [],
	status: "idle",
};

export const fetchUserOrdersAsync = createAsyncThunk(
	"user/fetchUserOrders",
	async (userId) => {
		return await fetchUserOrders(userId);
	}
);

export const userSlice = createSlice({
	name: "userSlice",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchUserOrdersAsync.pending, (state) => {
			state.status = "pending";
		});
		builder.addCase(fetchUserOrdersAsync.fulfilled, (state, action) => {
			state.status = "idle";
			state.userOrders = action.payload;
		});
	},
});

export const selectUserOrders = (state) => state.user.userOrders;

export default userSlice.reducer;
