import AdminProductDetails from "../feature/admin/components/AdminProductDetails";
import SecuredAdmin from "../feature/auth/components/SecuredAdmin";
function AdminProductDetailsPage() {
	return (
		<SecuredAdmin>
			<AdminProductDetails />
		</SecuredAdmin>
	);
}

export default AdminProductDetailsPage;
