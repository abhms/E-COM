import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const [token, setOriginalToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Add a loading state

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const tok = localStorage.getItem('token');
      setOriginalToken(tok);
    }

    // Assuming you're fetching products asynchronously
    // You can modify this part according to your data fetching method
    // For example, if you're using axios, you can make an API call here.
    // Simulating an async fetch with setTimeout:
    setTimeout(() => {
      setLoading(false); // Set loading to false when the products are fetched
    }, 2000); // Replace 2000 with your actual API call or loading time
  }, []);

  const addToCart = async (productId: number) => {
    const res = await axios.post(
      '/api/product/addCart',
      {productId},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    if(res.data.message!=="You are not login"){
      toast(res.data.message, { hideProgressBar: true, autoClose: 2000, type: 'success' })
    }
    if(res.data.message==="You are not login"){
    toast(res.data.message, { hideProgressBar: true, autoClose: 2000, type: 'error' })
    }
    console.log(productId, "added to cart");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {loading ? ( // Display loader if loading is true
        <div className="flex items-center justify-center h-20">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <span className="ml-2">Loading products...</span>
        </div>
      ) : (
        // Display products when loading is false
        products.map((product) => (
          <div key={product.id} className="bg-white shadow-md rounded-lg p-4">
            <div className="cartImg">
              {/* @ts-ignore */}
              <img src={product.fileUrl} // Changed from product.fileUrl to product.imageUrl
                alt={product.name}
                className="cartImg"
              />
            </div>
            <h2 className="text-xl font-bold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-2">${product.price} BNB</p>
            <p className="text-gray-800">{product.description}</p>
            {/* @ts-ignore */}
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              //@ts-ignore
              onClick={() => addToCart(product._id)} // Pass the product id to addToCart function
            >
              Add to Cart
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mx-7 cartbtn">
              Buy
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default ProductList;
