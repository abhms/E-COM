import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import 'tailwindcss/tailwind.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faDolly, faList, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { setUsers } from '../redux/slices/order';
import { store } from "../redux/store";
import { useRouter } from 'next/router';
export const Navbar = () => {
  const [orginalToken, setOrginalToken] = useState<string | null>(null);
  const [seller, setseller] = useState(false)
  const router = useRouter();
  const localToken = localStorage.getItem('token');
  console.log(localToken, "token");
  useEffect(() => {
    const fetchData = async () => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        setOrginalToken(token);

        if (token) {
          try {
            const response = await axios.get('/api/user/get/getUser', {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            const users = response.data.user
            setseller(response.data.user.seller)
            store.dispatch(setUsers({ users }))
            console.log(users);
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        }
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/auth/signin');
  };
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <style jsx>{`
          ul {
            list-style-type: none;
            font-weight: bold;
            font-size: 20px;
          }
          a:Link {
            text-decoration: none;
          }
        `}</style>
        <Link href="/">
          <span className="text-xl font-bold cursor-pointer navbarLogo">SHOPNOW</span>
        </Link>
        <div className="flex items-center search_nav">
          {/* Search Box */}
          <input
            type="text"
            placeholder="Search"
            className="px-3 py-1 rounded-lg bg-gray-200 text-black focus:outline-none"
          />
          {/* Profile and Navigation Links */}
          <ul className="flex space-x-4 list-none ml-4">
            {orginalToken && orginalToken.length > 0 ? (
              <li>
                <Link href="/profile" className="text-white hover:text-gray-300" style={{ paddingLeft: 13, textDecoration: 'none' }}>
                  <FontAwesomeIcon icon={faUser} /> Profile
                </Link>
              </li>
            ) : (
              <li>
                <Link href="/auth/signin" className="text-white hover:text-gray-300" style={{ paddingLeft: 13, textDecoration: 'none' }}>
                  Signin
                </Link>
              </li>
            )}
            <li>
              <div>
                <p>
                  {!seller ? <a href="/profile/cart" className="text-white hover:text-gray-300" style={{ paddingLeft: 13, textDecoration: 'none' }}>
                    <FontAwesomeIcon icon={faCartShopping} /> Cart
                  </a> : <a href="/seller/dashboard" className="text-white hover:text-gray-300" style={{ paddingLeft: 13, textDecoration: 'none' }}>
                    <FontAwesomeIcon icon={faList} /> Dashboard
                  </a>}
                </p>
              </div>
            </li>
            <li>
              {!seller ? <Link href="/seller/sellerForm" className="text-white hover:text-gray-300" style={{ paddingLeft: 13, textDecoration: 'none' }}>
                Become a Seller
              </Link> : <a href="/seller" className="text-white hover:text-gray-300" style={{ paddingLeft: 13, textDecoration: 'none' }}>
                <FontAwesomeIcon icon={faDolly} /> Add product
              </a>
              }
            </li>
            {localToken && <li>
              <button onClick={handleLogout}>

                <FontAwesomeIcon icon={faSignOutAlt} />Logout
              </button>
            </li>}
          </ul>
        </div>
      </div>
    </nav>
  );
};
