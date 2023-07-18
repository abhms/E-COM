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
    console.log(products,"prop");
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {products.map((product) => (
        <div key={product.id} className="bg-white shadow-md rounded-lg p-4">
            {/**@ts-ignore */}
          <img src={product.fileUrl}
            alt={product.name}
            className="w-full h-32 object-cover mb-4"
          />
          {/**@ts-ignore */}
          <h2 className="text-xl font-bold mb-2">{product.productname}</h2>
          <p className="text-gray-600 mb-2">${product.price}</p>
          <p className="text-gray-800">{product.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
