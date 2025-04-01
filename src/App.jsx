import { Routes, Route } from "react-router-dom"; 
import HomePage from "./pages/Homepage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import Cart from "./pages/Cart"; 
import Navbar from "./components/Navbar";
import AdminDashboard from "./components/AdminDashboard";
import Hero from "./components/Hero";
import ProductList from "./components/ProductList";
import { CartProvider } from "./context/CartContext"; 
import ProductDetail from "./pages/ProductDetail";

function App() {
  return (
    <CartProvider>
      <Navbar />
      <div className="mt-[100px] min-h-screen">
        <Hero />
        <ProductList />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="*" element={<h1 className="text-center mt-10">404 Not Found</h1>} />
        </Routes>
      </div>
    </CartProvider>
  );
}

export default App;
