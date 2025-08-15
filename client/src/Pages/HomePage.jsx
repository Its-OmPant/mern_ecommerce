import React from "react";
import Navbar from "../feature/navbar/Navbar";
import ProductList from "../feature/product-list/ProductList";

function HomePage() {
	return (
		<div>
			<Navbar></Navbar>
			<ProductList />
		</div>
	);
}

export default HomePage;
