import React, { useEffect, useState } from 'react';
import useGetCustomers from '../hooks/useGetCustomers';
import { ICustomerss } from '../models/Customers.type';
import { GroupsProvider } from '../context/Customers.context';
import CustomersTable from '../components/CustomersTable';
import CustomersEditDialog from '../components/CustomersEditDialog';
import CustomersSettings from '../components/CustomersSettings';

const CustomersContainer = () => {
  const { getCustomers } = useGetCustomers();
  const [CustomersData, setCustomersData] = useState<ICustomerss[]>();
  const getCustomersFromApi = async () => {
    const Customers = await getCustomers();
    setCustomersData(Customers.data);
  };

  useEffect(() => {
    getCustomersFromApi();
  }, []);
  return (
    <GroupsProvider>
      <CustomersSettings />
      <CustomersTable customers={CustomersData || []} loading={false} updateTable={getCustomersFromApi} />
      <CustomersEditDialog getCustomerFromApi={getCustomersFromApi} />
    </GroupsProvider>
  );
};

export default CustomersContainer;
