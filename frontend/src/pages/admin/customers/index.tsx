import { AdminLayout } from '@/features/commons';
import CustomersContainer from '@/features/customers/containers/CustomersContainer';

export default function CustomersPage() {
  return <AdminLayout>
    <CustomersContainer />
  </AdminLayout>;
}
