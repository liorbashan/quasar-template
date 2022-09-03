import { LoginData } from './../types/login-response.type';
import { api } from '../boot/axios';
import { AxiosResponse } from 'axios';

export const login = async (username: string, password: string): Promise<LoginData> => {
  const loginResponse: AxiosResponse = await api.post('/auth/login', { username, password }).catch((err: Error) => {
    console.log(err.message);
    throw err;
  });
  const loginData: LoginData = loginResponse.data;
  return loginData;
};
