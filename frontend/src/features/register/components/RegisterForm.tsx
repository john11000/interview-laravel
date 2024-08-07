import { VisibilityOff, Visibility } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { RegisterFormState } from '../models/Register.type';
// import { ROUTE_LINK_RESET_PASSWORD } from '@/constants/routes-link.constants';
// import Link from '@/features/commons/Link';
import { Link } from '@/features/commons';
interface Props {
  onSubmit: (data: RegisterFormState) => void;
  loading: boolean;
}

export default function RegisterForm({ onSubmit, loading }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormState>();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Grid container justifyContent="center" spacing={2}>
      <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            label="Name"
            autoComplete="name"
            {...register('name', {
              required: { value: true, message: 'Campo requerido' },
            })}
            error={Boolean(errors.email?.message)}
            helperText={errors.email?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            label="Email"
            autoComplete="email"
            {...register('email', {
              required: { value: true, message: 'Campo requerido' },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Email no válido.',
              },
              maxLength: {
                value: 50,
                message: 'El correo completo debe tener un máximo de 50 caracteres',
              },
            })}
            error={Boolean(errors.email?.message)}
            helperText={errors.email?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl variant="outlined" fullWidth error={Boolean(errors.password?.message)} required>
            <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
            <OutlinedInput
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Contraseña"
              {...register('password', {
                required: { value: true, message: 'Campo requerido' },
                minLength: {
                  value: 8,
                  message: 'La contraseña debe tener un máximo de 8 caracteres',
                },
              })}
            />
            <FormHelperText error>{errors.password?.message}</FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <LoadingButton
            sx={{
              marginTop: '50px',
            }}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            loading={loading}
          >
            <span>Ingresar</span>
          </LoadingButton>
        </Grid>
        <Link href="/login">Iniciar sessión</Link>
      </Grid>
    </form>
  );
}
