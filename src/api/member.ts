import { axiosInstance } from './axios';

import { JobKey } from '@/constants/jobTypes';

export interface MemberProfile {
  nickname: string;
  email: string;
  role: JobKey;
  profileImageUrl?: string;
}

type ApiEnvelope<T> = {
  code: number;
  message: string;
  data: T;
};

export async function changeMyPassword(body: {
  currentPassword: string;
  newPassword: string;
  checkNewPassword: string;
}): Promise<ApiEnvelope<null>> {
  const res = await axiosInstance.patch<ApiEnvelope<null>>('/v1/members/password', body);
  return res.data;
}

export async function withdrawMember(): Promise<ApiEnvelope<null>> {
  const res = await axiosInstance.delete<ApiEnvelope<null>>('/v1/members');
  return res.data;
}

