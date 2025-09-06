import AdminOrders from "../feature/admin/components/AdminOrders";
import SecuredAdmin from "../feature/auth/components/SecuredAdmin";
export default function AdminOrdersPage() {
	return (
		<SecuredAdmin>
			<AdminOrders />
		</SecuredAdmin>
	);
}
