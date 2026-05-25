import { axiosInstance } from './axios';

export async function signOut(): Promise<void> {
  await axiosInstance.post('/v1/auth/signout', {});
}
