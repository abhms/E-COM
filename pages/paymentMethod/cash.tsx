import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { setAddress ,setMatchedTenants} from '../../redux/slices/order';
import { store } from '../../redux/store';
import { useRouter } from 'next/router';
const cash = () => {
  const { allData, address,users } = useSelector((state: any) => state.order);
  console.log("datata",users);
  const [token, setOriginalToken] = useState<string | null>(null);
  const [payment,setPayment]=useState("")
  const router = useRouter();
  if(!allData){
    router.push("/")
  }

  useEffect(() => {
    const tok = localStorage.getItem('token');
    setOriginalToken(tok);
    setPayment("Cash on Delivery")
  }, []);
  console.log(payment,"payment")
  const buy = async () => {
    
    const buyProduct=await axios.post("/api/product/buy",{allData,address,payment},{
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
    store.dispatch(setAddress({  }));
    store.dispatch(setMatchedTenants({}))
    router.push('/');
    toast(buyProduct.data.message, { hideProgressBar: true, autoClose: 2000, type: 'success' });
    console.log(buyProduct,"buyProduct");
  }

  return (
    <div>
      <div className="address_cash rounded-md shadow-md">
        <div className="flex items-center">
          <input
            checked
            id="default-radio-2"
            type="radio"
            value=""
            name="default-radio"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="default-radio-2"
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Selected Address
          </label>
        </div>
        <h2>{address?.address}</h2>
        <h2>{address?.pincode}</h2>
        <h2>{address?.city}</h2>
        <h2>{address?.state}</h2>

        <Button onClick={buy}>Place Order</Button>
      </div>
    </div>
  )
}

export default cash