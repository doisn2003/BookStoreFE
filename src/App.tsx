import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router';
import Home from '@pages/Home/Home';
import Login from '@pages/Login/Login';
import Signup from '@/pages/Signup/Signup';
import Fogot from '@/pages/Login/Fogot';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<Fogot />} />
      </Routes>
    </Router>
  );
};

export default App;
