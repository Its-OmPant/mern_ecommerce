import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../feature/product/productSlice";
import authReducer from "../feature/auth/authSlice";
import cartReducer from "../feature/cart/cartSlice";
import orderReducer from "../feature/order/orderSlice";
import userReducer from "../feature/user/userSlice";

export const store = configureStore({
	reducer: {
		product: productReducer,
		auth: authReducer,
		cart: cartReducer,
		order: orderReducer,
		user: userReducer,
	},
});
