// src/App.tsx
import { HashRouter, Routes, Route } from 'react-router-dom';
import RoutinePreview from './pages/RoutinePreview';

function App() {
    return (
        <HashRouter>
            <Routes>
                {/* URL yapısı: domain.github.io/proje/#/r/aX8z2 */}
                <Route path="/r/:key" element={<RoutinePreview />} />
                <Route path="/" element={<div>Antrenman Takip Sistemi Paylaşım Sayfası</div>} />
            </Routes>
        </HashRouter>
    );
}

export default App;