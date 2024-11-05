import Image from "next/image";
import Header from "@/components/Header";
import logo from "/public/logo.svg"
import geer from "/public/geer.svg"
import Link from "next/link";
export default function Home() {
  return (
    <div className=" min-h-screen relative bg-mainBg flex flex-col items-center">
      <Header/>
      <Image className="mb-7 mt-7" src={logo}/>
      <button className=" w-1/3 h-[114px] rounded-[21px] text-bText bg-green text-6xl">START</button>
      <Link href={`/settings`} className=" bg-green py-1 px-5 rounded-[21px] absolute top-[100px] right-5"><Image src={geer}/></Link>
    </div>
  );
}
