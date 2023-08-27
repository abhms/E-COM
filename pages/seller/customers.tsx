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
    <div className='mx-12 border border-gray-300 rounded-lg shadow-md p-8 mb-6'>
      {user.map((newUser) => (
        <div className="">
          <h2 className="text-2xl font-semibold mb-4">Customers</h2>
            <span className="font-semibold"> FirstName:</span>
          {/**@ts-ignore */}
          <span className="text-gray-600 mb-2"> {newUser.firstname}
              </span>
          {/**@ts-ignore */}
          <p className="600 mb-2"><span className="font-semibold">LastName:</span> {newUser.lastname}</p>
          <span className="font-semibold w-1/3">Email:</span>
          {/**@ts-ignore */}
           <span className="w-2/3">{newUser.email}</span>
        </div>
      ))}
    </div>
  )
}

export default Customers