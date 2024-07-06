import RegisterForm from '../features/Register/components/RegisterForm';
import { Container, Box } from '@mui/material';
import RegisterFormHeader from '@/features/Register/components/RegisterFormHeader';
import MainLayout from '@/features/commons/main-layout/MainLayout';
import { RegisterFormState, RegisterResponse } from '@/features/Register/models/Register.type';
import useFetchAndLoad from '@/hooks/useFetchAndLoad';
import { doRegister } from '@/features/Register/services/Register.service';
import ToastsManager from '@/utilities/toasts.manager';
import { AuthSession } from '@/models';
import { setCredentials } from '@/redux/slices/auth.slice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { ROUTER_LINK_TIMESHEETS } from '@/constants/routes-link.constants';
import { AxiosError, isAxiosError } from 'axios';

export default function RegisterPage() {
  const { loading, callEndpoint } = useFetchAndLoad();
  const dispatcher = useDispatch();
  const router = useRouter();

  const setSesion = (newSession: any) => {
    const newCredentials: AuthSession = {
      accessToken: newSession.access_token,
      user: {
        email: newSession.email,
        role: newSession.role,
      },
    };

    dispatcher(setCredentials(newCredentials));
    router.push('/login');
  };

  const onSubmit = async (data: RegisterFormState) => {
    try {
      const response = await callEndpoint<RegisterResponse>(doRegister(data));
      setSesion(response.data);
    } catch (error: any) {
      if (isAxiosError(error)) {
        const err = error as AxiosError<{ message: string; error?: string }>;

        if (err.response) {
          if (err.response.status === 422) {
            const errorMessage = err.response.data?.error || err.response.data?.message || 'Validation error occurred';
            ToastsManager.showToast('error', errorMessage);
          } else if (err.response.status === 400) {
            ToastsManager.showToast('error', err.response.data.message);
          } else {
            ToastsManager.showToast('error', 'Ocurrió un error, contacte con soporte');
          }
        } else if (err.request) {
          ToastsManager.showToast('error', 'Error al conectar con el servidor.');
        } else {
          ToastsManager.showToast('error', err.message);
        }
      } else {
        ToastsManager.showToast('error', error?.message);
      }
      console.error(error);
    }
  };

  return (
    <MainLayout>
      <Container component="main" maxWidth="xs">
        <Box my={4}>
          <RegisterFormHeader />
        </Box>
        <RegisterForm onSubmit={onSubmit} loading={loading} />
      </Container>
    </MainLayout>
  );
}
