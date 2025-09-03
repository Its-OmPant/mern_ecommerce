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

export const getUserData = async (userId) => {
	try {
		const response = await fetch(`http://localhost:3000/users/${userId}`);

		if (!response.ok) {
			throw new Error(
				"Error while fetching user details: Error:: ",
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

export const updateUser = async (updatedUser) => {
	try {
		const response = await fetch(
			`http://localhost:3000/users/${updatedUser.id}`,
			{
				method: "PATCH",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify(updatedUser),
			}
		);

		if (!response.ok) {
			throw new Error(
				"Error: ",
				response.statusText,
				"Code: ",
				response.status
			);
		}
		const res = await response.json();
		return res;
	} catch (error) {
		console.log("Error while updating user :: ", error);
	}
};
