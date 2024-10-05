// pages/_app.js
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AIChatbot from '../components/AIChatbot';

function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {page}
      </main>
      <Footer />
    </div>
  ));

  return (
    <SessionProvider session={pageProps.session}>
      {getLayout(<Component {...pageProps} />)}
      <AIChatbot />
    </SessionProvider>
  );
}

export default MyApp;
