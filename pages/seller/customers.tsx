import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'

const Customers = () => {
  const { users } = useSelector((state: any) => state.order)
  const [user, setUser] = useState([])
  console.log(users._id, "iojkshjfk");
  const _id = users._id
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('/api/seller/customer', { _id });
        console.log(response.data.users, "response");
        setUser(response.data.users)
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
    fetchData();
  }, [])

  return (
    <div className='mx-12'>
      {user.map((newUser) => (
        <div className="bg-white rounded-lg shadow-md p-6 w-full md:w-1/2 lg:w-1/3">
          <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
          {/**@ts-ignore */}
          <p className="text-gray-600 mb-2"><span className="font-semibold">FirstName:</span> {newUser.firstname}</p>
          {/**@ts-ignore */}
          <p className="text-gray-600 mb-2"><span className="font-semibold">LastName:</span> {newUser.lastname}</p>
          {/**@ts-ignore */}
          <p className="text-gray-600 mb-2"><span className="font-semibold">Email:</span> {newUser.email}</p>
        </div>
      ))}
    </div>
  )
}

export default Customers