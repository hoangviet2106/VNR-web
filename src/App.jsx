import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AudioProvider } from './context/AudioContext.jsx';
import { ProgressProvider } from './context/ProgressContext.jsx';
import ConsolePage from './pages/ConsolePage.jsx';
import TravelPage from './pages/TravelPage.jsx';
import EraPage from './pages/EraPage.jsx';
import QuizPage from './pages/QuizPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

export default function App() {
  return (
    <AudioProvider>
      <ProgressProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ConsolePage />} />
            <Route path="/travel/:year" element={<TravelPage />} />
            <Route path="/era/:year" element={<EraPage />} />
            <Route path="/era/:year/quiz" element={<QuizPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </ProgressProvider>
    </AudioProvider>
  );
}
