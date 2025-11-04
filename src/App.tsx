import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import LoadingScreen from './pages/LoadingScreen';
import ResultsPage from './pages/ResultsPage';
import type { BookshelfAnalysis } from './services/types';

const App: React.FC = () => {
  const [result, setResult] = useState<BookshelfAnalysis | null>(null);
  const navigate = useNavigate();

  const handleComplete = (data: BookshelfAnalysis) => {
    setResult(data);
    navigate('/results');
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/loading" element={<LoadingScreen onComplete={handleComplete} />} />
      <Route path="/results" element={<ResultsPage result={result} />} />
    </Routes>
  );
};

export default App;
