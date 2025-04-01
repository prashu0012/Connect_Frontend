import { useCart } from "../context/CartContext";
import { FaTrash } from "react-icons/fa";

const CartItem = ({ product }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="grid grid-cols-3 items-center py-4 border-b">
      <div className="flex items-center gap-4">
        <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-md" />
        <div>
          <p className="font-medium">{product.name}</p>
          <p className="text-gray-500">₹ {product.price}</p>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <button
          onClick={() => updateQuantity(product.id, -1)}
          className="border px-3 py-1 text-lg"
        >
          −
        </button>
        <span className="px-4">{product.quantity}</span>
        <button
          onClick={() => updateQuantity(product.id, 1)}
          className="border px-3 py-1 text-lg"
        >
          +
        </button>
      </div>

      <div className="flex justify-between items-center">
        <p className="font-semibold">₹ {product.price * product.quantity}</p>
        <button onClick={() => removeFromCart(product.id)} className="text-red-500">
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default CartItem;