import { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/global.css';
import { CssBaseline } from '@mui/material';
const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {

  return (
    <>
    <CssBaseline />
      <Component {...pageProps} />
      <ToastContainer />
    </>
  );
};

export default MyApp;