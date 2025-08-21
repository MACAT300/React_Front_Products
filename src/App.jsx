import { BrowserRouter, Routes, Route } from "react-router";
import { Toaster } from "sonner";
import Products from "./pages/Products";
import ProductAdd from "./pages/ProductAdd";
import ProductEdit from "./pages/ProductEdit";
import CartPage from "./pages/CartPage";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/products/new" element={<ProductAdd />} />
        <Route path="/products/:id/edit" element={<ProductEdit />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
