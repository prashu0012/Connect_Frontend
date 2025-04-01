import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../lib/axios";
import { useProductStore } from "../stores/useProductStore";

const ProductDetail = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useProductStore();

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get(`/product/${id}`)
      .then((response) => {
        setProduct(response.data.product);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setError("Failed to load product details");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center text-lg font-semibold mt-4">Loading product details...</p>;
  if (error) return <h2 className="text-center text-red-500 text-xl">{error}</h2>;
  if (!product) return <p className="text-center text-lg mt-4">Product not found</p>;

  const isOnSale = product.originalPrice && product.price < product.originalPrice;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Image */}
        <div className="md:w-1/2">
          <img
            src={product.image || "/default.jpg"}
            alt={product.name}
            className="w-full object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          
          {/* Price */}
          <div className="flex items-center gap-3 mb-6">
            {isOnSale && (
              <span className="text-gray-400 text-xl line-through">₹{product.originalPrice}</span>
            )}
            <span className="text-2xl font-semibold">₹{product.price}</span>
            {isOnSale && (
              <span className="bg-red-600 text-white text-sm px-2 py-1 rounded">
                Sale
              </span>
            )}
          </div>
          
          {/* Description */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{product.description || "No description available."}</p>
          </div>
          
          {/* Add to Cart Button */}
          <button
            onClick={() => addToCart(product)}
            className="w-full md:w-auto border border-black text-black px-8 py-3 rounded-none hover:border-2 transition-all duration-300"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;