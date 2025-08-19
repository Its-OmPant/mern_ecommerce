import React from "react";
import Cart from "../feature/cart/Cart";
import Checkout from "../feature/checkout/Checkout";
import Secured from "../feature/auth/components/Secured";
function CheckoutPage() {
	return (
		<Secured>
			{" "}
			<Checkout />
		</Secured>
	);
}

export default CheckoutPage;
