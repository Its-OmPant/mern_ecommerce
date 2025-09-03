import Secured from "../feature/auth/components/Secured";
import UserOrders from "../feature/user/components/UserOrders";

export default function UserOrdersPage() {
	return (
		<Secured>
			<UserOrders />
		</Secured>
	);
}
