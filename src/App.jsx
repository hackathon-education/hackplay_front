import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import CoursesPage from './pages/CoursesPage';
import ProjectsPage from './pages/ProjectsPage';
import LoginPage from './pages/LoginPage';
import Header from './components/Header';
import Footer from './components/Footer';
import FrontBeginnerPage from "./pages/FrontBeginnerPage.jsx";
import TeamProjectPage from "./pages/TeamProjectPage.jsx";
import BasicLearningPage from "./pages/BasicLearningPage.jsx";
import ToolPage from "./pages/ToolPage.jsx";
import GitPage from "./pages/GitPage.jsx";

function App() {
    return (
        <BrowserRouter>
            <Header />
            <main style={{ flexGrow: 1 }}>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/courses" element={<CoursesPage />} />
                    <Route path="/projects" element={<ProjectsPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/front/beginner" element={<FrontBeginnerPage />} />
                    <Route path="/front/beginner/team-project" element={<TeamProjectPage />} />
                    <Route path="/front/basic-learning" element={<BasicLearningPage />} />
                    <Route path="/front/basic/git" element={<GitPage />} />
                    <Route path="/front/basic/tool" element={<ToolPage />} />
                </Routes>
            </main>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
