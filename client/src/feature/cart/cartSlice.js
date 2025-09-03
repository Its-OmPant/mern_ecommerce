import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
	addToCart,
	clearCart,
	getUserCartItems,
	removeItemFromCart,
	updateCart,
} from "./cartAPI";

const initialState = {
	items: [],
	status: "idle",
	error: null,
};

export const addToCartAsync = createAsyncThunk(
	"cart/addToCart",
	async (item, thunkAPI) => {
		const state = thunkAPI.getState();

		const item_found = state.cart.items.find(
			(i) => i.product_id == item.product_id
		);
		// adding item if it doesn't exist.
		if (!item_found) {
			// console.log("CartSlice: Item Doesn't Exist In Cart: "); // debug log
			const response = await addToCart(item);
			return response;
		}
		return null;
	}
);

export const fetchCartItemsAsync = createAsyncThunk(
	"cart/fetchCartItems",
	async (userId) => {
		const response = await getUserCartItems(userId);
		return response;
	}
);

export const updateCartAsync = createAsyncThunk(
	"cart/updateCart",
	async (item) => {
		const response = await updateCart(item);
		return response;
	}
);

export const removeCartItemAsync = createAsyncThunk(
	"cart/removeCartItem",
	async (itemId) => {
		const response = await removeItemFromCart(itemId);
		return response;
	}
);

export const clearCartAsync = createAsyncThunk(
	"cart/clearCart",
	async (userId) => {
		const response = await clearCart(userId);
		return response;
	}
);

export const cartSlice = createSlice({
	name: "cartSlice",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(addToCartAsync.pending, (state) => {
				state.status = "loading";
			})
			.addCase(addToCartAsync.fulfilled, (state, action) => {
				state.status = "idle";
				if (action.payload !== null) {
					state.items.push(action.payload);
				}
			})
			.addCase(fetchCartItemsAsync.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchCartItemsAsync.fulfilled, (state, action) => {
				state.status = "idle";
				state.items = action.payload;
			})
			.addCase(updateCartAsync.pending, (state) => {
				state.status = "loading";
			})
			.addCase(updateCartAsync.fulfilled, (state, action) => {
				state.status = "idle";
				const idx = state.items.findIndex(
					(i) => i.id === action.payload.id
				);
				state.items[idx] = action.payload;
			})
			.addCase(removeCartItemAsync.pending, (state) => {
				state.status = "loading";
			})
			.addCase(removeCartItemAsync.fulfilled, (state, action) => {
				state.status = "idle";
				const idx = state.items.findIndex(
					(i) => i.id === action.payload.id
				);
				state.items.splice(idx, 1);
			})
			.addCase(clearCartAsync.pending, (state) => {
				state.status = "loading";
			})
			.addCase(clearCartAsync.fulfilled, (state, action) => {
				state.status = "idle";
				let items = state.items.filter(
					(i) => i.user_id != action.payload
				);
				state.items = items;
			});
	},
});

export const selectCartItems = (state) => state.cart.items;
export default cartSlice.reducer;
