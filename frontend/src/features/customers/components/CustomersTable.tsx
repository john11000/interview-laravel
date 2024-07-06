import MUIDataTable, { MUIDataTableColumnDef, MUIDataTableMeta, MUIDataTableOptions } from 'mui-datatables';
import { Typography, CircularProgress } from '@mui/material';
import { useGroupsContext } from '../context/Customers.context';
import { ICustomerss } from '../models/Customers.type';
import { MUIDataTableDefaultOptions } from '@/constants/muidatatable.constants';
import { Delete } from '@mui/icons-material';
import Button from '@mui/material/Button';
import useDeleteCustomers from '../hooks/useDeleteCustomers';

interface Props {
  customers: ICustomerss[];
  loading: boolean;
  updateTable: () => void;
}

export default function CustomersTable({ customers, loading, updateTable }: Props) {
  const { setGroupToEdit, openEditGroupDialog, setTitleGroupDialog, setIsEdit } = useGroupsContext();

  const { deleteCustomer } = useDeleteCustomers();
  const handleEditGroup = (customers: ICustomerss) => {
    setGroupToEdit(customers);
  };
  const options: MUIDataTableOptions = {
    ...MUIDataTableDefaultOptions,
    searchPlaceholder: 'Buscar',
  };
  const handleEditClick = (dataTable: MUIDataTableMeta<unknown>) => {
    setIsEdit(true);
    setTitleGroupDialog('Edit Customer');
    handleEditGroup(customers[dataTable.rowIndex]);
    openEditGroupDialog();
  };

  const columns: MUIDataTableColumnDef[] = [
    { name: 'id', options: { display: false } },
    {
      name: 'name',
      label: 'Name',
      options: {
        customBodyRender: (_: any, dataTable: { rowData: any[] }) => {
          return (
            <Typography
              sx={{
                cursor: 'pointer',
                textDecoration: 'underline',
                color: 'blue',
              }}
              onClick={() => handleEditClick(dataTable)}
            >{`${dataTable.rowData[1]}`}</Typography>
          );
        },
      },
    },
    {
      name: 'payType',
      label: 'Pay Type',
    },
    {
      name: 'payRate',
      label: 'Pay Rate',
    },
    {
      name: 'id',
      label: 'Options',
      options: {
        customBodyRender: (id: string) => {
          return (
            <Button
              variant="outlined"
              startIcon={<Delete />}
              onClick={async () => {
                await deleteCustomer(id);
                updateTable();
              }}
            >
              Delete
            </Button>
          );
        },
      },
    },
  ];

  return (
    <MUIDataTable
      title={
        loading ? (
          <Typography>
            Cargando...
            <CircularProgress size={20} />
          </Typography>
        ) : (
          'List Customers'
        )
      }
      data={customers}
      columns={columns}
      options={options}
    ></MUIDataTable>
  );
}
