import { AppProps } from 'next/app';
import "../styles/global.css"
const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  // Add any global context providers or other configurations here

  return <Component {...pageProps} />;
};

export default MyApp;
