import { Link, Navigate } from "react-router";
import { useForm } from "react-hook-form";
import {
	loginUserAsync,
	selectAuthenticatedUser,
	selectErrorStatus,
} from "../authSlice";
import { useSelector, useDispatch } from "react-redux";

function Login() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const user = useSelector(selectAuthenticatedUser);
	const loginErrorStatus = useSelector(selectErrorStatus);
	const dispatch = useDispatch();

	function handleFormSubmission(data) {
		dispatch(loginUserAsync(data));
	}

	if (user && user.role == "user") {
		return <Navigate to="/" />;
	} else if (user && user.role == "admin") {
		return <Navigate to="/admin" />;
	} else
		return (
			<div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-white">
						Login to your account
					</h2>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<form
						className="space-y-6"
						onSubmit={handleSubmit(handleFormSubmission)}
					>
						<div>
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

						<div>
							<div className="flex items-center justify-between">
								<label
									htmlFor="password"
									className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100"
								>
									Password
								</label>
								<div className="text-sm">
									<Link
										to="/forgot-password"
										className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
									>
										Forgot password?
									</Link>
								</div>
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

						<div>
							<button
								type="submit"
								className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:shadow-none dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500"
							>
								Login
							</button>

							{loginErrorStatus && (
								<p className="my-1 text-sm text-red-500">
									{loginErrorStatus.message}
								</p>
							)}
						</div>
					</form>

					<p className="mt-10 text-center text-sm/6 text-gray-500 dark:text-gray-400">
						Don't have an account ?{" "}
						<Link
							to="/sign-up"
							className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
						>
							Create an Account
						</Link>
					</p>
				</div>
			</div>
		);
}

export default Login;
