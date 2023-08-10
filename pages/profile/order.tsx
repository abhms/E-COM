import React, { useEffect, useState } from 'react'
import 'tailwindcss/tailwind.css';
import { Navbar } from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
const order = () => {
    const data = useSelector((state: any) => state.order.allData);
    const [formData, setFormData] = useState({
        mobileNo: '',
        address: '',
        name: '',
        pincode: '',
        city: '',
        state: ''
    });
    const [token, setOriginalToken] = useState<string | null>(null);
    const router = useRouter();
    console.log(data,"formData");
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const tok = localStorage.getItem('token');
            console.log(tok, "tok");
            setOriginalToken(tok);
        }
    }, []);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const aa = await axios.post("/api/product/buy", { formData }, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        console.log("object", aa);
    }
    return (
        <div>
            <Navbar />

            <h1>Personal information</h1>
            <form
                onSubmit={handleSubmit}
                className="max-w-lg mx-auto p-4 bg-gray-100 rounded-lg">
                <div className="mb-4">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="border rounded-lg p-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="mobileNo">Mobile No</label>
                    <input
                        type="number"
                        id="mobileNo"
                        name="mobileNo"
                        value={formData.mobileNo}
                        maxLength={10}
                        onChange={handleChange}
                        className="border rounded-lg p-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="address">Address</label>
                    <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        //@ts-ignore
                        onChange={handleChange}
                        className="border rounded-lg p-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="name">Pincode</label>
                    <input
                        type="number"
                        id="name"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        maxLength={6}
                        className="border rounded-lg p-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="name">city</label>
                    <input
                        type="text"
                        id="name"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="border rounded-lg p-2 w-full"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="name">State</label>
                    <input
                        type="text"
                        id="name"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        maxLength={10}
                        className="border rounded-lg p-2 w-full"
                    />
                </div>


                <div>
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                        Buy
                    </button>
                </div>
            </form>
            <div style={{ minHeight: "calc(100vh - 60px)", display: "flex", flexDirection: "column" }}>
                <div className="cartfooter" style={{ marginTop: "auto" }}>
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default order