import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Order = () => {
  const { users } = useSelector((state: any) => state.order);
  const userId = users._id;

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("/api/seller/order", { userId });
        const mergedData = response.data.mergedData;
        setOrders(mergedData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className='mx-12'>
      <h1>Orders</h1>
      <ul>
        {orders.map(order => (
          <>
          {/**@ts-ignore */}
          <li>Product Name: {order.productData.productname}</li>
          </>
        ))}
      </ul>
    </div >
  )
}

export default Order;
