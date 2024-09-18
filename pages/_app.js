import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AIChatbot from '../components/AIChatbot';

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
      <AIChatbot />
    </SessionProvider>
  );
}

export default MyApp;
