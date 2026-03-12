import TerminalIcon from '@/assets/lecture/terminal-icon.svg?react';
import TriangleRightIcon from '@/assets/lecture/triangle-right-icon.svg?react';
import UnitLockIcon from '@/assets/lecture/unit-lock-icon.svg?react';

// --- Types ---
export interface UnitItemProps {
  id: string;
  title: string;
  type: 'Lesson' | 'Practice Lab';
  duration: number; // 분 단위
  isLocked?: boolean; // 임시 변수. TODO: 유닛 우측의 자물쇠 표시 기준 확인. 서버의 status로 변경
}

interface UnitItemComponentProps {
  unit: UnitItemProps;
}

const UnitItem = ({ unit }: UnitItemComponentProps) => {
  return (
    <div className="flex items-center justify-between pl-5.5 pr-6.5 h-[93px] hover:bg-card-hover-bg transition-colors">
      <div className="flex items-center gap-[21px]">
        {/* 아이콘 영역 */}
        <div className="w-[45px] h-[45px] rounded-10 bg-icon-bg flex items-center justify-center">
          {unit.type === 'Lesson' ? (
            <TriangleRightIcon className="w-[21px] h-[21px] translate-x-[3px] text-primary-500" />
          ) : (
            <TerminalIcon className="w-5 h-4" />
          )}
        </div>

        {/* 텍스트 정보 영역 */}
        <div className="flex flex-col gap-2">
          <span className="text-xl font-semibold text-text-meta">{unit.title}</span>
          <span className="flex items-center font-bold text-xs text-text-body">
            {unit.type}
            {/* TODO: 학습시간 측정 및 표기 시 주석 해제 (유닛, 챕터, 학습정보 카드) */}
            {/* <div className="ml-[5px] mr-1.5 w-[5px] h-[5px] rounded-full bg-card-border" /> */}
            {/* {formatUnitDuration(unit.duration)} */}
          </span>
        </div>
      </div>

      {/* 액션 버튼 영역 */}
      <div className="flex items-center">
        <div className="w-[45px] h-[45px] flex items-center justify-center">
          {unit.isLocked === false ? (
            // TODO: 학습 전인 유닛은 잠금 표시. 학습 중, 학습 완료 유닛은 재생 표시. 한 유닛이 학습 완료되면, 다음 유닛을 재생 표시로 바꿈
            <button
              type="button"
              className="flex items-center justify-center w-full h-full rounded-full bg-btn-default-bg shadow-4 cursor-pointer hover:bg-btn-default-bg-hover transition-all"
              // TODO: 해당 유닛의 코드 에디터 페이지로 이동하게 수정
              onClick={() => console.log(`${unit.title} 학습 시작`)}
            >
              <TriangleRightIcon className="w-4 h-4 text-btn-default-text translate-x-[3px]" />
            </button>
          ) : (
            <UnitLockIcon className="text-text-base stroke-current [stroke-opacity:0.3] stroke-[2px]" />
          )}
        </div>
      </div>
    </div>
  );
};

export default UnitItem;
