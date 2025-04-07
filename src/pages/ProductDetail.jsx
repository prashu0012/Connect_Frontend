import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { ShoppingCart, Heart, Truck, Ruler, Heart as HeartIcon, Share } from 'lucide-react';

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeSection, setActiveSection] = useState(null);

  let { id } = useParams();
  const [productDetails, setProductDetails] = useState();

  useEffect(()=>{
    console.log("ID..",id);
  },[id])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products/${id}`);
        setProductDetails(response.data.msg);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // add to cart
  const addToCart = async () => {
    const productId = productDetails._id;
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/cart`, { quantity, productId }, { withCredentials: true });
      console.log("cart..\n", response);
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  const productImages = [
    'https://media-hosting.imagekit.io/7a1ba8cadc3744da/screenshot_1743068957263.png?Expires=1837676958&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=b238LJ4i-bslbtV6St4ieRPUTiBF86T2vqPOv1u3HdBfTcZvIY9Psv69noLqWmSnFmEEcQTCJuGhZO4E2q2isZP3Le85yz2yUD8daob~FeEoEafdDqeBtScEmKBa5c6BGoGtBhcbIIrYQ8kri2I3aVNe9gs8eHOZqTNLt~n0CIV870nC16KLS~VMRw29e1yKkQUyAuIxYVTSGrLncVYZu8G5X3ZB0BDq9ilOJUUfwC1eEbqc9IqafTofS564SysdPG5QZjBIfLD~lLD7tXwkcfvTzH3d7MWQlhRIvndjUvfHF4l7rPzlGXkmcnlLGODDOiDDjQLA3IVWFXYT-Q5yeQ__',
    'https://media-hosting.imagekit.io/7a1ba8cadc3744da/screenshot_1743068957263.png?Expires=1837676958&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=b238LJ4i-bslbtV6St4ieRPUTiBF86T2vqPOv1u3HdBfTcZvIY9Psv69noLqWmSnFmEEcQTCJuGhZO4E2q2isZP3Le85yz2yUD8daob~FeEoEafdDqeBtScEmKBa5c6BGoGtBhcbIIrYQ8kri2I3aVNe9gs8eHOZqTNLt~n0CIV870nC16KLS~VMRw29e1yKkQUyAuIxYVTSGrLncVYZu8G5X3ZB0BDq9ilOJUUfwC1eEbqc9IqafTofS564SysdPG5QZjBIfLD~lLD7tXwkcfvTzH3d7MWQlhRIvndjUvfHF4l7rPzlGXkmcnlLGODDOiDDjQLA3IVWFXYT-Q5yeQ__',
    'https://media-hosting.imagekit.io/7a1ba8cadc3744da/screenshot_1743068957263.png?Expires=1837676958&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=b238LJ4i-bslbtV6St4ieRPUTiBF86T2vqPOv1u3HdBfTcZvIY9Psv69noLqWmSnFmEEcQTCJuGhZO4E2q2isZP3Le85yz2yUD8daob~FeEoEafdDqeBtScEmKBa5c6BGoGtBhcbIIrYQ8kri2I3aVNe9gs8eHOZqTNLt~n0CIV870nC16KLS~VMRw29e1yKkQUyAuIxYVTSGrLncVYZu8G5X3ZB0BDq9ilOJUUfwC1eEbqc9IqafTofS564SysdPG5QZjBIfLD~lLD7tXwkcfvTzH3d7MWQlhRIvndjUvfHF4l7rPzlGXkmcnlLGODDOiDDjQLA3IVWFXYT-Q5yeQ__'
  ];

  const product = {
    id: 'BRKL2B0',
    name: 'Brass Radha Krishna Idols with Lotus Base',
    originalPrice: 99000,
    salePrice: 83250,
    size: '27 inch',
    sku: 'BRKL2B0',
    savings: 15750,
    description: 'Experience divine beauty with our 26-inch Brass Urdhava Tandava Tripurantaka Lord Shiva Statue. Finish - Antique gold. This masterpiece, Height 26 inch, 13 inch wide and crafted with precision.',
    pickupLocation: 'BudhShiv Lajpat Nagar',
    pickupTime: '2-4 days'
  };

  const decreaseQuantity = () => {
    setQuantity(Math.max(1, quantity - 1));
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 grid md:grid-cols-2 gap-8">
      {/* Image Gallery */}
      <div>
        {/* Main Image */}
        <div className="border rounded-lg mb-4">
          <img
            // src={productImages[selectedImage]}
            src={productDetails?.image}
            alt="Radha Krishna Idol"
            className="w-full h-[500px] object-cover rounded-lg"
          />
        </div>

        {/* Thumbnail Gallery */}
        <div className="flex space-x-2">
          {productImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Thumbnail ${index + 1}`}
              className={`w-20 h-20 object-cover rounded-lg cursor-pointer 
                ${selectedImage === index ? 'border-2 border-green-500' : 'opacity-70 hover:opacity-100'}`}
              onClick={() => setSelectedImage(index)}
            />
          ))}
        </div>
      </div>

      {/* Product Details */}
      <div>
        <h1 className="text-2xl font-bold mb-4">{productDetails?.name}</h1>

        {/* Price Section */}
        <div className="flex items-center space-x-4 mb-4">
          <span className="text-3xl font-bold text-green-600">
            ₹{productDetails?.price.toLocaleString()}
          </span>
          {/* <span className="line-through text-gray-500">
            ₹{productDetails?.price.toLocaleString()}
          </span>
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
            Save ₹{product.savings.toLocaleString()}
          </span> */}
        </div>

        {/* Product Description */}
        <p className="text-gray-700 mb-4">{productDetails?.description}</p>

        {/* Product Details */}
        <div className="mb-4 space-y-2">
          <div className="flex">
            <span className="w-24 font-medium text-gray-700">Size:</span>
            <span className="text-gray-600"></span>
          </div>
          <div className="flex">
            <span className="w-24 font-medium text-gray-700">SKU:</span>
            <span className="text-gray-600"></span>
          </div>
          <div className="flex items-center">
            <span className="w-24 font-medium text-gray-700">
              <Truck className="inline-block mr-2 text-green-600" />
              Pickup:
            </span>
            <span className="text-gray-600">
              {product.pickupLocation} ({product.pickupTime})
            </span>
          </div>
        </div>

        {/* Shipping Information */}
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <p className="text-sm text-gray-600">
            Free shipping for prepaid orders. Handmade in India with strong packaging and home delivery guaranteed.
          </p>
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center space-x-4 mb-4">
          <span className="font-medium text-gray-700">Quantity:</span>
          <div className="flex items-center border rounded">
            <button
              onClick={decreaseQuantity}
              className="px-4 py-2 hover:bg-gray-100"
            >
              -
            </button>
            <span className="px-4">{quantity}</span>
            <button
              onClick={increaseQuantity}
              className="px-4 py-2 hover:bg-gray-100"
            >
              +
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4 mb-6">
          <button
            className="flex-1 bg-black text-white py-3 rounded 
            flex items-center justify-center space-x-2 hover:bg-gray-800"
          >
            <span>Buy it now</span>
          </button>
          <button
            className="flex-1 bg-green-600 text-white py-3 rounded 
            flex items-center justify-center space-x-2 hover:bg-green-700"
          >
            <ShoppingCart />
            <span onClick={() => addToCart()}>Add to Cart</span>
          </button>
          <button
            className="bg-gray-200 p-3 rounded hover:bg-gray-300"
          >
            <Heart className="text-gray-600" />
          </button>
        </div>

        {/* Additional Information Sections */}
        <div className="border-t">
          {/* Shipping & Returns */}
          <div className="border-b">
            <button
              onClick={() => toggleSection('shipping')}
              className="w-full flex justify-between items-center p-4 hover:bg-gray-100"
            >
              <div className="flex items-center">
                <Truck className="mr-2" />
                <span>Shipping & Returns</span>
              </div>
              <span>{activeSection === 'shipping' ? '−' : '+'}</span>
            </button>
            {activeSection === 'shipping' && (
              <div className="p-4 bg-gray-50 text-left">
                <p className="mb-2">• Free shipping for prepaid orders.</p>
                <p className="mb-2">• Handmade in India with strong packaging.</p>
                <p className="mb-2">• Home delivery guaranteed.</p>
                <p>• Shipping within 2-4 business days.</p>
              </div>
            )}
          </div>

          {/* Dimensions */}
          <div className="border-b">
            <button
              onClick={() => toggleSection('dimensions')}
              className="w-full flex justify-between items-center p-4 hover:bg-gray-100"
            >
              <div className="flex items-center">
                <Ruler className="mr-2" />
                <span>Dimensions</span>
              </div>
              <span>{activeSection === 'dimensions' ? '−' : '+'}</span>
            </button>
            {activeSection === 'dimensions' && (
              <div className="p-4 bg-gray-50 text-left">
                <p className="mb-2">• Height: 26 inches</p>
                <p className="mb-2">• Width: 13 inches</p>
                <p>• Depth: Carefully crafted with precise measurements</p>
              </div>
            )}
          </div>

          {/* Care Instructions */}
          <div className="border-b">
            <button
              onClick={() => toggleSection('care')}
              className="w-full flex justify-between items-center p-4 hover:bg-gray-100"
            >
              <div className="flex items-center">
                <HeartIcon className="mr-2" />
                <span>Care Instructions</span>
              </div>
              <span>{activeSection === 'care' ? '−' : '+'}</span>
            </button>
            {activeSection === 'care' && (
              <div className="p-4 bg-gray-50 text-left">
                <p className="mb-2">• Clean with a soft, dry cloth</p>
                <p className="mb-2">• Avoid direct sunlight</p>
                <p className="mb-2">• Keep away from moisture</p>
                <p>• Store in a cool, dry place</p>
              </div>
            )}
          </div>

          {/* Share */}
          <div>
            <button
              className="w-full flex justify-between items-center p-4 hover:bg-gray-100"
            >
              <div className="flex items-center">
                <Share className="mr-2" />
                <span>Share</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 