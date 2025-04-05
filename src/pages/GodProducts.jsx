import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProductStore } from "../stores/useProductStore";
import ProductCard from "../components/ProductCard";
//import { useParams } from "react-router-dom";
//import { useProductStore } from "../stores/useProductStore";

//const { godName } = useParams();
//const { products, fetchProductsByName } = useProductStore();


const GodProductsPage = () => {
  const { godName } = useParams();
  const { products, fetchProductsByName } = useProductStore();

  useEffect(() => {
    console.log("Fetching products for:", godName);
    fetchProductsByName(godName);
    window.scrollTo(0, 0);
  }, [godName]);
  console.log("Products:", products);
  return (
    
    <div className="p-4 mt-70">
      <h1>God Name: {godName}</h1>

      <h2 className="text-2xl font-bold mb-4 text-center">{godName} Idols</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {products.length > 0 ? (
          products.map((product) => <ProductCard key={product._id} product={product} />)
        ) : (
          <p>No idols found for {godName}.</p>
        )}
      </div>
    </div>
  );
};

export default GodProductsPage;
