import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem.jsx";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart } = useCart();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty</p>
      ) : (
        <div>
          <div className="grid grid-cols-3 text-gray-500 font-semibold py-2 border-b">
            <div>Product</div>
            <div>Quantity</div>
            <div>Total</div>
          </div>

          <button
            className="bg-black text-white py-3 px-8 font-medium hover:bg-gray-800 transition-colors duration-300"
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;