import React from "react";
import ProductDetails from "../feature/product/components/ProductDetails";
import Secured from "../feature/auth/components/Secured";
function ProductDetailsPage() {
	return (
		<Secured>
			<ProductDetails />
		</Secured>
	);
}

export default ProductDetailsPage;
