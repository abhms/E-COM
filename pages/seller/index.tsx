import { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import { Navbar } from '../../components/Navbar';
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast } from "react-toastify";

const Seller = () => {
  const router = useRouter();
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [productname, setProductname] = useState('');
  const [selectedProductType, setSelectedProductType] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const productTypes = [
    'Electronics',
    'Clothing',
    'Home',
    'Books',
    'Beauty',
  ];
  var tok: string | null;
  useEffect(() => {
    const localToken = localStorage.getItem('token');
    tok= localToken;
    if (!localToken) {
      alert('Please login to become a seller');
      router.push('/auth/signin');
      return;
    }
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    
    const files = e.target.files;
    if (files) {
      setSelectedFiles(files);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !productname || !selectedFiles || !price || !selectedProductType) {
      setError('All fields are required*');
      return;
    }

    const formData1 = new FormData();

    for (var i = 0; i < selectedFiles.length; i++) {
      formData1.append("file", selectedFiles[i]);
    }
    
    formData1.append("upload_preset", "my-uploads");
    
    const uploadImage = async () => {
      const data = await fetch(`https://api.cloudinary.com/v1_1/dzzmcvmkr/image/upload`, {
        method: "POST",
        body: formData1,
      }).then((res) => res.json());
    
      return data.secure_url;
    };
    
    const fileUrl = await uploadImage(); 
    
    console.log(fileUrl, "datatatattatat");
    const token = localStorage.getItem('token');
    const res = await axios.post(
      '/api/seller/product',
      { productname, selectedProductType, price, description, fileUrl },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(res,"esss");
    toast(res.data.message, { hideProgressBar: true, autoClose: 2000, type: 'success' })
    console.log(res, 'resssss');
  };

  return (
    <>
      <Navbar />
      <br />

      <div className="container mx-auto">
        <form onSubmit={handleSubmit} className="max-w-md mx-auto border rounded-md px-8 py-6 mb-4">
          <h1 className="text-3xl font-bold mb-4">Product Description Form</h1>
          {error && error.length ? <h1 className="text-red-500">{error}</h1> : null}

          <div className="mb-4">
            <label htmlFor="name" className="block text-lg font-medium mb-2">
              Product Name
            </label>
            <input
              type="text"
              id="name"
              placeholder='Product Name'
              className="border border-gray-300 rounded-lg px-4 py-2 w-full"
              value={productname}
              onChange={(e) => setProductname(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="productType" className="block text-lg font-medium mb-2">
              Product Type
            </label>
            <select
              id="productType"
              className="border border-gray-300 rounded-lg px-4 py-2 w-full"
              value={selectedProductType}
              onChange={(e) => setSelectedProductType(e.target.value)}
            >
              <option value="">Select a product type</option>
              {productTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="files" className="block text-lg font-medium mb-2">
              Files:
            </label>
            <div className="flex items-center">
              <label
                htmlFor="fileInput"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
              >
                Select Files
              </label>
              <span className="ml-4">{selectedFiles?.length ?? 0} files selected</span>
              <input
                type="file"
                id="fileInput"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="price" className="block text-lg font-medium mb-2">
              Product Price (in crypto):
            </label>
            <input
              type="text"
              id="price"
              className="border border-gray-300 rounded-lg px-4 py-2 w-full"
              value={price}
              placeholder="Price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="message" className="block text-lg font-medium mb-2">
              Product Description
            </label>
            <textarea
              id="message"
              rows={4}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full"
              placeholder="Please provide product description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Upload
          </button>
        </form>
      </div>
    </>
  );
};

export default Seller;
