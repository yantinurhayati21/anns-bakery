import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const ProductModal = ({ product, onClose }) => {
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    const fetchCategoryName = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/categories/${product.category_id}`);
        const data = await response.json();
        setCategoryName(data.name);
      } catch (error) {
        console.error('Error fetching category name:', error);
      }
    };

    if (product?.category_id) {
      fetchCategoryName();
    }
  }, [product?.category_id]);

  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl relative max-w-3xl w-full">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <X size={24} />
        </button>
        <div className="flex flex-col md:flex-row">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full md:w-1/2 h-64 object-cover rounded-lg shadow-md mb-6 md:mb-0 md:mr-6"
          />
          <div className="md:w-1/2">
            <h3 className="text-2xl font-bold mb-2 text-purple-800">{product.name}</h3>
            <p className="text-lg text-fuchsia-600 mb-4">Category: {categoryName}</p>
            <p className="text-xl font-semibold text-purple-800 mb-4">Rp.{product.price}</p>
            <p className="text-md text-gray-700 mb-4">{product.description}</p>
            <p className="text-md text-gray-600 mb-4">Stock: {product.stock}</p>
            <div className="flex gap-2">
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
