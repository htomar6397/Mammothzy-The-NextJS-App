import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import '../styles/globals.css';
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-[Inter]">
      <Header/>
      
      <main className="flex flex-col gap-8 row-start-2 items-center justify-center flex-grow">
       
        <h1 className="text-4xl font-bold text-center text-red-500">Coming Soon...</h1>   

        </main>
        <Footer/>
      </div>
  );
}