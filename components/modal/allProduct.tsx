import React from 'react'
import { useSelector } from 'react-redux'
import Tooltip from '@mui/material/Tooltip';
import axios from 'axios';
import { toast } from 'react-toastify';

const allProduct = () => {
  const {allProduct} =useSelector((state: any) => state.seller.allSellerProduct)
  const { users } = useSelector((state: any) => state.order);

  console.log(allProduct,"setet");
  const deleteProduct = async (productId: any) => {
    try {
      console.log(productId, "object");
      const delProduct = await axios.post(`/api/seller/deleteProduct/${productId}`)
      toast(delProduct.data.message, { hideProgressBar: true, autoClose: 2000, type: 'success' })
      const _id = users._id
    } catch (error) {

    }
  }
  return (
    <div >
      {allProduct && allProduct.map((product:any) => (
        <>
          {console.log(product, "product")}
          <ul className="">
            <li className="">
              <div className="">
                {/**@ts-ignore */}
                <img className="flex-shrink-0 object-cover w-20 h-20 dark:border-transparent rounded outline-none sm:w-32 sm:h-32 dark:bg-gray-500" src={product.fileUrl} alt="Polaroid camera" />
                <div className="flex flex-col justify-between w-full pb-4">
                  <div className="flex justify-between w-full pb-2 space-x-2">
                    <div className="space-y-1">
                      {/**@ts-ignore */}
                      <h3 className="text-lg font-semibold leadi sm:pr-8">{product.productname}</h3>
                      {/**@ts-ignore */}
                      <p className="text-sm dark:text-gray-400">{product.selectedProductType}</p>

                    </div>
                    <div className="text-right">
                      {/**@ts-ignore */}
                      <p className="text-lg font-semibold">{product.price}</p>
                    </div>
                    {product.deleted === true ? <div className="">
                      <Tooltip title="Disable">
                        <button className="disabled:opacity-100 removesellerproduct flex items-center px-2 py-1 pl-0 space-x-1" disabled>Deleted</button>
                      </Tooltip>
                    </div> :
                      <div className="flex text-sm divide-x">
                        <button type="button" className="removesellerproduct flex items-center px-2 py-1 pl-0 space-x-1">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 fill-current" >
                            <path d="M96,472a23.82,23.82,0,0,0,23.579,24H392.421A23.82,23.82,0,0,0,416,472V152H96Zm32-288H384V464H128Z"></path>
                            <rect width="32" height="200" x="168" y="216"></rect>
                            <rect width="32" height="200" x="240" y="216"></rect>
                            <rect width="32" height="200" x="312" y="216"></rect>
                            <path d="M328,88V40c0-13.458-9.488-24-21.6-24H205.6C193.488,16,184,26.542,184,40V88H64v32H448V88ZM216,48h80V88H216Z"></path>
                          </svg>
                          <span onClick={() => deleteProduct(product._id)}>Remove</span>
                        </button>
                      </div>}
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </>))
      }
    </div>
  )
}

export default allProduct