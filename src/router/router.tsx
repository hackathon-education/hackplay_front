import { Route, Routes } from 'react-router-dom';

import ProtectedRoute from '@/components/ProtectedRoute';
import PublicRoute from '@/components/PublicRoute';
import Layout from '@/components/Layout';
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

const Router = () => {
  return (
    <Routes>
      {/* 헤더/푸터가 있는 페이지들 */}
      <Route element={<Layout />}>
        <Route path={ROUTES.MAIN} element={<MainPage />} />

        {/* Auth */}
        <Route element={<PublicRoute />}>
          <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
          <Route path={ROUTES.SIGNIN} element={<LoginPage />} />
        </Route>

        {/* 단계별 학습 */}
        <Route path={ROUTES.COURSES.ROOT} element={<CoursesPage />} />
        <Route path={ROUTES.COURSES.LECTURE_LIST(':job', ':level')} element={<LectureListPage />} />
        <Route
          path={ROUTES.COURSES.LECTURE_MAIN(':job', ':level', ':lectureId')}
          element={<LectureMainPage />}
        />
        <Route
          path={ROUTES.COURSES.LECTURE_DETAIL(':job', ':level', ':lectureId')}
          element={<LectureDetailPage />}
        />

        {/* 코드 에디터 */}
        <Route element={<ProtectedRoute />}>
          <Route path={ROUTES.WORKSPACE(':lectureId')} element={<CodeEditorPage />} />
        </Route>

        {/* 기초 학습 */}
        <Route path={ROUTES.BASIC_LEARNING.ROOT} element={<BasicLearningPage />} />
        <Route
          path={ROUTES.BASIC_LEARNING.LECTURE_DETAIL(':lectureId')}
          element={<LectureDetailPage />}
        />

        {/* 팀 프로젝트 */}
        <Route path={ROUTES.PROJECTS} element={<ProjectsPage />} />
      </Route>

      {/* 헤더/푸터가 없는 에러 페이지 */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default Router;