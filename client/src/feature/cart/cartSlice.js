import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	value: 0,
};

export const sampleSlice = createSlice({
	name: "sampleSlice",
	initialState,
	reducers: {
		increment: (state) => {
			state.value++;
		},
	},
});

export const { increment } = sampleSlice.actions;

export default sampleSlice.reducer;
