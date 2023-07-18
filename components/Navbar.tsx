import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import 'tailwindcss/tailwind.css';

export const Navbar = () => {
  const [orginalToken, setOrginalToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      setOrginalToken(token);
    }
  }, []);

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
                  Profile
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
              <Link href="/cart" className="text-white hover:text-gray-300" style={{ paddingLeft: 13, textDecoration: 'none' }}>
                Cart
              </Link>
            </li>
            <li>
              <Link href="/seller" className="text-white hover:text-gray-300" style={{ paddingLeft: 13, textDecoration: 'none' }}>
                Become a Seller
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
