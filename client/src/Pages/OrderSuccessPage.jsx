import { useParams, Link } from "react-router";

export default function OrderSuccessPage() {
	const { id } = useParams();

	return (
		<main className="flex justify-center min-h-screen items-center bg-white px-6 py-24 sm:py-32 lg:px-8 dark:bg-gray-900">
			<div className="text-center">
				<h1 className="mt-4 text-xl font-semibold tracking-tight text-balance text-gray-900 sm:text-2xl dark:text-white">
					Order Placed Succesfully
				</h1>

				<div className="mt-3 text-slate-500 flex flex-col gap-3">
					<p>Order ID: #{id}</p>
					<p>
						To see details Navigate to{" "}
						<Link
							to="/orders"
							className="text-teal-700 font-semibold"
						>
							Profile &gt; My orders
						</Link>
					</p>
					<Link
						to="/"
						className="px-4 py-2 rounded bg-teal-800 text-white my-5 hover:shadow-xl"
					>
						Back to Home Page
					</Link>
				</div>
			</div>
		</main>
	);
}
