import React, { useState } from 'react';
import './App.css';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Inventory} from "./components/Inventory";
import Header from './components/Header';
import Footer from './components/Footer'
import ProductPage from './pages/ProductPage'

function App() {

  const [cart, setCart] = useState([]);
  const inventory = Inventory;
  const cartLength = cart.length;


    
  const addToCart = (product) => {

    let productIndex = cart.findIndex((item) => item.id == product.id)
    if (productIndex !== -1) {
      const newCart = cart.slice();
      newCart[productIndex].quantity++
      setCart(newCart)
    } else {
      setCart(cart.concat(product))
    }
    console.log(cart)
  }

  const resetCart = () => {
    setCart([]);
  }

  const removeItem = (item) => {
    // let itemToRemove = cart.find((element) => element.id === item.id);
    setCart(cart.filter((element) => element.id !== item.id))
  }

    
  return (
    <div className='container'>
      <BrowserRouter basename= {process.env.PUBLIC_URL + '/'} >
        <Header cartLength={cartLength} />
        <Routes>
          <Route exact path="/products/:id" element={<ProductPage addToCart={addToCart} />} />
          <Route exact path="/shop" element={<Products addToCart={addToCart} inventory={inventory}/>} />
          <Route exact path="/cart" element={<Cart cart={cart} resetCart={resetCart} addToCart={addToCart} removeItem={removeItem}/>} />
          <Route exact path="/" element={<Home />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App;
