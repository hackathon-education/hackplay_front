import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';

function FrontIntermediatePage() {
  const navigate = useNavigate();

  const goToTeamProject = () => {
    navigate(ROUTES.COURSES.LECTURE_MAIN('fe', 'intermediate', 'team-project'));
  };

  return (
    <div className="page-container">
      <h2>2-1-1. 초급 학습 페이지</h2>
      <div className="tab-wrapper">
        <div className="level-tab level-intermediate locked">
          front 기초 언어 (HTML/CSS/JS) 강의 - 추후 개발 🔒
        </div>
        <div
          className="level-tab level-beginner active"
          onClick={goToTeamProject}
          style={{ cursor: 'pointer' }}
        >
          실전 Team Project 해보기 강의
        </div>
      </div>
      <div className="tab-content">
        <p>React로 실제 프론트 MVP를 만드는 실습 강의가 이곳에 제공될 예정입니다.</p>
      </div>
    </div>
  );
}

export default FrontIntermediatePage;
