import { BrowserRouter, Routes, Route } from "react-router";
import { Toaster } from "sonner";
import { CookiesProvider } from "react-cookie";

import Products from "./pages/Products";
import ProductAdd from "./pages/ProductAdd";
import ProductEdit from "./pages/ProductEdit";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import PaymentVerify from "./pages/PaymentVerify";
import OrderPage from "./pages/OrderPage";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import CategoriesPage from "./pages/CategoriesPage";

function App() {
  return (
    <CookiesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/products/new" element={<ProductAdd />} />
          <Route path="/products/:id/edit" element={<ProductEdit />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/verify-payment" element={<PaymentVerify />} />
          <Route path="/orders" element={<OrderPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </CookiesProvider>
  );
}

export default App;
