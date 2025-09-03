import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkUser, createUser, signout } from "./authAPI";

const initialState = {
	currentUser: null,
	state: "idle",
	error: null,
};

export const createUserAsync = createAsyncThunk(
	"auth/createUser",
	async (userData) => {
		const res = await createUser(userData);
		return res;
	}
);

export const loginUserAsync = createAsyncThunk(
	"auth/loginUser",
	async (loginData) => {
		const res = await checkUser(loginData);
		return res;
	}
);

export const signOutUserAsync = createAsyncThunk(
	"auth/signOutUser",
	async (userId) => {
		return await signout(userId);
	}
);

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(createUserAsync.pending, (state) => {
				state.state = "loading";
			})
			.addCase(createUserAsync.fulfilled, (state, action) => {
				state.currentUser = action.payload;
				state.state = "idle";
			})
			.addCase(loginUserAsync.pending, (state) => {
				state.state = "loading";
			})
			.addCase(loginUserAsync.fulfilled, (state, action) => {
				state.currentUser = action.payload;
				state.state = "idle";
			})
			.addCase(loginUserAsync.rejected, (state, action) => {
				state.error = action.error;
				state.state = "idle";
			})
			.addCase(signOutUserAsync.pending, (state) => {
				state.state = "loading";
			})
			.addCase(signOutUserAsync.fulfilled, (state) => {
				state.state = "idle";
				state.currentUser = null;
			});
	},
});

export const selectAuthenticatedUser = (state) => state.auth.currentUser;
export const selectErrorStatus = (state) => state.auth.error;

export default authSlice.reducer;
