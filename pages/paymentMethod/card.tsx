import React, { useState, useEffect, ChangeEvent } from "react";
import StripeCheckout from 'react-stripe-checkout';
import axios from "axios";
import { useSelector,useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { setAddress, setMatchedTenants } from '../../redux/slices/order';
import { store } from '../../redux/store';
import { useRouter } from 'next/router';

interface StripePaymentProps {
  amount: number;
  onPaymentSuccess: (token: any) => void; // Update the type as per your requirement
}

const StripePayment: React.FC<StripePaymentProps> = ({ amount, onPaymentSuccess }) => {
  const [token, setOriginalToken] = useState<string | null>(null);
  const { allData, address ,users} = useSelector((state: any) => state.order);
  const router = useRouter();

  // console.log( "datata", allData.length);
  if(!allData){
    router.push("/")
  }
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const tok = localStorage.getItem('token');
    setOriginalToken(tok);
  }, []);

  useEffect(() => {
    if (token) {
      const fetchProducts = async () => {
        try {
          const response = await axios.get("/api/product/addCart", {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
          setProducts(response.data.products);

        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };

      fetchProducts();
    }
  }, [token]);
  var price = 0;
  for (var i = 0; i < products.length; i++) {
    //@ts-ignore
    price += products[i].price;
  }

  console.log(price, "price");
  // console.log(token,"tokenneen");
  const handleToken = async (token: any) => {
    
    const buyProduct = await axios.post("/api/product/buyCash", { allData, address, price,users })
    store.dispatch(setAddress({  }));
    store.dispatch(setMatchedTenants({}))
    router.push('/');
    toast(buyProduct.data.message, { hideProgressBar: true, autoClose: 2000, type: 'success' })
  };

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

        {/*@ts-ignore*/}
        <StripeCheckout
          token={handleToken}
          stripeKey={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!}
          amount={amount}
          name="Your Product Name"
          description="Product description"
          currency="USD"
        >
          <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">Pay {price}</button>
        </StripeCheckout>
      </div>
    </div>
  );
};

export default StripePayment;