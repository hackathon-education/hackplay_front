import Editor from '@monaco-editor/react';
import { useEffect, useRef } from 'react';

interface CodeEditorProps {
  value: string;
  language?: string;
  path: string;
  onChange: (value: string | undefined) => void;
  onSave?: () => void;
}

const CodeEditor = ({ value, language, path, onChange, onSave }: CodeEditorProps) => {
  const editorRef = useRef<any>(null);

  // 파일 확장자로 언어 자동 감지
  const detectLanguage = (filePath: string): string => {
    const ext = filePath.split('.').pop()?.toLowerCase();
    const languageMap: Record<string, string> = {
      js: 'javascript',
      jsx: 'javascript',
      ts: 'typescript',
      tsx: 'typescript',
      html: 'html',
      css: 'css',
      json: 'json',
      py: 'python',
      java: 'java',
      cpp: 'cpp',
      c: 'c',
      md: 'markdown',
    };
    return language || languageMap[ext || ''] || 'plaintext';
  };

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;

    // Ctrl+S 또는 Cmd+S로 저장
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      if (onSave) {
        onSave();
      }
    });
  };

  useEffect(() => {
    // 에디터 포커스
    if (editorRef.current) {
      editorRef.current.focus();
    }
  }, [path]);

  return (
    <div className="h-full w-full">
      <Editor
        height="100%"
        language={detectLanguage(path)}
        value={value}
        onChange={onChange}
        onMount={handleEditorDidMount}
        theme="vs"
        options={{
          fontSize: 14,
          minimap: { enabled: true },
          scrollBeyondLastLine: false,
          wordWrap: 'off',
          automaticLayout: true,
          tabSize: 2,
          insertSpaces: true,
          formatOnPaste: true,
          formatOnType: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;
