import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { Navbar } from '../../components/Navbar';
import Footer from '../../components/Footer';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const SearchPage: FC = () => {
  const { users } = useSelector((state: any) => state.order);
  const router = useRouter();
  const { search } = router.query;
  const [searchedProduct, setSearchedProduct] = useState([]);
  const [token, setOriginalToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const tok = localStorage.getItem('token');
      setOriginalToken(tok);
    }
    const fetchSearchResults = async () => {
      try {
        if (search) {
          const response = await axios.post(`/api/${search}`);
           setSearchedProduct(response.data.products);
        }
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };
    fetchSearchResults();
  }, [search]);
  const addToCart = async (productId: number) => {
    const res = await axios.post(
      '/api/product/addCart',
      {productId},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    if(res.data.message!=="You are not login"){
      toast(res.data.message, { hideProgressBar: true, autoClose: 2000, type: 'success' })
    }
    if(res.data.message==="You are not login"){
    toast(res.data.message, { hideProgressBar: true, autoClose: 2000, type: 'error' })
    }
    console.log(productId, "added to cart");
  };
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Search Results:</h1>
        {searchedProduct.length===0 && <>
          <div role="status" className="flex items-center">
      <svg
        aria-hidden="true"
        className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
        </>}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {searchedProduct.map((product, index) => (
            <div key={index} className="bg-white rounded shadow p-4 flex">
              {/**@ts-ignore */}
              <img src={product.fileUrl} alt={product.productname} className="cartImg w-1/2 h-32 object-cover" style={{    "height": "325px"
}}
              />
              <div className="w-1/2 ml-4">
              {/**@ts-ignore */}

                <h2 className="text-lg font-semibold mb-2">{product.productname}</h2>
              {/**@ts-ignore */}
                <p className="text-gray-600 text-sm mb-2">${product.price}</p>
                  {/**@ts-ignore */}
                  <p className="text-gray-600 text-sm mb-2">${product.description}</p>
              {/**@ts-ignore */}
              {!users.seller && <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"  onClick={() => addToCart(product._id)} >
                  Add to Cart
                </button>}
                
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SearchPage;
