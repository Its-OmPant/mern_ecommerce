import Secured from "../feature/auth/components/Secured";
import UserProfile from "../feature/user/components/UserProfile";

export default function UserProfilePage() {
	return (
		<Secured>
			<UserProfile />
		</Secured>
	);
}
