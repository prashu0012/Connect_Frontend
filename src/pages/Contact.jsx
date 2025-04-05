export default function ContactUs() {
  return (
    <div className="max-w-4xl text-sm text-gray-500 text-sm mt-60 py-12 px-4 ">
      <h1 className="text-3xl font-bold mb-8">Contact Us</h1>
      
      {/* Contact Information */}
      <div className="mb-12">
        <h2 className="text-sm font-semibold mb-4">Get In Touch</h2>
        <p className="text-xl mb-6">
          <a href="tel:+918826480550" className="text-blue-600 hover:underline">
            +91-8826480550
          </a>
        </p>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold mb-2">1. International Shipping</h3>
            <p>We Ship worldwide! Prices are all inclusive for your region.</p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-2">2. Gifting</h3>
            <p>
              If you want to gift your loved ones something special from our website. You can let us know!
              We can help with customised gift packaging or personalised notes.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-2">3. Corporate Gifting</h3>
            <p>
              Specially curated pocket friendly gifts for your peers at your workplace. We got it covered!
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-2">4. Wholesale</h3>
            <p>
              For bulk quantities we have special prices. You can contact us to get those discounted rates.
            </p>
          </div>
          
          <p className="mt-6">
            If you have any other Questions or Doubts. Please feel free to Write it down below. 
            We will get back to you as quickly as we can.
          </p>
        </div>
      </div>

      {/* Contact Form */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Contact Form</h2>
        <form className="space-y-4 max-w-2xl">
          <div>
            <label htmlFor="name" className="block mb-1">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block mb-1">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block mb-1">Phone number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="comment" className="block mb-1">Comment</label>
            <textarea
              id="comment"
              name="comment"
              rows="4"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            ></textarea>
          </div>
          
          <button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors"
          >
            Send
          </button>
        </form>
      </div>

      {/* Email Subscription */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Subscribe to our emails</h3>
        <p className="mb-4">Be the first to know about new collections and exclusive offers.</p>
        <form className="flex gap-2 max-w-2xl">
          <input
            type="email"
            placeholder="Email"
            className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}