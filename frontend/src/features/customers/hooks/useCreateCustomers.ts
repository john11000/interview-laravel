import { URL_API_CUSTOMERS } from '@/constants/url-apis.constants';
import useFetch from '@/hooks/useFetch';
import { ICustomerss } from '../models/Customers.type';

export default function useCreateCustomers() {
  const { request, loading } = useFetch();

  const createCustomer = (data: Partial<ICustomerss>) => {
    return request({ method: 'POST', url: URL_API_CUSTOMERS, data });
  };

  return {
    createCustomer,
    loading,
  };
}
