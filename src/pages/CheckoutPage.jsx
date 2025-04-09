import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getShippingMethods,
  applyDiscountCode,
  createOrder,
} from "../services/api";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [shippingMethod, setShippingMethod] = useState("ship");
  const [sameAsBilling, setSameAsBilling] = useState(true);
  const [showDifferentBilling, setShowDifferentBilling] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    emailNews: false,
    textNews: false,
    shipping: {
      firstName: "",
      lastName: "",
      company: "",
      address: "",
      apartment: "",
      city: "",
      state: "Maharashtra",
      country: "India",
      pincode: "",
      phone: "",
    },
    billing: {
      firstName: "",
      lastName: "",
      company: "",
      address: "",
      apartment: "",
      city: "",
      state: "Maharashtra",
      country: "India",
      pincode: "",
      phone: "",
    },
    paymentMethod: "razorpay",
    discountCode: "",
    saveInfo: false,
  });

  const [availableShippingMethods, setAvailableShippingMethods] = useState([]);
  const [selectedShippingMethod, setSelectedShippingMethod] = useState(null);
  const [discountInfo, setDiscountInfo] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Mock item for demo (in a real app, you'd get this from cart state/context)
  const cartItem = {
    id: "1",
    name: "Krishna with cow Brass idol 27 inch",
    price: 58050,
    quantity: 1,
    image:
      "https://media-hosting.imagekit.io/7a1ba8cadc3744da/screenshot_1743068957263.png",
  };

  const subtotal = cartItem.price * cartItem.quantity;
  const shippingCost = selectedShippingMethod?.price || 0;
  const discountAmount = discountInfo?.discountAmount || 0;
  const total = subtotal + shippingCost - discountAmount;

  // Handle form input changes
  const handleInputChange = (e, section = null) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      if (section) {
        setFormData({
          ...formData,
          [section]: {
            ...formData[section],
            [name]: checked,
          },
        });
      } else {
        setFormData({
          ...formData,
          [name]: checked,
        });
      }
    } else {
      if (section) {
        setFormData({
          ...formData,
          [section]: {
            ...formData[section],
            [name]: value,
          },
        });
      } else {
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    }
  };

  // Fetch available shipping methods when shipping address is complete
  useEffect(() => {
    const { pincode, country, state } = formData.shipping;

    if (pincode && country && state) {
      const fetchShippingMethods = async () => {
        try {
          const { shippingMethods } = await getShippingMethods({
            country,
            state,
            pincode,
          });
          setAvailableShippingMethods(shippingMethods);
          if (shippingMethods.length > 0) {
            setSelectedShippingMethod(shippingMethods[0]);
          }
        } catch (error) {
          console.error("Failed to fetch shipping methods:", error);
        }
      };

      fetchShippingMethods();
    }
  }, [
    formData.shipping.pincode,
    formData.shipping.country,
    formData.shipping.state,
  ]);

  // Handle discount code application
  const handleApplyDiscount = async () => {
    if (!formData.discountCode) return;

    try {
      const discountResult = await applyDiscountCode(
        formData.discountCode,
        subtotal
      );
      setDiscountInfo(discountResult);
    } catch (error) {
      setErrors({
        ...errors,
        discountCode: "Invalid discount code",
      });
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    // Validate email
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Valid email is required";
    }

    // Validate shipping address
    const requiredShippingFields = [
      "firstName",
      "lastName",
      "address",
      "city",
      "pincode",
      "phone",
    ];
    requiredShippingFields.forEach((field) => {
      if (!formData.shipping[field]) {
        newErrors[`shipping_${field}`] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required`;
      }
    });

    // Validate billing address if different from shipping
    if (!sameAsBilling) {
      const requiredBillingFields = [
        "firstName",
        "lastName",
        "address",
        "city",
        "pincode",
      ];
      requiredBillingFields.forEach((field) => {
        if (!formData.billing[field]) {
          newErrors[`billing_${field}`] = `${
            field.charAt(0).toUpperCase() + field.slice(1)
          } is required`;
        }
      });
    }

    // Validate shipping method
    if (!selectedShippingMethod && shippingMethod === "ship") {
      newErrors.shippingMethod = "Please select a shipping method";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle order submission
  const handleSubmitOrder = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const orderData = {
        email: formData.email,
        shippingMethod,
        shippingAddress: formData.shipping,
        billingAddress: sameAsBilling ? formData.shipping : formData.billing,
        sameAsBilling,
        paymentMethod: formData.paymentMethod,
        items: [
          {
            productId: cartItem.id,
            name: cartItem.name,
            price: cartItem.price,
            quantity: cartItem.quantity,
            image: cartItem.image,
          },
        ],
        subtotal,
        shippingCost,
        discountCode: formData.discountCode,
        discountAmount,
        total,
      };

      const { order, paymentUrl } = await createOrder(orderData);

      // Redirect to payment gateway
      window.location.href = paymentUrl;
    } catch (error) {
      console.error("Error creating order:", error);
      setErrors({
        ...errors,
        submit: "There was an error processing your order. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row bg-white min-h-screen">
      {/* Left section - Form */}
      <div className="w-full md:w-2/3 p-6 border-r border-gray-200">
        {/* Contact section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Contact</h2>
            <a href="#" className="text-blue-500">
              Log in
            </a>
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => handleInputChange(e)}
            className={`w-full p-3 border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded mb-3`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mb-2">{errors.email}</p>
          )}

          <div className="flex items-center">
            <input
              type="checkbox"
              id="emailNews"
              name="emailNews"
              checked={formData.emailNews}
              onChange={(e) => handleInputChange(e)}
              className="mr-2"
            />
            <label htmlFor="emailNews">Email me with news and offers</label>
          </div>
        </div>

        {/* Delivery section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Delivery</h2>
          <div className="border border-gray-300 rounded mb-3">
            <div
              className={`flex items-center p-3 ${
                shippingMethod === "ship"
                  ? "bg-blue-50 border-l-4 border-blue-500"
                  : ""
              }`}
            >
              <input
                type="radio"
                id="ship"
                name="delivery"
                checked={shippingMethod === "ship"}
                onChange={() => setShippingMethod("ship")}
                className="mr-2"
              />
              <label htmlFor="ship" className="flex-grow">
                Ship
              </label>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div className="border-t border-gray-300"></div>
            <div
              className={`flex items-center p-3 ${
                shippingMethod === "pickup"
                  ? "bg-blue-50 border-l-4 border-blue-500"
                  : ""
              }`}
            >
              <input
                type="radio"
                id="pickup"
                name="delivery"
                checked={shippingMethod === "pickup"}
                onChange={() => setShippingMethod("pickup")}
                className="mr-2"
              />
              <label htmlFor="pickup" className="flex-grow">
                Pickup in store
              </label>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          {/* Address form */}
          <div className="mb-4">
            <div className="relative mb-3">
              <select
                name="country"
                value={formData.shipping.country}
                onChange={(e) => handleInputChange(e, "shipping")}
                className="w-full p-3 border border-gray-300 rounded appearance-none"
              >
                <option value="India">India</option>
                <option value="United States">United States</option>
                <option value="United Kingdom">United Kingdom</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>

            <div className="flex flex-wrap -mx-2 mb-3">
              <div className="w-full md:w-1/2 px-2 mb-3 md:mb-0">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={formData.shipping.firstName}
                  onChange={(e) => handleInputChange(e, "shipping")}
                  className={`w-full p-3 border ${
                    errors.shipping_firstName
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded`}
                />
                {errors.shipping_firstName && (
                  <p className="text-red-500 text-sm">
                    {errors.shipping_firstName}
                  </p>
                )}
              </div>
              <div className="w-full md:w-1/2 px-2">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={formData.shipping.lastName}
                  onChange={(e) => handleInputChange(e, "shipping")}
                  className={`w-full p-3 border ${
                    errors.shipping_lastName
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded`}
                />
                {errors.shipping_lastName && (
                  <p className="text-red-500 text-sm">
                    {errors.shipping_lastName}
                  </p>
                )}
              </div>
            </div>

            <input
              type="text"
              name="company"
              placeholder="Company (optional)"
              value={formData.shipping.company}
              onChange={(e) => handleInputChange(e, "shipping")}
              className="w-full p-3 border border-gray-300 rounded mb-3"
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.shipping.address}
              onChange={(e) => handleInputChange(e, "shipping")}
              className={`w-full p-3 border ${
                errors.shipping_address ? "border-red-500" : "border-gray-300"
              } rounded mb-3`}
            />
            {errors.shipping_address && (
              <p className="text-red-500 text-sm mb-2">
                {errors.shipping_address}
              </p>
            )}

            <input
              type="text"
              name="apartment"
              placeholder="Apartment, suite, etc. (optional)"
              value={formData.shipping.apartment}
              onChange={(e) => handleInputChange(e, "shipping")}
              className="w-full p-3 border border-gray-300 rounded mb-3"
            />

            <div className="flex flex-wrap -mx-2">
              <div className="w-full md:w-1/3 px-2 mb-3 md:mb-0">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.shipping.city}
                  onChange={(e) => handleInputChange(e, "shipping")}
                  className={`w-full p-3 border ${
                    errors.shipping_city ? "border-red-500" : "border-gray-300"
                  } rounded`}
                />
                {errors.shipping_city && (
                  <p className="text-red-500 text-sm">{errors.shipping_city}</p>
                )}
              </div>
              <div className="w-full md:w-1/3 px-2 mb-3 md:mb-0">
                <div className="relative">
                  <select
                    name="state"
                    value={formData.shipping.state}
                    onChange={(e) => handleInputChange(e, "shipping")}
                    className="w-full p-3 border border-gray-300 rounded appearance-none"
                  >
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                        fillRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/3 px-2">
                <input
                  type="text"
                  name="pincode"
                  placeholder="PIN code"
                  value={formData.shipping.pincode}
                  onChange={(e) => handleInputChange(e, "shipping")}
                  className={`w-full p-3 border ${
                    errors.shipping_pincode
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded`}
                />
                {errors.shipping_pincode && (
                  <p className="text-red-500 text-sm">
                    {errors.shipping_pincode}
                  </p>
                )}
              </div>
            </div>
          </div>

          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formData.shipping.phone}
            onChange={(e) => handleInputChange(e, "shipping")}
            className={`w-full p-3 border ${
              errors.shipping_phone ? "border-red-500" : "border-gray-300"
            } rounded mb-3`}
          />
          {errors.shipping_phone && (
            <p className="text-red-500 text-sm mb-2">{errors.shipping_phone}</p>
          )}

          <div className="flex items-center mb-3">
            <input
              type="checkbox"
              id="saveInfo"
              name="saveInfo"
              checked={formData.saveInfo}
              onChange={(e) => handleInputChange(e)}
              className="mr-2"
            />
            <label htmlFor="saveInfo">
              Save this information for next time
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="textNews"
              name="textNews"
              checked={formData.textNews}
              onChange={(e) => handleInputChange(e)}
              className="mr-2"
            />
            <label htmlFor="textNews">Text me with news and offers</label>
          </div>
        </div>

        {/* Shipping method */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Shipping method</h2>
          {availableShippingMethods.length > 0 ? (
            <div className="border border-gray-300 rounded">
              {availableShippingMethods.map((method) => (
                <div
                  key={method.id}
                  className="border-b border-gray-300 last:border-b-0"
                >
                  <div
                    className={`flex items-center justify-between p-4 ${
                      selectedShippingMethod?.id === method.id
                        ? "bg-blue-50 border-l-4 border-blue-500"
                        : ""
                    }`}
                    onClick={() => setSelectedShippingMethod(method)}
                  >
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id={`shipping-${method.id}`}
                        name="shippingMethodOption"
                        checked={selectedShippingMethod?.id === method.id}
                        onChange={() => setSelectedShippingMethod(method)}
                        className="mr-3"
                      />
                      <div>
                        <label
                          htmlFor={`shipping-${method.id}`}
                          className="font-medium"
                        >
                          {method.name}
                        </label>
                        <p className="text-sm text-gray-600">
                          {method.estimatedDelivery}
                        </p>
                      </div>
                    </div>
                    <span className="font-medium">
                      ₹{method.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-100 p-4 rounded">
              <p className="text-gray-600">
                {formData.shipping.pincode
                  ? "Calculating available shipping methods..."
                  : "Enter your shipping address to view available shipping methods."}
              </p>
            </div>
          )}
          {errors.shippingMethod && (
            <p className="text-red-500 text-sm mt-2">{errors.shippingMethod}</p>
          )}
        </div>

        {/* Payment */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-2">Payment</h2>
          <p className="text-gray-600 mb-4">
            All transactions are secure and encrypted.
          </p>

          <div className="border border-gray-300 rounded mb-3">
            <div className="flex items-center justify-between p-4 bg-blue-50 border-l-4 border-blue-500">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="razorpay"
                  name="paymentMethod"
                  value="razorpay"
                  checked={formData.paymentMethod === "razorpay"}
                  onChange={(e) => handleInputChange(e)}
                  className="mr-2"
                />
                <label htmlFor="razorpay">
                  Razorpay Secure (UPI, Cards, Wallets, NetBanking)
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <img src="/api/placeholder/40/20" alt="UPI" className="h-5" />
                <img src="/api/placeholder/40/20" alt="Visa" className="h-5" />
                <img
                  src="/api/placeholder/40/20"
                  alt="Mastercard"
                  className="h-5"
                />
                <img
                  src="/api/placeholder/40/20"
                  alt="NetBanking"
                  className="h-5"
                />
                <span className="text-sm text-gray-600">+17</span>
              </div>
            </div>

            <div className="p-8 flex justify-center border-t border-gray-300">
              <div className="text-center">
                <div className="w-32 h-20 mx-auto border border-gray-300 rounded flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </div>
                <p className="text-sm text-center text-gray-600">
                  After clicking "PLACE ORDER", you will be redirected to
                  Razorpay Secure (UPI, Cards, Wallets, NetBanking) to complete
                  your purchase securely.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Billing address */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Billing address</h2>
          <div className="border border-gray-300 rounded">
            <div
              className={`flex items-center p-3 ${
                sameAsBilling ? "bg-blue-50 border-l-4 border-blue-500" : ""
              }`}
            >
              <input
                type="radio"
                id="sameAddress"
                name="billingAddressType"
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
            <div
              className={`flex items-center p-3 ${
                !sameAsBilling ? "bg-blue-50 border-l-4 border-blue-500" : ""
              }`}
            >
              <input
                type="radio"
                id="differentAddress"
                name="billingAddressType"
                checked={!sameAsBilling}
                onChange={() => {
                  setSameAsBilling(false);
                  setShowDifferentBilling(true);
                }}
                className="mr-2"
              />
              <label htmlFor="differentAddress">
                Use a different billing address
              </label>
            </div>

            {/* Show billing address form if different address is selected */}
            {!sameAsBilling && showDifferentBilling && (
              <div className="p-4 border-t border-gray-300">
                <div className="mb-4">
                  <div className="flex flex-wrap -mx-2 mb-3">
                    <div className="w-full md:w-1/2 px-2 mb-3 md:mb-0">
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First name"
                        value={formData.billing.firstName}
                        onChange={(e) => handleInputChange(e, "billing")}
                        className={`w-full p-3 border ${
                          errors.billing_firstName
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded`}
                      />
                      {errors.billing_firstName && (
                        <p className="text-red-500 text-sm">
                          {errors.billing_firstName}
                        </p>
                      )}
                    </div>
                    <div className="w-full md:w-1/2 px-2">
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last name"
                        value={formData.billing.lastName}
                        onChange={(e) => handleInputChange(e, "billing")}
                        className={`w-full p-3 border ${
                          errors.billing_lastName
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded`}
                      />
                      {errors.billing_lastName && (
                        <p className="text-red-500 text-sm">
                          {errors.billing_lastName}
                        </p>
                      )}
                    </div>
                  </div>

                  <input
                    type="text"
                    name="company"
                    placeholder="Company (optional)"
                    value={formData.billing.company}
                    onChange={(e) => handleInputChange(e, "billing")}
                    className="w-full p-3 border border-gray-300 rounded mb-3"
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.billing.address}
                    onChange={(e) => handleInputChange(e, "billing")}
                    className={`w-full p-3 border ${
                      errors.billing_address
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded mb-3`}
                  />
                  {errors.billing_address && (
                    <p className="text-red-500 text-sm mb-2">
                      {errors.billing_address}
                    </p>
                  )}

                  <input
                    type="text"
                    name="apartment"
                    placeholder="Apartment, suite, etc. (optional)"
                    value={formData.billing.apartment}
                    onChange={(e) => handleInputChange(e, "billing")}
                    className="w-full p-3 border border-gray-300 rounded mb-3"
                  />

                  <div className="flex flex-wrap -mx-2">
                    <div className="w-full md:w-1/3 px-2 mb-3 md:mb-0">
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.billing.city}
                        onChange={(e) => handleInputChange(e, "billing")}
                        className={`w-full p-3 border ${
                          errors.billing_city
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded`}
                      />
                      {errors.billing_city && (
                        <p className="text-red-500 text-sm">
                          {errors.billing_city}
                        </p>
                      )}
                    </div>
                    <div className="w-full md:w-1/3 px-2 mb-3 md:mb-0">
                      <div className="relative">
                        <select
                          name="state"
                          value={formData.billing.state}
                          onChange={(e) => handleInputChange(e, "billing")}
                          className="w-full p-3 border border-gray-300 rounded appearance-none"
                        >
                          <option value="Maharashtra">Maharashtra</option>
                          <option value="Delhi">Delhi</option>
                          <option value="Karnataka">Karnataka</option>
                          <option value="Tamil Nadu">Tamil Nadu</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                          <svg
                            className="w-4 h-4 fill-current"
                            viewBox="0 0 20 20"
                          >
                            <path
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                              fillRule="evenodd"
                            ></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="w-full md:w-1/3 px-2">
                      <input
                        type="text"
                        name="pincode"
                        placeholder="PIN code"
                        value={formData.billing.pincode}
                        onChange={(e) => handleInputChange(e, "billing")}
                        className={`w-full p-3 border ${
                          errors.billing_pincode
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded`}
                      />
                      {errors.billing_pincode && (
                        <p className="text-red-500 text-sm">
                          {errors.billing_pincode}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right section - Order summary */}
      <div className="w-full md:w-1/3 p-6 bg-gray-50">
        {errors.submit && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {errors.submit}
          </div>
        )}

        <div className="mb-4 border-b border-gray-200 pb-4">
          <div className="flex items-start mb-4">
            <div className="relative">
              <img
                src="/api/placeholder/80/80"
                alt="Krishna with cow Brass idol"
                className="w-20 h-20 object-cover mr-4"
              />
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
                name="discountCode"
                placeholder="Discount code"
                value={formData.discountCode}
                onChange={(e) => handleInputChange(e)}
                className={`flex-grow p-3 border ${
                  errors.discountCode ? "border-red-500" : "border-gray-300"
                } rounded-l`}
              />
              <button
                onClick={handleApplyDiscount}
                className="bg-gray-200 text-gray-700 p-3 rounded-r border border-gray-300 border-l-0 hover:bg-gray-300"
              >
                Apply
              </button>
            </div>
            {errors.discountCode && (
              <p className="text-red-500 text-sm mt-1">{errors.discountCode}</p>
            )}
            {discountInfo && (
              <p className="text-green-600 text-sm mt-1">
                Discount applied: -{discountInfo.discountAmount.toFixed(2)}
              </p>
            )}
          </div>

          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <div className="flex items-center">
                <span>Shipping</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-500 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <span className="text-gray-600">
                {selectedShippingMethod
                  ? `₹${shippingCost.toFixed(2)}`
                  : "Enter shipping address"}
              </span>
            </div>
            {discountInfo && (
              <div className="flex justify-between mb-2">
                <span>Discount</span>
                <span>-₹{discountAmount.toFixed(2)}</span>
              </div>
            )}
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between mb-2">
            <span className="text-lg font-bold">Total</span>
            <div className="text-right">
              <div className="flex items-center justify-end">
                <span className="text-sm text-gray-600 mr-2">INR</span>
                <span className="text-lg font-bold">₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Place Order Button */}
        <button
          onClick={handleSubmitOrder}
          disabled={isSubmitting}
          className={`w-full py-4 px-6 ${
            isSubmitting ? "bg-blue-700" : "bg-blue-900"
          } text-white font-bold text-lg rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mb-4 flex items-center justify-center`}
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              PROCESSING...
            </>
          ) : (
            "PLACE ORDER"
          )}
        </button>

        <p className="text-xs text-gray-600 mb-4">
          By placing your order, you agree to our Terms of Service and Privacy
          Policy. Your personal data will be used to process your order, support
          your experience, and for other purposes described in our privacy
          policy.
        </p>
      </div>
    </div>
  );
};

export default CheckoutPage;
