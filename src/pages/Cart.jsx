import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartItem, setCartItem] = useState([]);
  const [toggle, setToggle] = useState(1);
  const [totalAmount, setTotalAmount] = useState(0);

  const navigate = useNavigate();

  // fetch cart
  const fetchCartItem = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/cart`, { withCredentials: true });
      if (response.status === 200) {
        setCartItem(response.data);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  useEffect(() => {
    fetchCartItem();
  }, []);

  useEffect(() => {
    fetchCartItem();
  }, [toggle]);

  useEffect(() => {
    setTotalAmount(calculateTotalAmount(cartItem));
  }, [cartItem]);

  // calculate total amount
  function calculateTotalAmount(cartItem) {
    return cartItem.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  }

  // remove item
  const removeItemfromCart = async (productId) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/cart`,
        {
          data: { productId: productId },
          withCredentials: true
        }
      );
      console.log("res", response);
      setToggle(!toggle);
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Your cart</h1>
        <NavLink to='/' className="text-lg underline text-gray-700 hover:text-gray-900">Continue shopping</NavLink>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <div className="grid grid-cols-12 gap-4 pb-2">
          <div className="col-span-6 font-medium text-gray-500">PRODUCT</div>
          <div className="col-span-3 text-center font-medium text-gray-500">QUANTITY</div>
          <div className="col-span-3 text-right font-medium text-gray-500">TOTAL</div>
        </div>
        {
          cartItem.length > 0 ? cartItem.map((item, i) => (
            <div key={i} className="border-t border-gray-200 py-6">
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-6 flex items-center gap-6">
                  <img
                    src={item.product.image}
                    alt="Krishna with cow Brass idol"
                    className="w-32 h-32 object-cover"
                  />
                  <div>
                    <h3 className="font-medium text-lg">{item.product.name}</h3>
                    <p className="text-gray-700 mt-1">{item.product.price}</p>
                  </div>
                </div>

                <div className="col-span-3 flex justify-center">
                  <div className="flex border border-gray-300 rounded-md">
                    <button className="px-3 py-1 text-xl">−</button>
                    <input
                      type="text"
                      value={item.quantity}
                      className="w-12 text-center border-l border-r border-gray-300"
                      readOnly
                    />
                    <button className="px-3 py-1 text-xl">+</button>
                  </div>
                  <button className="ml-2 text-gray-500 hover:text-gray-700" onClick={() => removeItemfromCart(item.product._id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 hover:text-red-500">
                      <path d="M3 6h18"></path>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
                      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                </div>

                <div className="col-span-3 text-right font-medium">₹ {item.product.price * item.quantity}</div>
              </div>
            </div>
          )
          ) : (
            <span className='text-red-500 font-semibold'>No Products</span>
          )
        }
      </div>

      <div className="border-t border-gray-200 mt-8 pt-6">
        <div className="flex flex-col items-end">
          <div className="text-right mb-4">
            <div className="flex justify-end items-center gap-2 text-lg">
              <span className="font-medium">Estimated total</span>
              <span className="font-medium">₹ {totalAmount}</span>
            </div>
          </div>

          <button
            className="bg-black text-white py-3 px-8 font-medium hover:bg-gray-800 transition-colors duration-300"
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;