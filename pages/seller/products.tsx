import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {useDispatch, useSelector } from 'react-redux';
import AllProduct from '../../components/modal/allProduct';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { setAllSellerProduct } from '../../redux/slices/seller';
import { store } from '../../redux/store';
const style = {
  position: 'fixed',
  top: '50%', // Center the modal vertically
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  maxWidth: '435px',
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  padding: '20px',
  maxHeight: '80%', // Set a maximum height to keep the modal within the viewport
  overflowY: 'auto', 
};
const Products = () => {
  const { users } = useSelector((state: any) => state.order);
  const [allProduct, setAllProduct] = useState([]);
  const [open, setOpen] = React.useState(false);

 

  useEffect(() => {
    async function fetchData() {
      try {
        const _id = users._id
        const response = await axios.post("/api/seller/getProducts", { _id });
        setAllProduct(response.data.getProduct)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);
  const handleOpen = () => {
    store.dispatch(setAllSellerProduct({allProduct}))
    setOpen(true)
  };
  const handleClose = () => {
    setOpen(false)
  };

  return (
    <div className='mx-12'>
      {allProduct.slice(0, 2).map((product) => (
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
                    <div className="flex text-sm divide-x">
                      <button type="button" className="removesellerproduct flex items-center px-2 py-1 pl-0 space-x-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 fill-current" >
                          <path d="M96,472a23.82,23.82,0,0,0,23.579,24H392.421A23.82,23.82,0,0,0,416,472V152H96Zm32-288H384V464H128Z"></path>
                          <rect width="32" height="200" x="168" y="216"></rect>
                          <rect width="32" height="200" x="240" y="216"></rect>
                          <rect width="32" height="200" x="312" y="216"></rect>
                          <path d="M328,88V40c0-13.458-9.488-24-21.6-24H205.6C193.488,16,184,26.542,184,40V88H64v32H448V88ZM216,48h80V88H216Z"></path>
                        </svg>
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </>))
      }
      <button className='block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' type='button' onClick={handleOpen}>see more</button>

      <div className="modal-background">

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <AllProduct />
          </Box>
        </Modal>
      </div>

    </div >
  )
}

export default Products