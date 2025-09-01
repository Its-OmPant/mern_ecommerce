import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
	addToCart,
	getUserCartItems,
	removeItemFromCart,
	updateCart,
} from "./cartAPI";

const initialState = {
	items: [],
	state: "idle",
	error: null,
};

export const addToCartAsync = createAsyncThunk(
	"cart/addToCart",
	async (item, thunkAPI) => {
		console.log("ADD TO CART CALLED");
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

export const cartSlice = createSlice({
	name: "cartSlice",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(addToCartAsync.pending, (state) => {
				state.state = "loading";
			})
			.addCase(addToCartAsync.fulfilled, (state, action) => {
				state.state = "idle";
				if (action.payload !== null) {
					state.items.push(action.payload);
				}
			})
			.addCase(fetchCartItemsAsync.pending, (state) => {
				state.state = "loading";
			})
			.addCase(fetchCartItemsAsync.fulfilled, (state, action) => {
				state.state = "idle";
				state.items = action.payload;
			})
			.addCase(updateCartAsync.pending, (state) => {
				state.state = "loading";
			})
			.addCase(updateCartAsync.fulfilled, (state, action) => {
				state.state = "idle";
				const idx = state.items.findIndex(
					(i) => i.id === action.payload.id
				);
				state.items[idx] = action.payload;
			})
			.addCase(removeCartItemAsync.pending, (state) => {
				state.state = "loading";
			})
			.addCase(removeCartItemAsync.fulfilled, (state, action) => {
				state.state = "idle";
				const idx = state.items.findIndex(
					(i) => i.id === action.payload.id
				);
				state.items.splice(idx, 1);
			});
	},
});

export const selectCartItems = (state) => state.cart.items;
export default cartSlice.reducer;
