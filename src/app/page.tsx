import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import '../styles/globals.css';
import Main from '@/pages/Main';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-[Inter] ">
      <Header/>
      
       <Main />
        <Footer/>
      </div>
  );
}