import { Add } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { useGroupsContext } from '../context/Groups.context';

type Props = {
  // onClick: (event: MouseEvent<HTMLButtonElement>) => void;
};

export default function EmployeesSettings({}: Props) {
  const { openEditGroupDialog, setTitleGroupDialog, setIsEdit, setGroupToEdit } = useGroupsContext();

  const handleAddGroup = () => {
    setGroupToEdit(undefined);
    setIsEdit(false);
    setTitleGroupDialog('Create employee');
    openEditGroupDialog();
  };
  return (
    <Box display="flex" justifyContent="flex-end" sx={{ my: 1 }}>
      <Button variant="contained" size="small" color="primary" onClick={() => handleAddGroup()} startIcon={<Add />}>
        Add
      </Button>
    </Box>
  );
}
