import { URL_API_CUSTOMERS } from '@/constants/url-apis.constants';
import useFetch from '@/hooks/useFetch';

export default function useDeleteCustomers() {
  const { request, loading } = useFetch();

  const deleteCustomer = (id: string) => {
    return request({ method: 'DELETE', url: URL_API_CUSTOMERS + '/' + id });
  };

  return {
    deleteCustomer,
    loading,
  };
}
