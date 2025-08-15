import { Outlet } from "react-router";

// routing
import { createBrowserRouter, RouterProvider } from "react-router";
import { HomePage, LoginPage, SignupPage } from "./Pages";

const router = createBrowserRouter([
	{
		path: "/",
		element: <HomePage />,
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
