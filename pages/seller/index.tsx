import { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import { Navbar } from '../../components/Navbar';
import { useRouter } from 'next/router';
import axios from 'axios';
const Seller = () => {
  const router = useRouter();
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [productname, setProductname] = useState('');
  const [selectedProductType, setSelectedProductType] = useState('');
  const [price, setPrice] = useState('');
  const [decription, setDecription] = useState('');
  const [error, setError] = useState('');
  const productTypes = [
    'Electronics',
    'Clothing',
    'Home',
    'Books',
    'Beauty',
    // Add more product types as needed
  ];
  var tok:string |null
  useEffect(() => {
    const localToken = localStorage.getItem('token');
    tok=localToken
    if (!localToken) {
      alert("please login to become to seller")
      router.push('/auth/signin');
      return;
    }
  }, []);


  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setSelectedFiles(files);
    }
    console.log("object", e);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!decription || !productname || !selectedFiles || !price || !selectedProductType) {
      setError("all fields are required*")
      return;
    }
    console.log(tok,"toooo");
    const res = await axios.post('/api/seller/product', {

      decription, productname, selectedFiles, price, selectedProductType, headers: {
        Authorization: `Bearer ${tok}`
      }
    });
    console.log(res, "resssss");
  };
  console.log(decription, productname, selectedFiles, price, selectedProductType);

  return (
    <>
      <Navbar />
      <br />
      
      <div className="container mx-auto">
        <form onSubmit={handleSubmit} className='sellerForm'>
          <h1 className="text-3xl font-bold mb-4">Product decription Form</h1>
          {error && error.length?<>
        <h1 style={{color:"#e82617"}}>{error}</h1>
        </>:null}
          <div className="mb-4">
            <label htmlFor="name" className="block text-lg font-medium mb-2">
              Product Name:
            </label>
            <input
              type="text"
              id="name"
              className="px-4 py-2 border border-gray-300 rounded"
              value={productname}
              onChange={(e) => setProductname(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="productType" className="block mb-2 text-sm font-medium text-gray-900">
              Product Type
            </label>
            <select
              id="productType"
              className="sellerDrop block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
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
            <input
              type="file"
              id="files"
              multiple
              onChange={handleFileChange}
            />
            {selectedFiles && selectedFiles?.length > 0 && (
              <span className="ml-2">{selectedFiles.length} files selected</span>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="name" className="block text-lg font-medium mb-2">
              Product Price(in crypto):
            </label>
            <input
              type="text"
              id="name"
              className="px-4 py-2 border border-gray-300 rounded"
              value={price}
              placeholder='Price'
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Product decription
            </label>
            <textarea
              id="message"
              rows={4}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Please provide product decription"
              value={decription}
              onChange={(e) => setDecription(e.target.value)}
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
