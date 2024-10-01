import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import OneDay from './pages/OneDay';
import OneMonth from './pages/OneMonth';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/one-day" element={<OneDay />} />
        <Route path="/one-month" element={<OneMonth />} />
      </Routes>
    </Router>
  );
};

export default App;
