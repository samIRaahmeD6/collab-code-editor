import { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { io } from 'socket.io-client';

function App() {
  const [code, setCode] = useState('// start typing...\nfunction hello() {\n  console.log("hello world");\n}');
  const socketRef = useRef(null);
  const isRemoteChange = useRef(false);

  useEffect(() => {
    const socket = io('http://localhost:4000');
    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('Connected:', socket.id);
    });

    // when another client sends code, update our editor
    socket.on('receive-code-change', (newCode) => {
      isRemoteChange.current = true;
      setCode(newCode);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  function handleChange(value) {
    setCode(value);

    // don't re-broadcast a change that just came IN from someone else
    if (isRemoteChange.current) {
      isRemoteChange.current = false;
      return;
    }

    socketRef.current?.emit('code-change', value);
  }

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Editor
        height="100%"
        defaultLanguage="javascript"
        theme="vs-dark"
        value={code}
        onChange={handleChange}
        options={{ fontSize: 14, minimap: { enabled: true }, automaticLayout: true }}
      />
    </div>
  );
}

export default App;