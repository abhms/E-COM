import React, { useState, useEffect } from 'react';
import { Navbar } from "../components/Navbar";
import axios from 'axios';
import ProductList from '../components/Products';
const Home: React.FC = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/getProducts");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

   //@ts-ignore
   console.log(products.product,"propooo");
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
      {/*@ts-ignore*/}
        <ProductList products={products.product} />
      </div>
    </>
  );
};

export default Home;
