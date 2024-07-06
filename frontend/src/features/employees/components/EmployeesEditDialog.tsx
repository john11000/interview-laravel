import { toastsManager } from '@/utilities';
import { LoadingButton } from '@mui/lab';
import { Dialog, DialogContent, DialogActions, Button } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useGroupsContext } from '../context/Groups.context';
import { EmployeesFormEdit } from './EmployeesFormEdit';
import { IEmployees } from '../models/Groups.type';
import useUpdateEmployees from '../hooks/useUpdateEmployees';
import useCreateEmployee from '../hooks/useCreateEmployees';

interface Props {
  getEmployeesFromApi: () => void;
}

export default function EmployeesEditDialog({ getEmployeesFromApi }: Props) {
  const { groupToEdit } = useGroupsContext();
  const { updateEmployees, loading } = useUpdateEmployees();
  const { openEditGroupDialogState, closeEditGroupDialog, titleGroupDialog, isEdit } = useGroupsContext();
  const { createEmployee, loading: loadingCreate } = useCreateEmployee();
  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IEmployees>();

  const handleOnSave = async (data: IEmployees) => {
    try {
      let res,
        text = 'Actualizado';
      if (isEdit) {
        res = await updateEmployees({
          id: groupToEdit?.id || 0,
          payment_amount: Number(data.payment_amount),
          name: data.name,
          payment_type: data.payment_type,
        });
      } else {
        text = 'Creado';
        res = await createEmployee({
          name: data?.name || '',
          payment_amount: Number(data.payment_amount),
          payment_type: data.payment_type,
        });
      }
      if (res.status === 200 || res.status === 201) {
        closeEditGroupDialog();
        toastsManager.showToast('success', 'Grupo ' + text + ' Correctamente');
        await getEmployeesFromApi();
      } else {
        toastsManager.showToast('error', 'Respuesta no esperada');
      }
    } catch (error: any) {
      const errorMessage = error?.response?.data?.error || error?.message || 'Ocurrió un error';
      toastsManager.showToast('error', errorMessage);
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
          <EmployeesFormEdit register={register} errors={errors}></EmployeesFormEdit>
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
