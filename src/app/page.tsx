import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "../styles/globals.css";
import Main from "@/components/layout/Main";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen  ">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
