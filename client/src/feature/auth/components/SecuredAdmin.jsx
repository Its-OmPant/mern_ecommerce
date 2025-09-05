import { useSelector } from "react-redux";
import { selectAuthenticatedUser } from "../authSlice";
import { Navigate } from "react-router";

function SecuredAdmin({ children }) {
	const user = useSelector(selectAuthenticatedUser);

	if (!user) {
		return <Navigate to="/login" />;
	}
	if (!user && user.role !== "admin") {
		return <Navigate to="/" />;
	}
	return children;
}

export default SecuredAdmin;
