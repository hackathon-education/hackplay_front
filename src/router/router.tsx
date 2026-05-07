import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';

import ProtectedRoute from '@/components/ProtectedRoute';
import PublicRoute from '@/components/PublicRoute';
import ScrollToTop from '@/components/ScrollToTop';
import AuthLayout from '@/components/layout/AuthLayout';
import MainLayout from '@/components/layout/MainLayout';
import { ROUTES } from '@/constants/routes';
import BasicLearningPage from '@/pages/BasicLearningPage';
import CodeEditorPage from '@/pages/CodeEditorPage';
import CoursesPage from '@/pages/CoursesPage';
import ErrorPage from '@/pages/ErrorPage';
import LectureDetailPage from '@/pages/LectureDetailPage';
import LectureListPage from '@/pages/LectureListPage';
import LectureMainPage from '@/pages/LectureMainPage';
import LoginPage from '@/pages/LoginPage';
import MainPage from '@/pages/MainPage';
import ProjectsPage from '@/pages/ProjectsPage';
import SignupPage from '@/pages/SignupPage';

const RootLayout = () => (
  <>
    <ScrollToTop />
    <Outlet />
  </>
);

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      // 1. 메인 레이아웃 (헤더/네비게이션 포함)
      {
        element: <MainLayout />,
        children: [
          {
            path: ROUTES.MAIN,
            element: <MainPage />,
          },
          {
            path: ROUTES.COURSES.ROOT,
            element: <CoursesPage />,
          },
          {
            path: ROUTES.COURSES.LECTURE_LIST(':job', ':level'),
            element: <LectureListPage />,
          },
          {
            path: ROUTES.COURSES.LECTURE_MAIN(':job', ':level', ':lectureId'),
            element: <LectureMainPage />,
          },
          {
            path: ROUTES.COURSES.LECTURE_DETAIL(':job', ':level', ':lectureId'),
            element: <LectureDetailPage />,
          },
          {
            path: ROUTES.BASIC_LEARNING.ROOT,
            element: <BasicLearningPage />,
          },
          {
            path: ROUTES.BASIC_LEARNING.LECTURE_DETAIL(':lectureId'),
            element: <LectureDetailPage />,
          },
          {
            path: ROUTES.PROJECTS,
            element: <ProjectsPage />,
          },
        ],
      },
      // 코드 에디터 (헤더/푸터 없음)
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: ROUTES.WORKSPACE(':lectureId'),
            element: <CodeEditorPage />,
          },
        ],
      },
      // 2. 인증 레이아웃 (로그인, 회원가입 전용)
      {
        element: <PublicRoute />,
        children: [
          {
            element: <AuthLayout />,
            children: [
              {
                path: ROUTES.SIGNUP,
                element: <SignupPage />,
              },
              {
                path: ROUTES.SIGNIN,
                element: <LoginPage />,
              },
            ],
          },
        ],
      },
      {
        path: '*',
        element: <ErrorPage />,
      },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
