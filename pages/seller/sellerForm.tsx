import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';

const SellerForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    mobileNo: '',
    address: '',
    image: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(formData);
    // Add any further processing or API calls here
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-gray-100 rounded-lg">
        <div className="mb-4">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border rounded-lg p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="border rounded-lg p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="mobileNo">Mobile No</label>
          <input
            type="tel"
            id="mobileNo"
            name="mobileNo"
            value={formData.mobileNo}
            onChange={handleChange}
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
          <label htmlFor="image">Image</label>
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
  );
};

export default SellerForm;
