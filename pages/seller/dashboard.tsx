import React from 'react';
import { Navbar } from '../../components/Navbar';
import Footer from '../../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxesStacked, faCartShopping, faGears, faHouse, faUsers } from '@fortawesome/free-solid-svg-icons';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'
import Home from './home';
import Order from './order';
import Customers from './customers';
import Products from "./products"
import Setting from './setting';
const dashboard = () => {
  const [value, setValue] = React.useState("one");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const renderComponent = (value:string) => {
    switch (value) {
      case "one":
        return <Home />;
      case 'two':
        return <Order />;
      case 'three':
        return <Customers />;
      case 'four':
        return <Products />;
        case 'five':
        return <Setting />;
      default:
        return null;
    }
  };
  return (
    <>
      <Navbar />
      <div className="sidebar">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: 'divider', flexShrink: 0, width: 200 }}
        >
          <Tab value="one" label="Home" icon={<FontAwesomeIcon icon={faHouse} />} sx={{ minHeight: 64 }} />
          <Tab value="two" label="Order" icon={<FontAwesomeIcon icon={faCartShopping} />} sx={{ minHeight: 64 }} />
          <Tab value="three" label="Customers" icon={<FontAwesomeIcon icon={faUsers} />} sx={{ minHeight: 64 }} />
          <Tab value="four" label="Product" icon={<FontAwesomeIcon icon={faBoxesStacked} />} sx={{ minHeight: 64 }} />
          <Tab value="five" label="Setting" icon={<FontAwesomeIcon icon={faGears} />} sx={{ minHeight: 64 }} />
        </Tabs>
        {renderComponent(value)}
      </Box>
      </div>

      <div className="sidebardashboard">
        <Footer />
      </div>
    </>
  );
};
export default dashboard;
