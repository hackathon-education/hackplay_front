// main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';  // ✅ App만 import

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />   {/* ✅ MainPage 쓰지 말고 App만! */}
    </StrictMode>
);
