// import { useEffect, useState, useRef } from "react";
// import axiosInstance from "../lib/axios";
// import ProductCard from "./ProductCard";
// import CustomerReviewSlider from "./CustomerReviewSlider";
// import DivineGods from "./DivineGods"; 
// import DivineGoddesses from "./DivineGoddesses"; 

// function ProductList() {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const scrollContainerRef = useRef(null);

//   useEffect(() => {
//     axiosInstance
//       .get("/products")
//       .then((response) => {
//         console.log("API Response:", response.data);
//         setData(
//           Array.isArray(response.data.products) ? response.data.products : []
//         );
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching products:", error);
//         setError("Failed to load products");
//         setLoading(false);
//       });
//   }, []);

//   if (loading)
//     return (
//       <p className="text-center text-lg font-semibold mt-4">
//         Loading products...
//       </p>
//     );

//   if (error)
//     return <h2 className="text-center text-red-500 text-xl">{error}</h2>;

//   return (
//     <div className="p-5">
//       {/* Section Heading */}
//       <h1 className="text-4xl italic mb-2 ml-11">
//         New in store - <span className="">Navratri SALE IS ON</span>
//       </h1>
//       <p className="text-gray-600 ml-11 mb-6">
//         Check this space for all new Masterpieces
//       </p>

//       {/* Horizontal Scrollable Product List */}
//       <div
//         ref={scrollContainerRef}
//         className="flex overflow-x-auto gap-6 scrollbar-hide scroll-smooth"
//         style={{ whiteSpace: "nowrap", marginLeft: "40px" }}
//       >
//         {data.length > 0 ? (
//           data.map((product) => (
//             <ProductCard key={product._id} product={product} />
//           ))
//         ) : (
//           <p className="text-center text-gray-600">No products available.</p>
//         )}
//       </div>

//       {/* View All Button */}
//       <div className="text-center mt-4">
//         <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition">
//           View All
//         </button>
//       </div>

//       {/* Customer Review Section Below View All */}
//       <div className="mt-10">
//         <CustomerReviewSlider />
//       </div>

//       {/* Text from the image - Styled to Match */}
//       <div className="max-w-4xl mx-auto text-center text-gray-700 mt-10 px-4">
//         <p className="text-lg leading-relaxed">
//           At <span>BudhShiv</span>, we specialize in
//           offering exquisite brass handicrafts that embody the essence of divine
//           beauty and spiritual tranquility. Our collection is crafted with
//           attention to detail with hours or even days of hard work spent by
//           Indian artisans, ensuring each piece radiates a serene and blissful
//           aura, perfect for enhancing your sacred spaces.
//         </p>
//       </div>

//        {/* Divine Gods Section */}
//        <DivineGods />

//        {/* Divine Goddesses Section */}
//        <DivineGoddesses />
//     </div>
//   );
// }

// // export default ProductList;


import { useEffect, useState, useRef } from "react";
import axiosInstance from "../lib/axios";
import ProductCard from "./ProductCard";
import CustomerReviewSlider from "./CustomerReviewSlider";
import DivineGods from "./DivineGods"; 
import DivineGoddesses from "./DivineGoddesses"; 
import { useNavigate } from "react-router-dom";
// import BrassDecorPage from "../pages/BrassDecorPage[2]";

function ProductList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollContainerRef = useRef(null);
  const navigate = useNavigate();  // For navigation

  useEffect(() => {
    axiosInstance
      .get("/products")
      .then((response) => {
        setData(Array.isArray(response.data.products) ? response.data.products : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError("Failed to load products");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center text-lg font-semibold mt-4">Loading products...</p>;
  if (error) return <h2 className="text-center text-red-500 text-xl">{error}</h2>;

  return (
    <div className="p-5">
      <h1 className="text-4xl italic mb-2 ml-11">
        New in store - <span className="">Navratri SALE IS ON</span>
      </h1>
      <p className="text-gray-600 ml-11 mb-6">Check this space for all new Masterpieces</p>

      {/* Horizontal Scrollable Product List */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto gap-4 scrollbar-hide scroll-smooth"
        style={{ whiteSpace: "nowrap", marginLeft: "40px" }}
      >
        {data.length > 0 ? (
          data.map((product) => <ProductCard key={product._id} product={product} />)
        ) : (
          <p className="text-center text-gray-600">No products available.</p>
        )}
      </div>

      {/* View All Button */}
      <div className="text-center mt-4">
        <button 
          onClick={() => navigate("/collection/allproduct")}
          className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
        >
          View All
        </button>
      </div>

      {/* Customer Review Section */}
      <div className="mt-10">
        <CustomerReviewSlider />
      </div>

      {/* Description */}
      <div className="max-w-4xl mx-auto text-center text-gray-700 mt-10 px-4">
        <p className="text-lg leading-relaxed">
          At <span>BudhShiv</span>, we specialize in offering exquisite brass handicrafts that embody the essence of divine
          beauty and spiritual tranquility. Our collection is crafted with attention to detail, ensuring each piece radiates
          a serene and blissful aura, perfect for enhancing your sacred spaces.
        </p>
      </div>

      {/* Divine Sections */}
      <DivineGods />
      <DivineGoddesses />
      {/* <BrassDecorPage/> */}
    </div>
  );
}

export default ProductList;
