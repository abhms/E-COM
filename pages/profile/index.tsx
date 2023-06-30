import axios from 'axios';
import React, { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import { Navbar } from '../../components/Navbar';

interface User {
  firstname: string;
  lastname: string;
  email: string;
}

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          console.log('Token not found');
          return;
        }

        const response = await axios.get('/api/user/get/getUser', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(response.data.user);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-6">
        <h1 className="text-2xl font-semibold mb-4">My Profile</h1>
        <div className="mb-4">
          <label className="text-gray-700 font-bold">First Name: {user?.firstname}</label>
          <div className="mt-1"></div>
        </div>
        <div className="mb-4">
          <label className="text-gray-700 font-bold">Last Name: {user?.lastname}</label>
          <div className="mt-1"></div>
        </div>
        <div className="mb-4">
          <label className="text-gray-700 font-bold">Email: {user?.email}</label>
          <div className="mt-1"></div>
        </div>
      </div>
    </>
  );
};

export default Profile;
