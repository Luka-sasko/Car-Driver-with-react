import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './functions/Home';
import Driver from './functions/Driver';
import Navbar from './functions/Navbar';
import CarDriver from "./functions/CarDriver";

import './styles/Home.css';
import './styles/Update.css';


function App() {
  return (
    <Router>
      <div className="App">
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/car" element={<Home />} />
          <Route path="/driver" element={<Driver />} />
          <Route path="/CarDriver" element={<CarDriver />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
