import { Routes, Route } from "react-router-dom"; 
import HomePage from "./pages/Homepage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import Cart from "./pages/Cart"; 
import Navbar from "./components/Navbar";
import AdminDashboard from "./components/AdminDashboard";
// import Hero from "./components/Hero";
// import ProductList from "./components/ProductList";
import { CartProvider } from "./context/CartContext"; 
import ProductDetail from "./pages/ProductDetail";
import Footer from "./footers/footer";
import GlobalCurrencySelector from "./footers/currency";
import { BrowserRouter as Router } from "react-router-dom";
//import ProductList from "./components/ProductList";
import AllProducts from "./components/AllProducts";

import PrivacyPolicy from "./pages/PrivacyPolicy";
import ShippingPolicy from "./pages/ShippingPolicy";
import TermsOfService from "./pages/TermsOfService";
import RefundPolicy from "./pages/RefundPolicy";
import Contact from "./pages/Contact";
// import Blog from './pages/Blog';
// import BlogPost from "./pages/BLogPost";
import DeityProducts from "./pages/DeityProducts";
import OurStory from "./pages/ourStory";
import GodProductsPage from "./pages/GodProducts";

import CategoryProducts from "./pages/CategoryProducts";



function App() {
  return (
    <CartProvider>
      <GlobalCurrencySelector />
      <Navbar />
      <div className="mt-[100px] min-h-screen">
        {/* <Hero />
        <ProductList /> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetail />} />

          <Route path="/deity/:name" element={<DeityProducts />} />
          <Route path="/:category" element={<CategoryProducts />} />

          <Route path="/god/:godName" element={<GodProductsPage />} />
           
          <Route path="/collection/allproduct" element={<AllProducts />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
           <Route path="/contact" element={<Contact />} />
           {/* <Route path="/blog" element={<Blog />} />
           <Route path="/blog/:id" element={<BlogPost />} /> */}
           <Route path="/our-story" element={<OurStory />} />
        
          <Route path="*" element={<h1 className="text-center mt-10">404 Not Found</h1>} />
        </Routes>
      </div>

      <div>
          <Footer/>
      </div>
    </CartProvider>
  );
}

export default App;
