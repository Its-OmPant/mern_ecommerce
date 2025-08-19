import React from "react";
import Navbar from "../feature/navbar/Navbar";
import { Outlet } from "react-router";
import Secured from "../feature/auth/components/Secured";

function HomePage() {
	return (
		<Secured>
			<div className="h-full">
				<Navbar></Navbar>
				<Outlet />
			</div>
		</Secured>
	);
}

export default HomePage;
