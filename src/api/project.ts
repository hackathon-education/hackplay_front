import { axiosInstance } from './axios';

// 프로젝트 생성 요청 타입
interface CreateProjectRequest {
  name: string;
  description?: string;
  templateType: string;
  isPublic: boolean;
  lecture: string;
}

// 프로젝트 생성 응답 타입
interface CreateProjectResponse {
  code: number;
  message: string;
  data: null;
}

/**
 * 프로젝트 생성 API
 * @param projectData 프로젝트 생성 데이터
 * @returns 프로젝트 생성 응답
 */
export const createProject = async (
  projectData: CreateProjectRequest,
): Promise<CreateProjectResponse> => {
  const response = await axiosInstance.post<CreateProjectResponse>('/v1/projects', projectData);
  return response.data;
};
