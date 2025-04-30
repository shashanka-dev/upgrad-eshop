import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router';
import NavBar from './components/navbar/NavBar';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import AddProduct from './components/products/AddProduct';
import Products from './components/products/Products';

import ProductList from './components/products/ProductList';
import CategoryTabs from './components/products/CategoryTabs';
import EditProduct from './components/products/EditProduct';
import ProductDetails from './components/products/ProductDetails';
import CreateOrder from './components/CreateOrder';
import AddressForm from './components/AddressForm';
const App = () => {
  
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isAdmin, setIsAdmin] = useState(true);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  const handleSearch = async (query) => {
    const response = await fetch(`https://dev-project-ecommerce.upgrad.dev/api/products?search=${query}`);
    const data = await response.json();
    console.log(data);
    
  };
  
  console.log("appadmin:"+isAdmin);
  console.log("applog:"+isLoggedIn);
  return (
    <Router>
      <NavBar isLoggedIn={isLoggedIn} isAdmin={isAdmin} onLogout={handleLogout} onSearch={handleSearch} />
      <Routes>
       <Route path="/" element={isLoggedIn ? <Products /> : <Navigate to="/login" />} />
        <Route path="/login"   element={<Login setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} isAdmin={isAdmin}/>} />
     
        <Route path="/products"   element={isLoggedIn ? <Products isAdmin={isAdmin} /> : <Navigate to="/login" />} />
        <Route path="/signup" element={<Signup />} />
       <Route path="/add-products" element={<AddProduct  /> }/>
      
        <Route path="/productlist" element={<ProductList  /> }/>
        <Route path="/categorytabs" element={<CategoryTabs  /> }/>
        <Route path="/edit/:id" element={<EditProduct />} />
        <Route path="/ProductDetails/:id" element={<ProductDetails/>} />
        <Route path="/CreateOrder" element={<CreateOrder />} />
        <Route path="/AddressForm" element={<AddressForm />} />
      </Routes>
    </Router>
  );
};

export default App;