import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUserOrders, getUserData, updateUser } from "./userApi";
import { signOutUserAsync } from "../auth/authSlice";
const initialState = {
	userOrders: [],
	status: "idle",
	loggedInUser: null,
};

export const fetchUserOrdersAsync = createAsyncThunk(
	"user/fetchUserOrders",
	async (userId) => {
		return await fetchUserOrders(userId);
	}
);

export const getUserDataAsync = createAsyncThunk(
	"user/getUserData",
	async (userId) => {
		return await getUserData(userId);
	}
);
export const updateUserAsync = createAsyncThunk(
	"user/updateUser",
	async (user) => {
		const res = await updateUser(user);
		return res;
	}
);

export const userSlice = createSlice({
	name: "userSlice",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUserOrdersAsync.pending, (state) => {
				state.status = "pending";
			})
			.addCase(fetchUserOrdersAsync.fulfilled, (state, action) => {
				state.status = "idle";
				state.userOrders = action.payload;
			})
			.addCase(getUserDataAsync.pending, (state) => {
				state.status = "loading";
			})
			.addCase(getUserDataAsync.fulfilled, (state, action) => {
				state.status = "idle";
				state.loggedInUser = action.payload;
			})
			.addCase(updateUserAsync.pending, (state) => {
				state.status = "loading";
			})
			.addCase(updateUserAsync.fulfilled, (state, action) => {
				state.status = "idle";
				state.loggedInUser = action.payload;
			})
			// triggers when logout action dispatched in auth slice
			.addCase(signOutUserAsync.fulfilled, (state) => {
				state.status = "idle";
				state.loggedInUser = null;
			});
	},
});

export const selectUserOrders = (state) => state.user.userOrders;
export const selectLoggedInUser = (state) => state.user.loggedInUser;
export const selectUserAddresses = (state) => state.user.loggedInUser.addresses;

export default userSlice.reducer;
