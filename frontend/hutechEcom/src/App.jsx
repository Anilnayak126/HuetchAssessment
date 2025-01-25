import React from 'react';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Homepage from './components/Homepage';
import Login from './components/Login';

import { Routes, Route } from 'react-router-dom';
import Products from './components/Products';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Confirmation from './components/Confirmation';



function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout/>} />
        <Route path="/confirmation" element={<Confirmation/>} />  
        
        
      </Routes>
    </div>
  );
}

export default App;
