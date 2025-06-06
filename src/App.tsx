import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '@/pages/Home/Home';
import Login from '@/pages/Login/Login';
import Signup from '@/pages/Signup/Signup';
import Forgot from '@/pages/Login/Fogot';
import Categories from '@/pages/Categories/Categories';
import NewReleases from '@/pages/NewReleases/NewReleases';
import BestSellers from '@/pages/BestSellers/BestSellers';
import Wishlist from '@/pages/Wishlist/Wishlist';
import Cart from '@/pages/Cart/Cart';
import Account from '@/pages/Account/Account';
import BookDetail from '@/pages/BookDetail/BookDetail';
import PaymentPage from '@/pages/Payment/Payment';
import Admin from '@/pages/Admin/Admin';
import AddBook from '@/pages/Admin/AddBook';
import OrdersManagement from '@/pages/Admin/OrdersManagement';
import AdminLogin from '@/pages/Admin/AdminLogin';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<Forgot />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/new-releases" element={<NewReleases />} />
        <Route path="/bestsellers" element={<BestSellers />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/account" element={<Account />} />
        <Route path="/book/:id" element={<BookDetail />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/add-book" element={<AddBook />} />
        <Route path="/admin/orders" element={<OrdersManagement />} />
        <Route path="/admin/login" element={<AdminLogin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
