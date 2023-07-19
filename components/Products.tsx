import React from 'react';

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
  //@ts-ignore
  console.log(products, "prop");
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {products && products.map((product) => (
        <div key={product.id} className="bg-white shadow-md rounded-lg p-4">
          <div className='cartImg'>
            {/**@ts-ignore */}
            <img src={product.fileUrl}
              alt={product.name}
              className="cartImg"
            />
          </div>
          {/**@ts-ignore */}
          <h2 className="text-xl font-bold mb-2">{product.productname}</h2>
          <p className="text-gray-600 mb-2">${product.price} BNB</p>
          <p className="text-gray-800">{product.description}</p>
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Add to Cart
        </button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mx-7 cartbtn">
          Buy
        </button>
        </div>
      ))}
    </div>

  );
};

export default ProductList;
