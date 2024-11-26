import Image from "next/image";
import Header from "@/components/Header";
import logo from "/public/logo.svg";
import geer from "/public/geer.svg";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen relative bg-mainBg flex flex-col items-center">
      <Header />
      {/* Логотип з анімацією руху вгору і вниз */}
      <Image 
        className="mb-7 mt-7 animate-bounce-up-down" 
        src={logo} 
        alt="img" 
      />
      <Link 
        href={'/simulation'} 
        className="w-1/3 h-[114px] rounded-[21px] text-bText bg-green text-6xl flex items-center justify-center"
      >
        START
      </Link>
      <Link 
        href={`/settings`} 
        className="bg-green py-1 px-5 rounded-[21px] absolute top-[100px] right-5"
      >
        <Image src={geer} alt="img" />
      </Link>
    </div>
  );
}
