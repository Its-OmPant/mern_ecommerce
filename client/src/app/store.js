import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../feature/product/productSlice";
import authReducer from "../feature/auth/authSlice";
import cartReducer from "../feature/cart/cartSlice";

export const store = configureStore({
	reducer: {
		product: productReducer,
		auth: authReducer,
		cart: cartReducer,
	},
});
