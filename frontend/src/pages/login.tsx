import LoginForm from '../features/login/components/LoginForm';
import { Container, Box } from '@mui/material';
import LoginFormHeader from '@/features/login/components/LoginFormHeader';
import MainLayout from '@/features/commons/main-layout/MainLayout';
import { LoginFormState, LoginResponse } from '@/features/login/models/login.type';
import useFetchAndLoad from '@/hooks/useFetchAndLoad';
import { doLogin } from '@/features/login/services/login.service';
import ToastsManager from '@/utilities/toasts.manager';
import { AuthSession } from '@/models';
import { setCredentials } from '@/redux/slices/auth.slice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { ROUTER_LINK_EMPLOYEES } from '@/constants/routes-link.constants';
import { AxiosError, isAxiosError } from 'axios';

export default function LoginPage() {
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
    router.push(ROUTER_LINK_EMPLOYEES);
  };

  const onSubmit = async (data: LoginFormState) => {
    try {
      const response = await callEndpoint<LoginResponse>(doLogin(data));
      setSesion(response.data);
    } catch (error: any) {
      if (isAxiosError(error)) {
        const err = error as AxiosError<{ message: string; error?: string }>;

        if (err.response) {
          if (err.response.status === 422) {
            const errorMessage = err.response.data.error || err.response.data.message || 'Validation error occurred';
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
          <LoginFormHeader />
        </Box>
        <LoginForm onSubmit={onSubmit} loading={loading} />
      </Container>
    </MainLayout>
  );
}
