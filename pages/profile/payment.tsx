import React from 'react'
import { Navbar } from '../../components/Navbar'
import Footer from '../../components/Footer'
import { useSelector } from "react-redux";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaHeart, FaGooglePay,FaHome, FaSearch } from 'react-icons/fa';
import { faCreditCard, faIndianRupeeSign, faBuildingColumns } from '@fortawesome/free-solid-svg-icons';
import Cart from '../paymentMethod/card';
import Upi from "../paymentMethod/upi"
import NetBanking from '../paymentMethod/netBanking';
import Cash from '../paymentMethod/cash';
const payment = () => {
    // const { allData, address } = useSelector((state: any) => state.order);
    // console.log(allData, address, "allData,address")
    const [value, setValue] = React.useState("one");
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
      setValue(newValue);
    };
  
    const renderComponent = (value:string) => {
      switch (value) {
        case "one":
          return <Cash />;
        case 'two':
          //@ts-ignore
          return <Cart />;
        case 'three':
          return <Upi />;
        case 'four':
            return <NetBanking />;
        default:
          return null;
      }
    };
    return (
        <div>
            <Navbar />
            <div>
                <h1 className="text-2xl font-bold mb-6">Select a payment method</h1>
                <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}>
                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                          value={value}
                          onChange={handleChange}
                        aria-label="Vertical tabs example"
                        sx={{ borderRight: 1, borderColor: 'divider', flexShrink: 0, width: 200 }}
                    >
                        <Tab value="one" label="Cash on delivery" icon={<FontAwesomeIcon icon={faIndianRupeeSign} />} sx={{ minHeight: 64 }} />
                        <Tab value="two" label="Credit/Debit Card" icon={<FontAwesomeIcon icon={faCreditCard} />} sx={{ minHeight: 64 }} />
                        <Tab value="three" label="UPI" icon={<FaGooglePay size={40} />} />
                        <Tab value="four" label="Net Banking" icon={<FontAwesomeIcon icon={faBuildingColumns} />} sx={{ minHeight: 64 }} />
                    </Tabs>
                    {renderComponent(value)}
                </Box>
            </div>


           <div className ="mt-2" style={{ minHeight: "calc(100vh - 60px)", display: "flex", flexDirection: "column" }}>
                <div className="cartfooter" style={{ marginTop: "auto" }}>
                    <Footer />
                </div>
            </div> 
              
        </div>
    )
}

export default payment