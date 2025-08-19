import React from "react";
import Cart from "../feature/cart/Cart";
import Secured from "../feature/auth/components/Secured";

function CartPage() {
	return (
		<Secured>
			<Cart />
		</Secured>
	);
}

export default CartPage;
