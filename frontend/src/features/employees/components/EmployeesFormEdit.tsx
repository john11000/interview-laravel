import { FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { useGroupsContext } from '../context/Groups.context';
import { IEmployees, PayTypeEnum } from '../models/Groups.type';
import { FIELD_REQUIRED_MESSAGE } from '@/constants/app.constants';

type props = {
  register: UseFormRegister<IEmployees>;
  errors: FieldErrors<IEmployees>;
};

export const EmployeesFormEdit: React.FC<props> = ({ register, errors }) => {
  const { isEdit, groupToEdit } = useGroupsContext();
  return (
    <Container>
      <Grid container spacing={2} width="100%" margin="auto">
        <Grid
          item
          sx={{
            display: isEdit ? 'block' : 'none',
            width: { xs: '100%', md: '50%' },
          }}
        >
          <FormControl fullWidth>
            <TextField
              defaultValue={groupToEdit?.id}
              variant="outlined"
              disabled
              size="small"
              label="Id"
              {...register('id')}
            />
          </FormControl>
        </Grid>

        <Grid item sx={{ width: { xs: '100%', md: isEdit ? '50%' : '100%' } }}>
          <FormControl fullWidth>
            <TextField
              required
              error={!!errors.name}
              defaultValue={groupToEdit?.name}
              helperText={errors.name?.type === 'required' && FIELD_REQUIRED_MESSAGE}
              label="Name"
              variant="outlined"
              size="small"
              {...register('name', { required: true })}
            />
          </FormControl>
        </Grid>
        <Grid item sx={{ width: { xs: '100%', md: isEdit ? '50%' : '100%' } }}>
          <FormControl fullWidth error={!!errors.payType} size="small">
            <InputLabel id="payment_type-label">Pay Type</InputLabel>
            <Select
              labelId="payment_type-label"
              id="payment_type"
              defaultValue={groupToEdit?.payment_type}
              variant="outlined"
              {...register('payment_type', { required: true })}
            >
              <MenuItem value={PayTypeEnum.HOURLY}>{PayTypeEnum.HOURLY}</MenuItem>
              <MenuItem value={PayTypeEnum.SALARY}>{PayTypeEnum.SALARY}</MenuItem>
            </Select>
            {errors.payment_type?.type === 'required' && <FormHelperText>{FIELD_REQUIRED_MESSAGE}</FormHelperText>}
          </FormControl>
        </Grid>
        <Grid item sx={{ width: { xs: '100%', md: isEdit ? '50%' : '100%' } }}>
          <FormControl fullWidth>
            <TextField
              required
              error={!!errors.payment_amount}
              defaultValue={groupToEdit?.payment_amount}
              helperText={errors.payment_amount?.type === 'required' && FIELD_REQUIRED_MESSAGE}
              label="Pay Amount"
              variant="outlined"
              size="small"
              {...register('payment_amount', { required: true })}
            />
          </FormControl>
        </Grid>
        {isEdit && <Grid item xs={12} md={6}></Grid>}
      </Grid>
    </Container>
  );
};
