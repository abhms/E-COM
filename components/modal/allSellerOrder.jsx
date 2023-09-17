import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';

const allSellerOrder = () => {
  const { allSellerOrder } = useSelector((state) => state.seller);
  console.log(allSellerOrder, "inpopup");

  const confirmOrder=async()=>{
console.log("confirm");
  }
  const cancelOrder=async()=>{
console.log("cancel Order");
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
        {allSellerOrder && allSellerOrder.length > 0 && allSellerOrder.map((order, index) => (
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
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded my-1" onClick={confirmOrder}>
                    Accept
                  </button>
                  <Stack direction="row" spacing={2}>
                    <Button variant="outlined" color="error" onClick={cancelOrder}>
                      Reject
                    </Button>
                  </Stack>
                </td>

              </tr>

            </tbody>

          </>))}
      </table>
    </div>
  )
}

export default allSellerOrder