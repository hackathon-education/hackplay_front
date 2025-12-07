import { useEffect, useRef, useState } from 'react';
import { TbTrash } from 'react-icons/tb';
import { TfiControlPlay, TfiControlStop, TfiSave } from 'react-icons/tfi';

import { Terminal } from '@xterm/xterm';
import '@xterm/xterm/css/xterm.css';

interface BottomPanelProps {
  onOpenWebPage?: () => void;
  terminalOutput?: string;
}

const BottomPanel = ({ onOpenWebPage, terminalOutput = '' }: BottomPanelProps) => {
  const [isTerminalExpanded, setIsTerminalExpanded] = useState(true);

  const terminalDivRef = useRef<HTMLDivElement | null>(null);
  const terminalRef = useRef<Terminal | null>(null);

  // 1. xterm 초기화
  useEffect(() => {
    const terminal = new Terminal({
      convertEol: true,
      fontSize: 13,
      fontFamily: 'Menlo, monospace',
      cursorBlink: true,
      scrollback: 5000,
      theme: {
        background: '#ffffff',
        foreground: '#1e1e1e',
      },
    });

    terminalRef.current = terminal;

    if (terminalDivRef.current) {
      terminal.open(terminalDivRef.current);
    }

    return () => {
      terminal.dispose();
    };
  }, []);

  // 2. terminalOutput prop 변화 시 출력
  useEffect(() => {
    if (terminalOutput && terminalRef.current) {
      terminalRef.current.writeln(terminalOutput);
    }
  }, [terminalOutput]);

  // 3. Run / Stop 출력 예시
  const handleRun = () => {
    terminalRef.current?.writeln('\x1b[32m[Run] Running...\x1b[0m');
  };

  const handleStop = () => {
    terminalRef.current?.writeln('\x1b[31m[Stop] Stopped.\x1b[0m');
  };

  return (
    <div className="flex flex-col bg-white">
      {/* 툴바 */}
      <div className="flex items-center justify-between px-[1.438rem] py-[1.094rem] border-x-[0.5px] border-gray-200">
        <div className="flex items-center gap-[1.188rem]">
          {/* <button onClick={onOpenWebPage}> */}
          <button onClick={handleRun}>
            <TfiControlPlay className="w-4.5 h-4.5 text-gray-620 stroke-[0.5]" />
          </button>
          <button
            onClick={handleStop}
          >
            <TfiControlStop className="w-4.5 h-4.5 text-gray-620 stroke-[0.5]" />
          </button>
        </div>

        <div className="flex items-center gap-[1.188rem]">
          <button>
            <TfiSave className="w-4 h-4 text-gray-620 stroke-[0.5]" />
          </button>
          <button>
            <TbTrash className="w-5 h-5 text-gray-620" />
          </button>
        </div>
      </div>

      {/* 터미널 영역 */}
      <div className="flex h-[10.625rem] border-t-[0.5px] border-l-[0.5px] border-gray-200 pt-[0.563rem] px-[0.813rem]">
        {/* <button
          onClick={() => setIsTerminalExpanded(!isTerminalExpanded)}
          className="flex items-center justify-between px-4 py-2 bg-gray-50 hover:bg-gray-100 border-b border-gray-200"
        >
          <span className="text-xs text-gray-500">{isTerminalExpanded ? '' : ''}</span>
        </button> */}
        {isTerminalExpanded && (
          <div
            ref={terminalDivRef}
            id="terminal"
            className="bg-white w-full h-full overflow-y-auto"
          />
        )}
      </div>
    </div>
  );
};

export default BottomPanel;
