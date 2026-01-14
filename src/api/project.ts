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

// 파일 생성 요청 타입
interface CreateFileRequest {
  name: string;
  content: string;
  parentPath: string;
}

// 파일 생성 응답 타입
interface CreateFileResponse {
  code: number;
  message: string;
  data: null;
}

/**
 * 프로젝트 내 파일 생성 API
 * @param projectId 프로젝트 ID
 * @param fileData 파일 생성 데이터
 * @returns 파일 생성 응답
 */
export const createFile = async (
  projectId: string,
  fileData: CreateFileRequest,
): Promise<CreateFileResponse> => {
  const response = await axiosInstance.post<CreateFileResponse>(
    `/v1/projects/${projectId}/files`,
    fileData,
  );
  return response.data;
};

// 루트 디렉토리 트리 전체 조회 응답 타입
interface DirTreeNode {
  name: string;
  path: string;
  type: 'DIRECTORY' | 'FILE';
  children: DirTreeNode[];
}

interface GetDirTreeResponse {
  code: number;
  message: string;
  data: DirTreeNode;
}

/**
 * 루트 디렉토리 전체 트리 전채 조회
 * @param projectId 프로젝트 ID
 */
export const getProjectDirTree = async (projectId: string): Promise<GetDirTreeResponse> => {
  const response = await axiosInstance.get<GetDirTreeResponse>(
    // `/v1/projects/${projectId}/dirs/tree`,
    `/v1/projects/5/dirs/tree`, // 임시 하드코딩
  );
  return response.data;
};

// 파일 내용 수정 요청 타입
interface UpdateFileContentRequest {
  path: string;
  content: string;
}

// 파일 내용 수정 응답 타입
interface UpdateFileContentResponse {
  code: number;
  message: string;
  data: null;
}

/**
 * 프로젝트 내 파일 내용 수정 API
 * @param projectId 프로젝트 ID
 * @param fileData 파일 수정 데이터 (path, content)
 * @returns 파일 수정 응답
 */
export const updateFileContent = async (
  projectId: string,
  fileData: UpdateFileContentRequest,
): Promise<UpdateFileContentResponse> => {
  const response = await axiosInstance.patch<UpdateFileContentResponse>(
    // `/v1/projects/${projectId}/files`,
    `/v1/projects/5/files`, // 임시 하드코딩
    fileData,
  );
  return response.data;
};

// 파일 조회 요청 타입
interface GetFileRequest {
  path: string;
}

// 파일 조회 응답 타입
interface GetFileResponse {
  code: number;
  message: string;
  data: {
    name: string;
    path: string;
    size: number;
    content: string;
  };
}

/**
 * 파일 조회 API
 * @param projectId 프로젝트 ID
 * @param filePath 파일 경로
 * @returns 파일 조회 응답
 */
export const getFile = async (projectId: string, filePath: string): Promise<GetFileResponse> => {
  const response = await axiosInstance.get<GetFileResponse>(
    // `/v1/projects/${projectId}/files`,
    `/v1/projects/5/files`, // 임시 하드코딩
    {
      params: { path: filePath.startsWith('/') ? filePath.slice(1) : filePath },
    },
  );
  return response.data;
};
