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
          <span className="text-xl font-bold cursor-pointer">Logo</span>
        </Link>
        <ul className="flex space-x-4 list-none">
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
            <Link href="/about" className="text-white hover:text-gray-300" style={{ paddingLeft: 13, textDecoration: 'none' }}>
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-white hover:text-gray-300" style={{ paddingLeft: 13, textDecoration: 'none' }}>
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
