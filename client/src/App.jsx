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
} from "./Pages";

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
				path: "/cart",
				element: <CartPage />,
			},
			{
				path: "/checkout",
				element: <CheckoutPage />,
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
	return <RouterProvider router={router} />;
}

export default App;
