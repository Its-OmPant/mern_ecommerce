import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	value: 0,
};

export const productListSlice = createSlice({
	name: "productList",
	initialState,
	reducers: {
		increment: (state) => {
			state.value++;
		},
	},
});

export const { increment } = productListSlice.actions;

export default productListSlice.reducer;
