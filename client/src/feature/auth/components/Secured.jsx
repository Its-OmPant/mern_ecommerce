import { useSelector } from "react-redux";
import { selectCurrentUser } from "../authSlice";
import { Navigate } from "react-router";

function Secured({ children }) {
	const user = useSelector(selectCurrentUser);

	if (!user) {
		return <Navigate to="/login" />;
	}
	return children;
}

export default Secured;
