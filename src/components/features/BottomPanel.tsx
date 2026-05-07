import { useEffect, useRef, useState } from 'react';
import { TbTrash } from 'react-icons/tb';
import { TfiSave } from 'react-icons/tfi';
import { Globe, Sparkles } from 'lucide-react';

import { Terminal } from '@xterm/xterm';
import '@xterm/xterm/css/xterm.css';

interface BottomPanelProps {
  onOpenWebPage?: () => void;
  terminalOutput?: string;
  onSave?: () => void;
  isAutoSaveEnabled: boolean;
  setIsAutoSaveEnabled: (val: boolean) => void;
  /** 하단 브레드크럼 (예: C: > Users > ... > index.html) */
  breadcrumbPath?: string;
}

const BottomPanel = ({
  onOpenWebPage,
  terminalOutput = '',
  onSave,
  isAutoSaveEnabled,
  setIsAutoSaveEnabled,
  breadcrumbPath = '',
}: BottomPanelProps) => {
  const [bottomTab, setBottomTab] = useState<'log' | 'command'>('log');

  const terminalDivRef = useRef<HTMLDivElement | null>(null);
  const terminalRef = useRef<Terminal | null>(null);

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

  useEffect(() => {
    if (terminalOutput && terminalRef.current) {
      terminalRef.current.writeln(terminalOutput);
    }
  }, [terminalOutput]);

  return (
    <div className="flex flex-col border-x-[0.5px] border-t-[0.5px] border-gray-200 bg-white">
      <div className="flex flex-wrap items-center gap-2 border-b border-gray-100 px-3 py-2.5">
        <button
          type="button"
          onClick={() => onOpenWebPage?.()}
          className="inline-flex items-center gap-2 rounded-xl bg-[#1890FF] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#1677d9]"
        >
          <Globe className="h-4 w-4" />
          웹 페이지 열기
        </button>
        <button
          type="button"
          onClick={() => terminalRef.current?.writeln('\x1b[35m[AI 셀프 채점] 준비 중입니다.\x1b[0m')}
          className="inline-flex items-center gap-2 rounded-xl border border-violet-200 bg-white px-4 py-2 text-sm font-semibold text-violet-700 transition-colors hover:bg-violet-50"
        >
          <Sparkles className="h-4 w-4 text-violet-500" />
          AI 셀프 채점
        </button>
      </div>

      <div className="flex items-center justify-between border-b border-gray-100 px-3 py-1.5">
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => setBottomTab('log')}
            className={`rounded-lg px-3 py-1 text-xs font-semibold ${
              bottomTab === 'log' ? 'bg-neutral-150 text-neutral-900' : 'text-neutral-500 hover:bg-neutral-100'
            }`}
          >
            로그
          </button>
          <button
            type="button"
            onClick={() => setBottomTab('command')}
            className={`rounded-lg px-3 py-1 text-xs font-semibold ${
              bottomTab === 'command'
                ? 'bg-neutral-150 text-neutral-900'
                : 'text-neutral-500 hover:bg-neutral-100'
            }`}
          >
            명령어
          </button>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden text-xs text-gray-600 sm:inline">자동 저장</span>
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              className="peer sr-only"
              checked={isAutoSaveEnabled}
              onChange={() => setIsAutoSaveEnabled(!isAutoSaveEnabled)}
            />
            <div className="h-5 w-10 rounded-full bg-gray-300 transition peer-checked:bg-blue-500" />
            <div className="absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white transition-all peer-checked:translate-x-5" />
          </label>
          <button
            type="button"
            onClick={() => onSave?.()}
            className="rounded p-1.5 hover:bg-gray-100"
            title="저장"
          >
            <TfiSave className="h-4 w-4 text-gray-620 stroke-[0.5]" />
          </button>
          <button type="button" className="rounded p-1.5 hover:bg-gray-100" title="터미널 비우기">
            <TbTrash className="h-5 w-5 text-gray-620" />
          </button>
        </div>
      </div>

      <div className="flex min-h-[10rem] flex-col border-b border-gray-100">
        <div className="flex items-center gap-2 border-b border-gray-50 px-3 py-1.5 text-xs font-semibold text-neutral-600">
          <span className="font-mono text-neutral-400">&lt;/&gt;</span>
          실행 결과
        </div>
        <div
          ref={terminalDivRef}
          id="terminal"
          className={`min-h-[8.5rem] w-full flex-1 overflow-y-auto bg-white px-1 py-1 ${bottomTab !== 'log' ? 'hidden' : ''}`}
        />
        <div
          className={`min-h-[8.5rem] flex-1 overflow-y-auto bg-neutral-50 px-3 py-2 text-sm text-neutral-600 ${bottomTab !== 'command' ? 'hidden' : ''}`}
        >
          명령어 입력 영역은 추후 연결됩니다.
        </div>
      </div>

      {breadcrumbPath ? (
        <div className="truncate px-3 py-1.5 font-mono text-[11px] text-neutral-500">{breadcrumbPath}</div>
      ) : null}
    </div>
  );
};

export default BottomPanel;
