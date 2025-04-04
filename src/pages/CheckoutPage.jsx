import React, { useState } from 'react';

const CheckoutPage = () => {
  const [shippingMethod, setShippingMethod] = useState('ship');
  const [sameAsBilling, setSameAsBilling] = useState(true);
  const [showDifferentBilling, setShowDifferentBilling] = useState(false);

  return (
    <div className="flex flex-col md:flex-row bg-white min-h-screen">
      {/* Left section - Form */}
      <div className="w-full md:w-2/3 p-6 border-r border-gray-200">
        {/* Contact section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Contact</h2>
            <a href="#" className="text-blue-500">Log in</a>
          </div>
          <input 
            type="email" 
            placeholder="Email" 
            className="w-full p-3 border border-gray-300 rounded mb-3" 
          />
          <div className="flex items-center">
            <input type="checkbox" id="emailNews" className="mr-2" />
            <label htmlFor="emailNews">Email me with news and offers</label>
          </div>
        </div>

        {/* Delivery section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Delivery</h2>
          <div className="border border-gray-300 rounded mb-3">
            <div className={`flex items-center p-3 ${shippingMethod === 'ship' ? 'bg-blue-50 border-l-4 border-blue-500' : ''}`}>
              <input 
                type="radio" 
                id="ship" 
                name="delivery" 
                checked={shippingMethod === 'ship'} 
                onChange={() => setShippingMethod('ship')} 
                className="mr-2" 
              />
              <label htmlFor="ship" className="flex-grow">Ship</label>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="border-t border-gray-300"></div>
            <div className={`flex items-center p-3 ${shippingMethod === 'pickup' ? 'bg-blue-50 border-l-4 border-blue-500' : ''}`}>
              <input 
                type="radio" 
                id="pickup" 
                name="delivery" 
                checked={shippingMethod === 'pickup'} 
                onChange={() => setShippingMethod('pickup')} 
                className="mr-2" 
              />
              <label htmlFor="pickup" className="flex-grow">Pickup in store</label>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          {/* Address form */}
          <div className="mb-4">
            <div className="relative mb-3">
              <select className="w-full p-3 border border-gray-300 rounded appearance-none">
                <option>India</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path>
                </svg>
              </div>
            </div>

            <div className="flex flex-wrap -mx-2 mb-3">
              <div className="w-full md:w-1/2 px-2 mb-3 md:mb-0">
                <input type="text" placeholder="First name" className="w-full p-3 border border-gray-300 rounded" />
              </div>
              <div className="w-full md:w-1/2 px-2">
                <input type="text" placeholder="Last name" className="w-full p-3 border border-gray-300 rounded" />
              </div>
            </div>

            <input type="text" placeholder="Company (optional)" className="w-full p-3 border border-gray-300 rounded mb-3" />
            <input type="text" placeholder="Address" className="w-full p-3 border border-gray-300 rounded mb-3" />
            <input type="text" placeholder="Apartment, suite, etc. (optional)" className="w-full p-3 border border-gray-300 rounded mb-3" />

            <div className="flex flex-wrap -mx-2">
              <div className="w-full md:w-1/3 px-2 mb-3 md:mb-0">
                <input type="text" placeholder="City" className="w-full p-3 border border-gray-300 rounded" />
              </div>
              <div className="w-full md:w-1/3 px-2 mb-3 md:mb-0">
                <div className="relative">
                  <select className="w-full p-3 border border-gray-300 rounded appearance-none">
                    <option>Maharashtra</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/3 px-2">
                <input type="text" placeholder="PIN code" className="w-full p-3 border border-gray-300 rounded" />
              </div>
            </div>
          </div>

          <input type="tel" placeholder="Phone" className="w-full p-3 border border-gray-300 rounded mb-3" />
          
          <div className="flex items-center mb-3">
            <input type="checkbox" id="saveInfo" className="mr-2" />
            <label htmlFor="saveInfo">Save this information for next time</label>
          </div>
          
          <div className="flex items-center">
            <input type="checkbox" id="textNews" className="mr-2" />
            <label htmlFor="textNews">Text me with news and offers</label>
          </div>
        </div>

        {/* Shipping method */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Shipping method</h2>
          <div className="bg-gray-100 p-4 rounded">
            <p className="text-gray-600">Enter your shipping address to view available shipping methods.</p>
          </div>
        </div>

        {/* Payment */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-2">Payment</h2>
          <p className="text-gray-600 mb-4">All transactions are secure and encrypted.</p>
          
          <div className="border border-gray-300 rounded mb-3">
            <div className="flex items-center justify-between p-4 bg-blue-50 border-l-4 border-blue-500">
              <div className="flex items-center">
                <input type="radio" id="razorpay" name="payment" checked className="mr-2" />
                <label htmlFor="razorpay">Razorpay Secure (UPI, Cards, Wallets, NetBanking)</label>
              </div>
              <div className="flex items-center space-x-2">
                <img src="/api/placeholder/40/20" alt="UPI" className="h-5" />
                <img src="/api/placeholder/40/20" alt="Visa" className="h-5" />
                <img src="/api/placeholder/40/20" alt="Mastercard" className="h-5" />
                <img src="/api/placeholder/40/20" alt="NetBanking" className="h-5" />
                <span className="text-sm text-gray-600">+17</span>
              </div>
            </div>
            
            <div className="p-8 flex justify-center border-t border-gray-300">
              <div className="text-center">
                <div className="w-32 h-20 mx-auto border border-gray-300 rounded flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
                <p className="text-sm text-center text-gray-600">
                  After clicking "PLACE ORDER", you will be redirected to
                  Razorpay Secure (UPI, Cards, Wallets, NetBanking) to
                  complete your purchase securely.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Billing address */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Billing address</h2>
          <div className="border border-gray-300 rounded">
            <div className={`flex items-center p-3 ${sameAsBilling ? 'bg-blue-50 border-l-4 border-blue-500' : ''}`}>
              <input
                type="radio"
                id="sameAddress"
                name="billingAddress"
                checked={sameAsBilling}
                onChange={() => {
                  setSameAsBilling(true);
                  setShowDifferentBilling(false);
                }}
                className="mr-2"
              />
              <label htmlFor="sameAddress">Same as shipping address</label>
            </div>
            <div className="border-t border-gray-300"></div>
            <div className={`flex items-center p-3 ${!sameAsBilling ? 'bg-blue-50 border-l-4 border-blue-500' : ''}`}>
              <input
                type="radio"
                id="differentAddress"
                name="billingAddress"
                checked={!sameAsBilling}
                onChange={() => {
                  setSameAsBilling(false);
                  setShowDifferentBilling(true);
                }}
                className="mr-2"
              />
              <label htmlFor="differentAddress">Use a different billing address</label>
            </div>
          </div>
        </div>
      </div>

      {/* Right section - Order summary */}
      <div className="w-full md:w-1/3 p-6 bg-gray-50">
        <div className="mb-4 border-b border-gray-200 pb-4">
          <div className="flex items-start mb-4">
            <div className="relative">
              <img src="https://media-hosting.imagekit.io/7a1ba8cadc3744da/screenshot_1743068957263.png?Expires=1837676958&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=b238LJ4i-bslbtV6St4ieRPUTiBF86T2vqPOv1u3HdBfTcZvIY9Psv69noLqWmSnFmEEcQTCJuGhZO4E2q2isZP3Le85yz2yUD8daob~FeEoEafdDqeBtScEmKBa5c6BGoGtBhcbIIrYQ8kri2I3aVNe9gs8eHOZqTNLt~n0CIV870nC16KLS~VMRw29e1yKkQUyAuIxYVTSGrLncVYZu8G5X3ZB0BDq9ilOJUUfwC1eEbqc9IqafTofS564SysdPG5QZjBIfLD~lLD7tXwkcfvTzH3d7MWQlhRIvndjUvfHF4l7rPzlGXkmcnlLGODDOiDDjQLA3IVWFXYT-Q5yeQ__" alt="Krishna with cow Brass idol" className="w-20 h-20 object-cover mr-4" />
            </div>
            <div className="flex-grow">
              <p className="font-medium">Krishna with cow Brass idol 27 inch</p>
              <p className="text-right font-medium">₹58,050.00</p>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Discount code"
                className="flex-grow p-3 border border-gray-300 rounded-l"
              />
              <button className="bg-gray-200 text-gray-700 p-3 rounded-r border border-gray-300 border-l-0">
                Apply
              </button>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>₹58,050.00</span>
            </div>
            <div className="flex justify-between mb-2">
              <div className="flex items-center">
                <span>Shipping</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-gray-600">Enter shipping address</span>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between mb-2">
            <span className="text-lg font-bold">Total</span>
            <div className="text-right">
              <div className="flex items-center justify-end">
                <span className="text-sm text-gray-600 mr-2">INR</span>
                <span className="text-lg font-bold">₹58,050.00</span>
              </div>
              
            </div>
          </div>
        </div>
        
        {/* Place Order Button */}
        <button className="w-full py-4 px-6 bg-blue-900 text-white font-bold text-lg rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mb-4">
          PLACE ORDER
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;