import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LoadingScreen from './pages/LoadingScreen';
import ResultsPage from './pages/ResultsPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/loading" element={<LoadingScreen />} />
      <Route path="/results" element={<ResultsPage />} />
    </Routes>
  );
};

export default App;
