import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Modal from '@mui/material/Modal';
import AllSellerOrder from "../../components/modal/allSellerOrder"
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { setAllSellerOrder } from '../../redux/slices/seller';
import { store } from '../../redux/store';
const style = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  maxWidth: '805 !important',
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  padding: '20px',
  maxHeight: '90%',
  overflowY: 'auto',
};
const Order = () => {
  const { users } = useSelector((state: any) => state.order);
  const userId = users._id;

  const [orders, setOrders] = useState([]);
  const [open, setOpen] = useState(false);
  var mergedData: any
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("/api/seller/order", { userId });
        mergedData = response.data.mergedData;
        setOrders(mergedData);
        if (mergedData && mergedData.length > 0) {
          store.dispatch(setAllSellerOrder({ orders: mergedData }));
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);
  console.log(orders, "ordersss", mergedData);
  const handleOpen = () => {
    console.log(mergedData, "mergedDatamergedData");
    setOpen(true)
  };
  const handleClose = () => {
    setOpen(false)
  };
  return (
    <div className="mx-12">
      <h1>Orders</h1>
      {orders.length === 0 && <>

        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box></>}
      {orders.slice(0, 1).map((order, index) => (
        <table className="border-collapse border border-gray-400 w-5/6">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-400 py-2 px-4">Product Name</th>
              <th className="border border-gray-400 py-2 px-4">Image</th>
              <th className="border border-gray-400 py-2 px-4">Buyer Name</th>
              <th className="border border-gray-400 py-2 px-4">Buyer Email</th>
            </tr>
          </thead>
          <tbody>

            <tr key={index} className="border border-gray-400">
              <td className="border border-gray-400 py-2 px-4">
                {/**@ts-ignore */}
                {order.productData.productname}
              </td>
              <td className="border border-gray-400 py-2 px-4">
                {/**@ts-ignore */}
                <img src={order.productData.fileUrl}
                  //@ts-ignore 
                  alt={order.productData.productname}
                  className="cartImg"
                />
              </td>
              {/**@ts-ignore */}
              <td className="border border-gray-400 py-2 px-4">{order.userData.firstname} {order.userData.lastname}</td>
              {/**@ts-ignore */}
              <td className="border border-gray-400 py-2 px-4">{order.userData.email}</td>
            </tr>

          </tbody>
          <button className="seeMoreButtonSellerOrder bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded my-1" type='button' onClick={() => handleOpen()}>
            See More
          </button>
        </table>
      ))}
      <div className="modal-background">

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <AllSellerOrder />
          </Box>
        </Modal>
      </div>
    </div>

  )
}

export default Order;
