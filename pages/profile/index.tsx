import axios from 'axios';
import React, { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import { Navbar } from '../../components/Navbar';
import Footer from '../../components/Footer';
import { setUsers } from "../../redux/slices/order";
import { store } from "../../redux/store";
import { useSelector } from 'react-redux';


const Profile = () => {
  const {users } = useSelector((state: any) => state.order);
  const [product,setProduct]=useState([])
  const [seller, setseller] = useState(false)
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          console.log('Token not found');
          return;
        }

        setseller(users.seller)
        const getProduct =await axios.get("/api/user/get/getOrder",{
          headers:{
            Authorization:`Bearer ${token}`
          }
        })
        console.log(getProduct.data.ordersWithProductDetails,"getProduct");
        setProduct(getProduct.data.ordersWithProductDetails)
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
  }, []);
  console.log(product,"prooo")
  return (
    <>
      <Navbar />
      <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-6  my-2">
        <h1 className="text-2xl font-semibold mb-4">My Profile</h1>
        <div className="mb-4">
          <label className="text-gray-700 font-bold">First Name: {users?.firstname}</label>
          <div className="mt-1"></div>
        </div>
        <div className="mb-4">
          <label className="text-gray-700 font-bold">Last Name: {users?.lastname}</label>
          <div className="mt-1"></div>
        </div>
        <div className="mb-4">
          <label className="text-gray-700 font-bold">Email: {users?.email}</label>
          <div className="mt-1"></div>
        </div>
      </div>
      {!seller && <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-6 my-2">
        <h1 className="text-2xl font-semibold mb-4">All orders from anytime</h1>
        {product.map((order, index) => (
          <div key={index} className="mb-4">
                {/*@ts-ignore*/}
            {order.productDetails.map((productDetail, productIndex) => (
              <div key={productIndex} className="border p-4 rounded-md mb-2">
                {/*@ts-ignore*/}
                <img src={productDetail.fileUrl} alt={productDetail.name} className="w-40 h-40 object-contain mx-auto" />
                <p className="font-semibold">productname: {productDetail.productname}</p>
                <p className="text-gray-600">Type: {productDetail.selectedProductType}</p>
                <p className="text-gray-600">Price: ${productDetail.price}</p>
                <p className="text-sm">Description: {productDetail.description}</p>
              </div>
            ))}
          </div>
        ))}
      </div>}
      
      <div style={{ minHeight: "calc(100vh - 60px)", display: "flex", flexDirection: "column" }}>
                <div className="cartfooter" style={{ marginTop: "auto" }}>
                    <Footer/>
                </div>
            </div>
    </>
  );
};

export default Profile;
