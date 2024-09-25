import React from 'react';
import NewsList from '../pages/NewsList/NewsList';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import NewsDetail from '../pages/NewsDetail/NewsDetail';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NewsList />} />
        <Route path="/news/:id" element={<NewsDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
