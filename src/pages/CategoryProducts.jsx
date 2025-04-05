import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useProductStore } from "../stores/useProductStore";
import ProductCard from "../components/ProductCard";

const CategoryProducts = () => {
  const { category } = useParams();
  const { fetchProductsByCategory, products, loading } = useProductStore();

  const formattedCategory = useMemo(() => category.replace(/-/g, " "), [category]);

  useEffect(() => {
    if (formattedCategory) {
      fetchProductsByCategory(formattedCategory);
    }
  }, [formattedCategory, fetchProductsByCategory]);

  const formatName = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  if (loading)
    return <p className="text-center mt-60 text-xl text-gray-500">Loading...</p>;

  return (
    <div className="p-6 mt-60 max-w-7xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
        Results for: <span >{formatName(formattedCategory)}</span> Idols
      </h2>

      {products.length === 0 ? (
        <p className="text-center text-lg text-gray-500">
          No products found for <strong>{formatName(formattedCategory)}</strong>.
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
};

export default CategoryProducts;
