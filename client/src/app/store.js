import { configureStore } from "@reduxjs/toolkit";
import sampleReducer from "../feature/sample/sampleSlice";

export const store = configureStore({
	reducer: {
		sampleState: sampleReducer,
	},
});
