import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "../../user/userSlice";
import { useEffect } from "react";
import { signOutUserAsync } from "../authSlice";
import { Navigate } from "react-router";

export default function Signout() {
	const dispatch = useDispatch();
	const user = useSelector(selectLoggedInUser);

	useEffect(() => {
		dispatch(signOutUserAsync(user.id));
	}, [dispatch, user.id]);

	return <>{!user && <Navigate to="/login" />}</>;
}
