import React from "react";
import { useProductStore } from "../stores/useProductStore";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  // const { addToCart } = useProductStore();
  const isOnSale = product.originalPrice && product.price < product.originalPrice;
  const navigate = useNavigate();

  // ✅ Corrected Navigation with Proper String Interpolation
  const goToProductDetails = () => {
    navigate(`/product/${product._id}`);
  };

  const addToCart = async (id) => {
    const productId = id;
    const quantity=1;
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/cart`, { quantity, productId }, { withCredentials: true });
      console.log("cart..\n", response);
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  return (
    <div
      className="w-[220px] text-center flex-shrink-0 relative first:ml-0 cursor-pointer group"
      onClick={goToProductDetails}
    >
      {isOnSale && (
        <span className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
          Sale
        </span>
      )}

      <div className="overflow-hidden rounded-none">
        <img
          src={product.image || "/default.jpg"}
          alt={product.name || "Product"}
          className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      <h3 className="text-md font-normal mt-2 transition-all duration-300 group-hover:underline">
        {product.name || "No Name"}
      </h3>

      <div className="flex items-center justify-center gap-2 mt-1">
        {product.originalPrice && (
          <span className="text-gray-400 text-sm line-through">₹{product.originalPrice}</span>
        )}
        <span className="text-lg font-semibold">₹{product.price || "N/A"}</span>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation(); // ✅ Prevents navigation when clicking the button
          addToCart(product._id);
        }}
        className="w-full border border-black text-black px-4 py-2 mt-3 rounded-none hover:border-2 transition-all duration-300"
      >
        Add to cart
      </button>
    </div>
  );
};

export default ProductCard;
