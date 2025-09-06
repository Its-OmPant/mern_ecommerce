import { createBrowserRouter, RouterProvider } from "react-router";
import {
	HomePage,
	LoginPage,
	SignupPage,
	ProductsPage,
	CartPage,
	NotFoundPage,
	CheckoutPage,
	ProductDetailsPage,
	OrderSuccessPage,
	UserProfilePage,
	UserOrdersPage,
	AboutPage,
	AdminProductsPage,
	AdminProductDetailsPage,
	AdminOrdersPage,
} from "./Pages";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItemsAsync } from "./feature/cart/cartSlice";
import { useEffect } from "react";
import { selectAuthenticatedUser } from "./feature/auth/authSlice";
import UserAddressForm from "./feature/user/components/UserAddressForm";
import { getUserDataAsync } from "./feature/user/userSlice";
import Signout from "./feature/auth/components/Signout";
import ForgotPassword from "./feature/auth/components/ForgotPassword";
import AdminProductForm from "./feature/admin/components/AdminProductForm";
import { fetchBrandsAndCategoriesAsync } from "./feature/product/productSlice";

const router = createBrowserRouter([
	{
		path: "/",
		element: <HomePage />,
		children: [
			{
				path: "/",
				element: <ProductsPage />,
			},
			{
				path: "about",
				element: <AboutPage />,
			},
			{
				path: "product-details/:id",
				element: <ProductDetailsPage />,
			},
			{
				path: "cart",
				element: <CartPage />,
			},
			{
				path: "checkout",
				element: <CheckoutPage />,
			},
			{
				path: "order-success/:id",
				element: <OrderSuccessPage />,
			},
			{
				path: "profile",
				element: <UserProfilePage />,
			},
			{
				path: "profile/address/:verb",
				element: <UserAddressForm />,
			},
			{
				path: "profile/address/:verb/:idx",
				element: <UserAddressForm />,
			},
			{
				path: "orders",
				element: <UserOrdersPage />,
			},
			{
				path: "signout",
				element: <Signout />,
			},
		],
		errorElement: <NotFoundPage />,
	},
	{
		path: "/admin",
		element: <HomePage />,
		children: [
			{
				path: "",
				element: <AdminProductsPage />,
			},
			{
				path: "orders",
				element: <AdminOrdersPage />,
			},
			{
				path: "product-details/:id",
				element: <AdminProductDetailsPage />,
			},
			{
				path: "product/:verb",
				element: <AdminProductForm />,
			},
			{
				path: "product/:verb/:id",
				element: <AdminProductForm />,
			},
			{
				path: "signout",
				element: <Signout />,
			},
		],
		errorElement: <NotFoundPage />,
	},
	{
		path: "login",
		element: <LoginPage />,
	},
	{
		path: "sign-up",
		element: <SignupPage />,
	},
	{
		path: "forgot-password",
		element: <ForgotPassword />,
	},
]);

function App() {
	const user = useSelector(selectAuthenticatedUser);
	const dispatch = useDispatch();

	useEffect(() => {
		if (user) {
			dispatch(fetchCartItemsAsync(user.id));
			dispatch(getUserDataAsync(user.id));
			dispatch(fetchBrandsAndCategoriesAsync());
		}
	}, [dispatch, user]);
	return <RouterProvider router={router} />;
}

export default App;
