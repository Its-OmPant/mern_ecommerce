export async function fetchAllProducts() {
	try {
		// TODO: replace hardcoded server url
		const response = await fetch("http://localhost:3000/products");
		if (!response.ok) {
			throw new Error(`Server error: ${response.status}`);
		}
		const data = await response.json();
		return { data };
	} catch (error) {
		console.error("Failed to fetch products:", error);
		return { data: [], error };
	}
}

export async function fetchAllProductsByFilters(filters) {
	try {
		let query_string = "";
		for (let filter of filters) {
			for (let key of Object.keys(filter)) {
				query_string += `${key}=${filter[key].replace(" ", "%20")}&`;
			}
		}

		// TODO: replace hardcoded server url
		const response = await fetch(
			`http://localhost:3000/products/?${query_string}`
		);
		if (!response.ok) {
			throw new Error(`Server error: ${response.status}`);
		}
		const data = await response.json();
		return { data };
	} catch (error) {
		console.error("Failed to fetch products:", error);
		return { data: [], error };
	}
}
