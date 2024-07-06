import { toastsManager } from '@/utilities';
import { LoadingButton } from '@mui/lab';
import { Dialog, DialogContent, DialogActions, Button } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useGroupsContext } from '../context/Customers.context';
import { ICustomerss } from '../models/Customers.type';
import useUpdateCustomer from '../hooks/useUpdateCustomers';
import useCreateCustomer from '../hooks/useCreateCustomers';
import { CustomersFormEdit } from './CustomersFormEdit';

interface Props {
  getCustomerFromApi: () => void;
}

export default function CustomersEditDialog({ getCustomerFromApi }: Props) {
  const { groupToEdit } = useGroupsContext();
  const { updateCustomer, loading } = useUpdateCustomer();
  const { openEditGroupDialogState, closeEditGroupDialog, titleGroupDialog, isEdit } = useGroupsContext();
  const { createCustomer, loading: loadingCreate } = useCreateCustomer();
  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ICustomerss>();

  const handleOnSave = async (data: ICustomerss) => {
    try {
      let res,
        text = 'Actualizado';
      if (isEdit) {
        res = await updateCustomer({
          id: groupToEdit?.id || 0,
          payRate: Number(data.payRate),
          name: data.name,
          payType: data.payType,
        });
      } else {
        text = 'Creado';
        res = await createCustomer({
          name: data?.name || '',
          payRate: Number(data.payRate),
          payType: data.payType,
        });
      }
      if (res.status === 200 || res.status === 201) {
        closeEditGroupDialog();
        toastsManager.showToast('success', 'Grupo ' + text + ' Correctamente');
        await getCustomerFromApi();
      } else {
        toastsManager.showToast('error', 'Respuesta no esperada');
      }
    } catch (error) {
      toastsManager.showToast('error', `${error}`);
      console.error(error);
    }
  };

  useEffect(() => {
    if (openEditGroupDialogState) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openEditGroupDialogState]);

  return (
    <Dialog open={openEditGroupDialogState} onClose={closeEditGroupDialog} fullWidth maxWidth="md">
      <form noValidate onSubmit={handleSubmit(handleOnSave)}>
        <DialogTitle>{titleGroupDialog}</DialogTitle>
        <DialogContent>
          <CustomersFormEdit register={register} errors={errors}></CustomersFormEdit>
        </DialogContent>
        <DialogActions>
          <LoadingButton variant="contained" loading={loading || loadingCreate} type="submit">
            Guardar
          </LoadingButton>
          <Button variant="contained" color="inherit" onClick={closeEditGroupDialog}>
            Cancelar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
