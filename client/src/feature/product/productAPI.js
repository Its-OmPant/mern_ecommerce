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

export async function fetchAllProductsByFilters(filters, sort, pagination) {
	try {
		let query_string = "";
		// handle filters
		for (let filter of filters) {
			for (let key of Object.keys(filter)) {
				query_string += `${key}=${filter[key].replace(" ", "%20")}&`;
			}
		}
		// handle sorting
		for (let item in sort) {
			query_string += `${item}=${sort[item]}&`;
		}
		// handle pagination
		for (let item in pagination) {
			query_string += `${item}=${pagination[item]}&`;
		}

		// console.log("QUERY STRING: ", query_string);
		// TODO: replace hardcoded server url
		const response = await fetch(
			`http://localhost:3000/products/?${query_string}`
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

export async function fetchAllFilters() {
	try {
		// TODO: replace hardcoded server url
		const response = await fetch("http://localhost:3000/filters");
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

export async function fetchSortingOptions() {
	try {
		// TODO: replace hardcoded server url
		const response = await fetch("http://localhost:3000/sortOptions");
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

export async function getProductById(id) {
	try {
		// TODO: replace hardcoded server url
		const response = await fetch(`http://localhost:3000/products/${id}`);
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
