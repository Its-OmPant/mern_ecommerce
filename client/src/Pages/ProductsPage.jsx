import React from "react";
import Products from "../feature/product/components/Products";
import Secured from "../feature/auth/components/Secured";
function ProductsPage() {
	return (
		<Secured>
			<Products />
		</Secured>
	);
}

export default ProductsPage;
