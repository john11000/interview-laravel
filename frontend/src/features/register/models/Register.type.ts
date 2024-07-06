export interface RegisterFormState {
  name: string;
  email: string;
  password: string;
}


export interface RegisterResponse {
  firstName: string;
  lastName: string;
  accessToken: string;
  role: string;
  email: string;
}
