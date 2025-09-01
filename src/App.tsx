import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/Header';
import BasicLearningPage from './pages/BasicLearningPage';
import CoursesPage from './pages/CoursesPage';
import LectureDetailPage from './pages/LectureDetailPage';
import LectureListPage from './pages/LectureListPage';
import LectureMainPage from './pages/LectureMainPage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import ProjectsPage from './pages/ProjectsPage';
import SignupPage from './pages/SignupPage';

function App() {
  return (
    <div>
      <Router>
        <Header />
        <main className="flex-grow">
          <Routes>
            {/* 메인 */}
            <Route path="/" element={<MainPage />} />

            {/* Auth */}
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/signin" element={<LoginPage />} />

            {/* 단계별 학습 */}
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/:job/:level" element={<LectureListPage />} />
            <Route path="/courses/:job/:level/:lectureId" element={<LectureMainPage />} />
            <Route path="/courses/:job/:level/:lectureId/detail" element={<LectureDetailPage />} />

            {/* 기초 학습 */}
            <Route path="/learning/basic" element={<BasicLearningPage />} />
            <Route path="/learning/basic/:lectureId" element={<LectureDetailPage />} />

            {/* 팀 프로젝트 */}
            <Route path="/projects" element={<ProjectsPage />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
