import Logo1 from '@/features/commons/Logo1';
import { Typography } from '@mui/material';

export default function RegisterFormHeader() {
  return (
    <>
      <Logo1 />
      <Typography component="h1" variant="h3" align="center" fontWeight="bold">
        Registrarme
      </Typography>
    </>
  );
}
