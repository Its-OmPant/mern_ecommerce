export const createUser = async (userData) => {
	try {
		const response = await fetch("http://localhost:3000/users", {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(userData),
		});

		if (!response.ok) {
			throw new Error(
				`Server Error: ${response.statusText} Code: ${response.status}`
			);
		}

		const data = await response.json();

		// TODO: return only some data while using actual server (i.e. not include password etc)
		return data;
	} catch (error) {
		console.error(
			"Something Went Wrong while creating user\nOriginal Error: ",
			error
		);
	}
};

export const checkUser = async (credentials) => {
	try {
		const response = await fetch(
			`http://localhost:3000/users/?email=${credentials.email}`
		);
		if (!response.ok) {
			throw new Error(
				`Server Error: ${response.statusText} Code: ${response.status}`
			);
		}

		const res = await response.json();
		if (res && res?.length >= 1) {
			if (res[0].password === credentials.password) {
				return res[0];
			} else {
				throw new Error("Incorrect Password");
			}
		} else {
			throw new Error("User with email doesn't exists");
		}
	} catch (error) {
		console.error(
			"Something Went Wrong while user login \nOriginal Error: ",
			error
		);
		throw new Error("Something Went Wrong");
	}
};

export const signout = async (userId) => {
	// todo: will remove session details from backend if any
	return userId;
};
