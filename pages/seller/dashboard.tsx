import React from 'react'
import { Navbar } from '../../components/Navbar'
import Footer from '../../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faGears, faUsers } from '@fortawesome/free-solid-svg-icons'

const dashboard = () => {
    return (
        <>
            <Navbar />
            <div className=" inset-y-0 left-0 w-64 bg-gray-900 text-white p-4 transform transition-all duration-300 sidebar">
                <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
                <ul className="space-y-2">
                    <li>
                        <a href="#" className="block hover:text-blue-500">
                        <FontAwesomeIcon icon={faCartShopping}/> Order</a>
                    </li>
                    <li>
                        <a href="#" className="block hover:text-blue-500">
                        <FontAwesomeIcon icon={faUsers}/> Customers</a>
                    </li>
                    <li>
                        <a href="#" className="block hover:text-blue-500">
                            
                        <FontAwesomeIcon icon={faGears}/> Setting</a>
                    </li>
                    {/* Add more items as needed */}
                </ul>
            </div>

            <div className="sidebardashboard">

                <Footer /> 
            </div>
        </>
    )
}

export default dashboard