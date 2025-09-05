import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createUserAsync } from "../authSlice";

function Signup() {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();
	const navigator = useNavigate();
	const dispatch = useDispatch();

	function handleFormSubmission(data) {
		dispatch(
			createUserAsync({
				email: data.email,
				password: data.password,
				addresses: [],
				role: "user", // will be added by backend later
			})
		);
		alert("User Registration Successful");
		reset();
		navigator("/");
	}

	return (
		<>
			<div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<h2 className="mt-4 text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-white">
						Create a New Account
					</h2>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<form
						action="#"
						onSubmit={handleSubmit(handleFormSubmission)}
					>
						<div className="my-3">
							<label
								htmlFor="email"
								className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100"
							>
								Email address
							</label>
							<div className="mt-2">
								<input
									id="email"
									{...register("email", {
										required: "email is required",
										pattern: {
											value: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
											message: "email should be valid",
										},
									})}
									type="text"
									className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
								/>
							</div>
							{errors?.email && (
								<p className="text-sm text-red-500 my-1">
									{errors.email.message}
								</p>
							)}
						</div>

						<div className="my-3">
							<div className="flex items-center justify-between">
								<label
									htmlFor="password"
									className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100"
								>
									Password
								</label>
							</div>
							<div className="mt-2">
								<input
									id="password"
									{...register("password", {
										required: "password is required",
										pattern: {
											value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
											message: `- at least 8 characters\n
													- must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n
													- Can contain special characters`,
										},
									})}
									type="password"
									className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
								/>
							</div>
							{errors?.password && (
								<p className="text-sm text-red-500 my-1">
									{errors.password.message}
								</p>
							)}
						</div>
						<div className="my-3">
							<div className="flex items-center justify-between">
								<label
									htmlFor="confirmPassword"
									className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100"
								>
									Confirm Password
								</label>
							</div>
							<div className="my-1">
								<input
									id="confirmPassword"
									{...register("confirmPassword", {
										required:
											"Confirm Password is required",
										validate: (value, formValues) =>
											value === formValues.password ||
											"confirm password should be same as password",
									})}
									type="password"
									className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
								/>
							</div>
							{errors?.confirmPassword && (
								<p className="text-sm text-red-500 my-1">
									{errors.confirmPassword.message}
								</p>
							)}
						</div>

						<div className="mt-5">
							<button
								type="submit"
								className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:shadow-none dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500"
							>
								Sign Up
							</button>
						</div>
					</form>

					<p className="mt-2 text-center text-sm/6 text-gray-500 dark:text-gray-400">
						Already have an account ?{" "}
						<Link
							to="/login"
							className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
						>
							Login Instead
						</Link>
					</p>
				</div>
			</div>
		</>
	);
}

export default Signup;
