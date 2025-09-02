export const createOrder = async (order) => {
	try {
		const res = await fetch(`http://localhost:3000/orders`, {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(order),
		});

		if (!res.ok) {
			throw new Error(
				"Order Creation Failed. ERROR: ",
				res.statusText,
				" CODE: ",
				res.status
			);
		}
		const response = await res.json();
		return response;
	} catch (error) {
		console.log("Error while creating Order:: ", error);
	}
};
