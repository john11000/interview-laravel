import { URL_API_CUSTOMERS } from '@/constants/url-apis.constants';
import useFetch from '@/hooks/useFetch';
import { ICustomerss } from '../models/Customers.type';

export default function useUpdateCustomers() {
  const { request, loading } = useFetch();

  const updateCustomer = (data: ICustomerss) => {
    return request({ method: 'PUT', url: URL_API_CUSTOMERS + '/' + data.id, data });
  };

  return {
    updateCustomer,
    loading,
  };
}
