import SecuredAdmin from "../feature/auth/components/SecuredAdmin";
import AdminProducts from "../feature/admin/components/AdminProducts";
function AdminProductsPage() {
	return (
		<SecuredAdmin>
			<AdminProducts />
		</SecuredAdmin>
	);
}

export default AdminProductsPage;
