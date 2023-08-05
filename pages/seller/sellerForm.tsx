import React, { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import { Navbar } from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast } from 'react-toastify';
const SellerForm: React.FC = () => {
  const [formData, setFormData] = useState({
    mobileNo: '',
    address: '',
    image: '',
    bussinessName: '',
    gstNo: '',
    panNo: '',
    aadharNo:''
  });
  const [token, setOriginalToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const tok = localStorage.getItem('token');
      console.log(tok,"tok");
      setOriginalToken(tok);
    } 
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  console.log(token,"tokenen",formData);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const res = await axios.post(
      '/api/seller/sellerdetail',
      {formData},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    toast(res.data.message, { hideProgressBar: true, autoClose: 2000, type: 'success' })
    console.log(formData);
    router.push("/seller")
  };

  return (
    <>
      <Navbar />

      <div className="p-4">
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-gray-100 rounded-lg">
          <div className="mb-4">
            <label htmlFor="name">Bussiness Name</label>
            <input
              type="text"
              id="name"
              name="bussinessName"
              value={formData.bussinessName}
              onChange={handleChange}
              className="border rounded-lg p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="mobileNo">Mobile No</label>
            <input
              type="number"
              id="mobileNo"
              name="mobileNo"
              value={formData.mobileNo}
              maxLength={10}
              onChange={handleChange}
              className="border rounded-lg p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="name">Gst No</label>
            <input
              type="text"
              id="name"
              name="gstNo"
              value={formData.gstNo}
              onChange={handleChange}
              maxLength={15}
              className="border rounded-lg p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="name">Pan Card No</label>
            <input
              type="text"
              id="name"
              name="panNo"
              value={formData.panNo}
              onChange={handleChange}
              maxLength={10}
              className="border rounded-lg p-2 w-full"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="name">Aadhar No</label>
            <input
              type="text"
              id="name"
              name="aadharNo"
              value={formData.aadharNo}
              onChange={handleChange}
              maxLength={10}
              className="border rounded-lg p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              //@ts-ignore
              onChange={handleChange}
              className="border rounded-lg p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image">Business Logo</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="border rounded-lg p-2 w-full"
            />
          </div>
          <div>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
              Submit
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default SellerForm;
