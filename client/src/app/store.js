import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../feature/product/productSlice";
import authReducer from "../feature/auth/authSlice";

export const store = configureStore({
	reducer: {
		product: productReducer,
		auth: authReducer,
	},
});
