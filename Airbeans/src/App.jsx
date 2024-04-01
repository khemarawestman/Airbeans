import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import AboutPage from './components/AboutPage/AboutPage';
import Cart from './components/Cart/Cart';
import Products from './components/Products/Products';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <HomePage />
            <Products />
            <Cart/>
           
          </>
        } />
        <Route path="/about" element={<AboutPage />} />
       
      </Routes>
    </Router>
  );
}

export default App;
