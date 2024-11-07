"use client";

import Image from "next/image";
import Header from "@/components/Header";
import logo from "/public/logo.svg"
import house from "/public/house.svg"
import CustomButton from "@/components/CustomButton";
import General from "@/components/General";
import { useState } from "react";
import Link from "next/link";
import Strategy from "@/components/Strategy";
import Menu from "@/components/Menu";
export default function Settings() {
    const [selectedSection, setSelectedSection] = useState("GENERAL");

    function handleSection( section ) {
        setSelectedSection( currentSection => {
            return currentSection = section;
        })
    }

    return (
        <div className="h-screen overflow-hidden">
        <Header />
        <div className="h-full relative bg-mainBg flex  ">
            <aside className="bg-bgGreen h-full w-[27%] flex flex-col items-center justify-start px-7 ">
                {selectedSection != "MENU" ? <Image className=" transform scale-[0.8] " src={logo} alt="img"/> : <div className="py-6"></div>}
                <CustomButton handleSection={handleSection} text="GENERAL"></CustomButton>
                <CustomButton handleSection={handleSection}  text="STRATEGY"></CustomButton>
                <CustomButton handleSection={handleSection}  text="MENU"></CustomButton>
                <Link href={"/"} className=" bg-green py-2 px-5 mb-2 w-[100%] text-[40px] text-black rounded-[21px] flex justify-center hover:shadow-custom-inset transition-shadow duration-200">
                    <Image className=" mr-2" src={house} alt="img"></Image>
                    <p>HOME</p>
                </Link>
            </aside>
            <main className="w-full">
                {selectedSection == "GENERAL" ?  <General/> : <></>}
                {selectedSection == "STRATEGY" ?  <Strategy/> : <></>}
                {selectedSection == "MENU" ?  <Menu/> : <></>}
            </main>
        </div>
        </div> 
    );
}
