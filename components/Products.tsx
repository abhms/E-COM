import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  deleted: boolean;
}

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const [token, setOriginalToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { users } = useSelector((state: any) => state.order);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const tok = localStorage.getItem('token');
      setOriginalToken(tok);
    }


    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const addToCart = async (productId: number) => {
    const res = await axios.post(
      '/api/product/addCart',
      { productId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    if (res.data.message !== "You are not login") {
      toast(res.data.message, { hideProgressBar: true, autoClose: 2000, type: 'success' })
    }
    if (res.data.message === "You are not login") {
      toast(res.data.message, { hideProgressBar: true, autoClose: 2000, type: 'error' })
    }
    console.log(productId, "added to cart");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {loading ? (
        <div className="flex items-center justify-center h-20">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <span className="ml-2">Loading products...</span>
        </div>
      ) : (
      /**@ts-ignore */
        products && products.map((product) => (
          <div key={product.id} className="bg-white shadow-md rounded-lg p-4">
            <div className="cartImg">
              {/* @ts-ignore */}
              <img src={product.fileUrl}
                alt={product.name}
                className="cartImg"
              />
            </div>
            {/* @ts-ignore */}
            <h2 className="text-xl font-bold mb-2">{product.productname}</h2>
            <p className="text-gray-600 mb-2">${product.price} BNB</p>
            {/* @ts-ignore */}
            {!users.seller && <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              //@ts-ignore
              onClick={() => addToCart(product._id)}
            >
              Add to Cart
            </button>}

          </div>
        ))
      )}
    </div>
  );
};

export default ProductList;
