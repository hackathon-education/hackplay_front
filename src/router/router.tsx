import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';

import ProtectedRoute from '@/components/ProtectedRoute';
import PublicRoute from '@/components/PublicRoute';
import ScrollToTop from '@/components/ScrollToTop';
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
      {
        element: <Layout />,
        children: [
          {
            path: ROUTES.MAIN,
            element: <MainPage />,
          },
          {
            element: <PublicRoute />,
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
            element: <ProtectedRoute />,
            children: [
              {
                path: ROUTES.WORKSPACE(':lectureId'),
                element: <CodeEditorPage />,
              },
            ],
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
