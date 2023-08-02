import React, { useState, useEffect } from 'react';
import { Navbar } from "../components/Navbar";
import axios from 'axios';
import ProductList from '../components/Products';
import Footer from '../components/Footer';
const Home: React.FC = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/product/getProducts");
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
     <div className="home-container">
        <Navbar />
        <div className="content-container">
          {/*@ts-ignore */}
          <ProductList products={products.product} />
        </div>
        <div style={{ minHeight: "calc(100vh - 60px)", display: "flex", flexDirection: "column" }}>
            <div className="cartfooter" style={{ marginTop: "auto" }}>
                <Footer />
            </div>
            </div>
      </div>
    </>
  );
};

export default Home;
