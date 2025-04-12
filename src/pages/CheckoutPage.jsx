import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Make sure to import axios

export default function CheckoutPage() {
  const [emailNewsOffer, setEmailNewsOffer] = useState(false);
  const [textNewsOffer, setTextNewsOffer] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState('ship');
  const [country, setCountry] = useState('India');
  const [state, setState] = useState('Maharashtra');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pickupPhoneNumber, setPickupPhoneNumber] = useState('');
  const [cartItem, setCartItem] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [toggle, setToggle] = useState(false); // You had this dependency in useEffect

  // Store location details
  const storeLocation = {
    name: "BudhShiv Lajpat Nagar I Lajpat Nagar",
    address: "BudhShiv Lajpat Nagar I Lajpat Nagar, E 35 basement, New Delhi DL",
    distance: "1,145.1 km",
    availability: "Usually ready in 2-4 days",
    isFree: true
  };

  // fetch cart
  const fetchCartItem = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/checkout`, { withCredentials: true });
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

  const handlePlaceOrder = () => {
    // Order processing logic would go here
    console.log('Order placed!');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
      {/* Left side - Forms */}
      <div className="md:w-3/5">
        {/* Contact Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Contact</h2>
            <a href="#" className="text-blue-600 hover:underline">Log in</a>
          </div>

          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded"
            />
          </div>

          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="newsletter"
              checked={emailNewsOffer}
              onChange={() => setEmailNewsOffer(!emailNewsOffer)}
              className="mr-2 h-4 w-4"
            />
            <label htmlFor="newsletter">Email me with news and offers</label>
          </div>
        </div>

        {/* Delivery Section with Radio Button Options */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Delivery</h2>

          {/* Always show both radio buttons */}
          <div className="mb-4">
            <div className={`border rounded mb-2 p-4 flex justify-between items-center ${deliveryMethod === 'ship' ? 'bg-blue-50 border-blue-500' : 'border-gray-300'}`}>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="ship"
                  name="delivery"
                  value="ship"
                  checked={deliveryMethod === 'ship'}
                  onChange={() => setDeliveryMethod('ship')}
                  className="mr-2 h-4 w-4"
                />
                <label htmlFor="ship">Ship</label>
              </div>
              {deliveryMethod === 'ship' && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>

            <div className={`border rounded p-4 flex justify-between items-center ${deliveryMethod === 'pickup' ? 'bg-blue-50 border-blue-500' : 'border-gray-300'}`}>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="pickup"
                  name="delivery"
                  value="pickup"
                  checked={deliveryMethod === 'pickup'}
                  onChange={() => setDeliveryMethod('pickup')}
                  className="mr-2 h-4 w-4"
                />
                <label htmlFor="pickup">Pickup in store</label>
              </div>
              {deliveryMethod === 'pickup' && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          </div>
        </div>

        {/* Show Store Details when Pickup is selected */}
        {deliveryMethod === 'pickup' && (
          <div className="mb-8">
            <h3 className="font-medium mb-4">Store Information</h3>
            <div className="border rounded p-4 mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{storeLocation.name} ({storeLocation.distance})</h3>
                  <p className="text-gray-600 text-sm">{storeLocation.address}</p>
                </div>
                <div className="text-right">
                  <span className="font-bold">{storeLocation.isFree ? 'FREE' : 'PAID'}</span>
                  <p className="text-gray-600 text-sm">{storeLocation.availability}</p>
                </div>
              </div>
            </div>

            {/* Contact information for pickup */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Contact Information</h3>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Full name"
                  className="w-full p-3 border border-gray-300 rounded mb-4"
                />
                <input
                  type="tel"
                  placeholder="Phone number"
                  value={pickupPhoneNumber}
                  onChange={(e) => setPickupPhoneNumber(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="textNews"
                  checked={textNewsOffer}
                  onChange={() => setTextNewsOffer(!textNewsOffer)}
                  className="mr-2 h-4 w-4"
                />
                <label htmlFor="textNews" className="text-gray-700">Text me with news and offers</label>
              </div>
            </div>
          </div>
        )}

        {/* Shipping Address Section - Only show if delivery method is 'ship' */}
        {deliveryMethod === 'ship' && (
          <div className="mb-8">
            <h3 className="font-medium mb-4">Shipping Address</h3>
            <div className="mb-4">
              <div className="relative">
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded appearance-none"
                >
                  <option value="India">India</option>
                  <option value="USA">USA</option>
                  <option value="UK">UK</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-4 h-4 fill-current text-gray-500" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="First name"
                className="p-3 border border-gray-300 rounded"
              />
              <input
                type="text"
                placeholder="Last name"
                className="p-3 border border-gray-300 rounded"
              />
            </div>

            <div className="mb-4">
              <input
                type="text"
                placeholder="Company (optional)"
                className="w-full p-3 border border-gray-300 rounded"
              />
            </div>

            <div className="mb-4">
              <input
                type="text"
                placeholder="Address"
                className="w-full p-3 border border-gray-300 rounded"
              />
            </div>

            <div className="mb-4">
              <input
                type="text"
                placeholder="Apartment, suite, etc. (optional)"
                className="w-full p-3 border border-gray-300 rounded"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <input
                type="text"
                placeholder="City"
                className="p-3 border border-gray-300 rounded"
              />
              <div className="relative">
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded appearance-none"
                >
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Karnataka">Karnataka</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-4 h-4 fill-current text-gray-500" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </div>
              </div>
              <input
                type="text"
                placeholder="PIN code"
                className="p-3 border border-gray-300 rounded"
              />
            </div>

            {/* Phone Number Field */}
            <div className="mb-4">
              <input
                type="tel"
                placeholder="Phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded"
              />
            </div>
          </div>
        )}
      </div>

      {/* Right side - Cart Summary */}
      <div className="md:w-2/5 bg-gray-50 p-6 rounded-lg">
        <div>
          {/* Dynamic Cart Items */}
          {cartItem.length > 0 ? (
            <>
              {cartItem.map((item, index) => (
                <div key={index} className="flex items-center mb-6">
                  <div className="h-16 w-16 bg-gray-200 rounded mr-4 relative">
                    <img
                      src={item.product.imageUrl || "/api/placeholder/64/64"}
                      alt={item.product.name}
                      className="h-full w-full object-cover rounded"
                    />
                    <span className="absolute -top-2 -right-2 bg-gray-500 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.product.name}</h3>
                    <p className="text-gray-700">₹{item.product.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="text-center py-4">
              <p>Your cart is empty</p>
            </div>
          )}

          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>₹{totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <div className="flex items-center">
                <span>Shipping</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-gray-500">
                {deliveryMethod === 'pickup' ? 'Free' : 'Enter shipping address'}
              </span>
            </div>
            <div className="border-t border-gray-200 mt-4 pt-4">
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-medium">Total</span>
                <div className="text-right">
                  <span className="text-gray-500 text-sm mr-2">INR</span>
                  <span className="text-lg font-medium">₹{totalAmount.toFixed(2)}</span>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                onClick={handlePlaceOrder}
                className="w-full bg-black hover:bg-blue-700 text-white py-3 px-6 rounded font-medium transition duration-200"
                disabled={cartItem.length === 0}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}