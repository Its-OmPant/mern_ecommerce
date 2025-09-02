export const addToCart = async (item) => {
	try {
		const response = await fetch("http://localhost:3000/cart", {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(item),
		});
		if (!response.ok) {
			throw new Error(
				`Server Error: ${response.statusText} Code: ${response.status}`
			);
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(
			"Something Went Wrong while Adding Items to cart\nOriginal Error: ",
			error
		);
	}
};

export const getUserCartItems = async (userId) => {
	try {
		const response = await fetch(
			`http://localhost:3000/cart/?user_id=${userId}`
		);
		if (!response.ok) {
			throw new Error(
				`Server Error: ${response.statusText} Code: ${response.status}`
			);
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Cannot get user's cart items.\nOriginal Error: ", error);
	}
};

export const removeItemFromCart = async (id) => {
	try {
		const response = await fetch(`http://localhost:3000/cart/${id}`, {
			method: "DELETE",
			headers: {
				"content-type": "application/json",
			},
		});
		if (!response.ok) {
			throw new Error(
				`Server Error: ${response.statusText} Code: ${response.status}`
			);
		}
		const result = await response.json();
		return result;
	} catch (e) {
		console.log("Error while Deleting Cart Item: ", e);
	}
};

export const updateCart = async (item) => {
	try {
		const response = await fetch(`http://localhost:3000/cart/${item.id}`, {
			method: "PATCH",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(item),
		});
		if (!response.ok) {
			throw new Error(
				`Server Error: ${response.statusText} Code: ${response.status}`
			);
		}
		const result = await response.json();
		return result;
	} catch (e) {
		console.log("Error while Updating Cart Item: ", e);
	}
};

export const clearCart = async (userID) => {
	const allItems = await getUserCartItems(userID);
	console.log("Clear Cart Called");
	console.log("Items to remove: ", allItems);
	for (let item of allItems) {
		await removeItemFromCart(item.id);
		console.log("Removing Item");
	}
	return userID;
};
