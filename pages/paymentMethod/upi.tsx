import React, { useState } from 'react';
import { FaGooglePay, FaCcPaypal } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const Upi = () => {
  const [payment, setPayment] = useState<string | undefined>();
  const { allData, address ,users} = useSelector((state: any) => state.order);

  const router = useRouter();
  if(!allData){
    router.push("/")
  }
  const radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPayment(event.target.value);
  };

  return (
    <div className='payment_upi'>
      <h1>UPI Payment</h1>
      <p>
        <input
          type="radio"
          name="drink"
          value="GooglePay"
          id="GooglePay"
          onChange={radioHandler}
        />
        <label htmlFor="GooglePay">GooglePay</label>
        {payment === 'GooglePay' && (
          <div className="mt-2">
            <FaGooglePay size={50} />
            <label className="block font-medium mb-1" htmlFor="upiId">Enter UPI ID:</label>
            <input
              type="text"
              id="upiId"
              name="upiId"
              placeholder="Enter your UPI ID"
              className="w-full border rounded-md p-2"
            />
            <div className="mt-6">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                disabled={!payment}
              >
                Pay
              </button>
            </div>
          </div>
        )}
      </p>
      <p>
        <input
          type="radio"
          name="drink"
          value="Paytm"
          id="Paytm"
          onChange={radioHandler}
        />
        <label htmlFor="Paytm">Paytm</label>
        {payment === 'Paytm' && (
          <div className="mt-2">
            <label className="block font-medium mb-1" htmlFor="upiId">Enter Paytm Number:</label>
            <input
              type="Number"
              id="upiId"
              name="upiId"
              placeholder="Enter Paytm Number"
              className="w-full border rounded-md p-2"
            />
            <div className="mt-6">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                disabled={!payment}
              >
                Pay
              </button>
            </div>
          </div>
        )}
      </p>
      <p>
        <input
          type="radio"
          name="drink"
          value="paypal"
          id="paypal"
          onChange={radioHandler}
        />
        <label htmlFor="paypal">paypal</label>
        {payment === 'paypal' && (
          <div className="mt-2">
            <FaCcPaypal size={50} />

            <label className="block font-medium mb-1" htmlFor="upiId">Enter Paytm Id:</label>
            <input
              type="text"
              id="upiId"
              name="upiId"
              placeholder="Enter Paytm Id"
              className="w-full border rounded-md p-2"
            />
            <div className="mt-6">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                disabled={!payment}
              >
                Pay
              </button>
            </div>
          </div>
        )}
      </p>
    </div>
  );
};

export default Upi;
