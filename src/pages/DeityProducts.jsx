import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import axios from "../lib/axios";
import Navbar from "../components/Navbar";

function DeityProducts() {
  const { name } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/api/products/search?deity=${name}`)
      .then((res) => {
        setProducts(res.data.products);
        setLoading(false);
        console.log(name) ;
      })
      .catch((err) => {
        console.error("Error fetching deity products", err);
        setLoading(false);
      });
  }, [name]);
  console.log(products) ;

  const formatName = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  if (loading)
    return <p className="text-center mt-60 text-xl text-gray-500">Loading...</p>;

  return (
    <div className="p-6 mt-60 max-w-7xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
        Results for: <span className="text-blue-600">{formatName(name)}</span>
      </h2>

      {products.length === 0 ? (
        <p className="text-center text-lg text-gray-500">
          No products found for <strong>{formatName(name)}</strong>.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-center">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default DeityProducts;

