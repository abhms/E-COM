import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';

const allSellerOrder = () => {
  const { allSellerOrder } = useSelector((state: any) => state.seller);
  const { users } = useSelector((state: any) => state.order)
  console.log(allSellerOrder, "inpopup", users._id);
  const [productId, setProductId] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/seller/confirmOrder/${users._id}`);
        console.log(response.data.PurchaseOrder, "this is the response");
        setProductId(response.data.PurchaseOrder)
      } catch (error) {
      }
    };

    fetchData();
  }, []);
  //@ts-ignore
  // console.log(productId[0].product,"iddd");
  const confirmOrder = async (productId: string, userEmail: string) => {
    try {
      const confirm = await axios.post(`/api/seller/confirmOrder/${productId}/${userEmail}/${users._id}`, {
        sold: true
      });
      console.log("confirm", confirm);
      toast(confirm.data.message, { hideProgressBar: true, autoClose: 2000, type: 'success' })
      // Handle success or further actions here
    } catch (error) {
      // Handle errors here
      console.error("Error confirming order:", error);
    }
  };
  const cancelOrder = async (productId: string, userEmail: string) => {
    try {
      const confirm = await axios.post(`/api/seller/confirmOrder/${productId}/${userEmail}/${users._id}`, {
        sold: false
      });
      console.log("confirm", confirm);
      toast(confirm.data.message, { hideProgressBar: true, autoClose: 2000, type: 'success' })

      // Handle success or further actions here
    } catch (error) {
      // Handle errors here
      console.error("Error confirming order:", error);
    }
  }
  return (
    <div>
      <table className="border-collapse border border-gray-400 w-7/8">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-400 py-2 px-4">Product Name</th>
            <th className="border border-gray-400 py-2 px-4">Image</th>
            <th className="border border-gray-400 py-2 px-4">Buyer Name</th>
            <th className="border border-gray-400 py-2 px-4">Buyer Email</th>
            <th className="border border-gray-400 py-2 px-4">Action</th>
          </tr>
        </thead>
        {allSellerOrder && allSellerOrder.length > 0 && allSellerOrder.map((order: any, index: any) => (
          <>

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
                <td className="border border-gray-400 py-2 px-4">
                  {/**@ts-ignore */}
                  {order.ProductId[index] === productId[index]?.product ?
                    <>
                      {/**@ts-ignore */}
                      {productId[index]?.sold ? <>Accepted</> : <>Reject</>}
                    </> :
                    <td className="border border-gray-400 py-2 px-4">
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded my-1"
                        onClick={() => confirmOrder(order.productData._id, order.userData.email)}
                      >
                        Accept
                      </button>
                      <Stack direction="row" spacing={2}>
                        <Button variant="outlined" color="error" onClick={() => cancelOrder(order.productData._id, order.userData.email)}>
                          Reject
                        </Button>
                      </Stack>

                    </td>

                  }

                </td>

              </tr>

            </tbody>

          </>))}
      </table>
    </div>
  )
}

export default allSellerOrder