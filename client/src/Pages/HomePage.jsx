import React from "react";
import Navbar from "../feature/navbar/Navbar";
import ProductList from "../feature/product-list/ProductList";
import { Outlet } from "react-router";

function HomePage() {
	return (
		<div className="h-full">
			<Navbar></Navbar>
			<Outlet />
		</div>
	);
}

export default HomePage;
