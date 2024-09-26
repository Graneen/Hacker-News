import React from 'react';
import NewsList from '../pages/NewsList/NewsList';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import NewsDetail from '../pages/NewsDetail/NewsDetail';
import { Provider } from 'react-redux';
import store from '../redux/store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<NewsList />} />
          <Route path="/news/:id" element={<NewsDetail />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
