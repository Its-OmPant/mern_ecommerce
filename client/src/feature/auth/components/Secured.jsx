import { useSelector } from "react-redux";
import { selectAuthenticatedUser } from "../authSlice";
import { Navigate } from "react-router";

function Secured({ children }) {
	const user = useSelector(selectAuthenticatedUser);

	if (!user) {
		return <Navigate to="/login" />;
	}
	return children;
}

export default Secured;
