import { Outlet } from "react-router";

// routing
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
} from "./Pages";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItemsAsync } from "./feature/cart/cartSlice";
import { useEffect } from "react";
import { selectCurrentUser } from "./feature/auth/authSlice";

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
				path: "/product-details/:id",
				element: <ProductDetailsPage />,
			},
			{
				path: "/cart",
				element: <CartPage />,
			},
			{
				path: "/checkout",
				element: <CheckoutPage />,
			},
			{
				path: "/order-success/:id",
				element: <OrderSuccessPage />,
			},
			{
				path: "/profile",
				element: <UserProfilePage />,
			},
			{
				path: "/orders",
				element: <UserOrdersPage />,
			},
		],
		errorElement: <NotFoundPage />,
	},
	{
		path: "/login",
		element: <LoginPage />,
	},
	{
		path: "/sign-up",
		element: <SignupPage />,
	},
]);

function App() {
	const user = useSelector(selectCurrentUser);
	const dispatch = useDispatch();

	useEffect(() => {
		if (user) {
			dispatch(fetchCartItemsAsync(user.id));
		}
	}, [dispatch, user]);
	return <RouterProvider router={router} />;
}

export default App;
