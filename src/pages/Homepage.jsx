import React, { useEffect, useState, useRef } from "react";
import axios from "../lib/axios"; 
import ProductCard from "../components/ProductCard";
import Hero from "../components/Hero";
import ProductList from "../components/ProductList";


const HomePage = () => {
  const [products, setProducts] = useState([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <>
      <Hero></Hero>
      <ProductList></ProductList>
      <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Our Products</h2>

      <div className="relative">
        <button
          onClick={scrollLeft}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md z-10"
        >
          ◀
        </button>

        <div
          ref={sliderRef}
          className="flex overflow-x-auto scrollbar-hide space-x-4 scroll-smooth"
        >
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <p className="text-gray-500 text-center w-full">Loading products...</p>
          )}
        </div>

        <button
          onClick={scrollRight}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md z-10"
        >
          ▶
        </button>
      </div>
    </div>
    </>
  );
};

export default HomePage;
