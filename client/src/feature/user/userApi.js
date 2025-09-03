export const fetchUserOrders = async (userId) => {
	try {
		const response = await fetch(
			`http://localhost:3000/orders/?user=${userId}`
		);

		if (!response.ok) {
			throw new Error(
				"Error while fetching user Orders: Error:: ",
				response.statusText,
				" CODE:: ",
				response.status
			);
		}

		return await response.json();
	} catch (error) {
		console.log(error);
	}
};
