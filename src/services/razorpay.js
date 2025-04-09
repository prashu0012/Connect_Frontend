export const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };
  
  export const initiateRazorpayPayment = async ({ orderId, amount, currency, name, email, phone }) => {
    const res = await loadRazorpayScript();
    
    if (!res) {
      alert('Razorpay SDK failed to load. Check your internet connection.');
      return;
    }
    
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      amount: amount * 100, // Razorpay expects amount in paise
      currency,
      name: 'Your Store Name',
      description: `Order #${orderId}`,
      order_id: orderId,
      handler: function (response) {
        // Handle successful payment
        window.location.href = `/order-confirmation/${orderId}?payment_id=${response.razorpay_payment_id}`;
      },
      prefill: {
        name,
        email,
        contact: phone
      },
      theme: {
        color: '#1E3A8A' // Matches your blue-900 color from Tailwind
      }
    };
    
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };