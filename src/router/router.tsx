import { Route, Routes } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import BasicLearningPage from '@/pages/BasicLearningPage';
import CoursesPage from '@/pages/CoursesPage';
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
      {/* 메인 */}
      <Route path={ROUTES.MAIN} element={<MainPage />} />

      {/* Auth */}
      <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
      <Route path={ROUTES.SIGNIN} element={<LoginPage />} />

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

      {/* 기초 학습 */}
      <Route path={ROUTES.BASIC_LEARNING.ROOT} element={<BasicLearningPage />} />
      <Route
        path={ROUTES.BASIC_LEARNING.LECTURE_DETAIL(':lectureId')}
        element={<LectureDetailPage />}
      />

      {/* 팀 프로젝트 */}
      <Route path={ROUTES.PROJECTS} element={<ProjectsPage />} />
    </Routes>
  );
};

export default Router;
