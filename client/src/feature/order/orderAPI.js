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

export async function fetchAllOrders(filters, sort, pagination) {
	try {
		let query_string = "";
		// handle filters
		if (filters && filters.length > 0) {
			for (let filter of filters) {
				for (let key of Object.keys(filter)) {
					query_string += `${key}=${filter[key].replace(
						" ",
						"%20"
					)}&`;
				}
			}
		}
		// handle sorting
		if (sort && sort.length > 0) {
			for (let item in sort) {
				query_string += `${item}=${sort[item]}&`;
			}
		}
		// handle pagination
		for (let item in pagination) {
			query_string += `${item}=${pagination[item]}&`;
		}

		// console.log("QUERY STRING: ", query_string);
		// TODO: replace hardcoded server url
		const response = await fetch(
			`http://localhost:3000/orders/?${query_string}`
		);
		if (!response.ok) {
			throw new Error(`Server error: ${response.status}`);
		}
		const res = await response.json();
		return {
			totalItems: res.items,
			totalPages: res.pages,
			data: res.data,
		};
	} catch (error) {
		console.error("Failed to fetch products:", error);
		return { data: [], error };
	}
}
