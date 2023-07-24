import { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/global.css';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {

  return (
    <>
      <Component {...pageProps} />
      <ToastContainer />
    </>
  );
};

export default MyApp;