"use client";

import Image from "next/image";
import Header from "@/components/Header";
import logo from "/public/logo.svg"
import house from "/public/house.svg"
import CustomButton from "@/components/CustomButton";
import General from "@/components/General";
import { useState, useEffect } from "react";
import Link from "next/link";
import Strategy from "@/components/Strategy";
import Menu from "@/components/Menu";
import pizza from "/public/pizza.svg";
import cola from "/public/cola.svg";
import soda from "/public/soda.svg";
import juice from "/public/juice.svg";

const initialPizzas = [
    {
        name: "Greek pizza",
        cookingTime: "20",
        price: "8",
        img: pizza
    },
    {
        name: "Neapolitan pizza",
        cookingTime: "25",
        price: "10",
        img: pizza
    },
    {
        name: "Greek pizza",
        cookingTime: "20",
        price: "8",
        img: pizza
    },

];

const initialDrinks = [
    {
        name: "Strawberry soda",
        cookingTime: null,
        price: "4",
        img: soda
    },
    {
        name: "Coca - cola",
        cookingTime: null,
        price: "2",
        img: cola
    },
    {
        name: "Orange juice",
        cookingTime: null,
        price: "3",
        img: juice
    },
   
];

export default function Settings() {
    const [selectedSection, setSelectedSection] = useState("GENERAL");
    const [currentPizzas, setCurrentPizzas] = useState(initialPizzas);
    const [currentDrinks, setCurrentDrinks] = useState(initialDrinks);
    const [currentType, setCurrentType] = useState("Pizzas");

    useEffect(() => {
        const savedPizzas = localStorage.getItem('Pizzas');
        const savedDrinks = localStorage.getItem('Drinks');
        
        if (savedPizzas) setCurrentPizzas(JSON.parse(savedPizzas));
        if (savedDrinks) setCurrentDrinks(JSON.parse(savedDrinks));
    }, []);

    useEffect(() => {
        console.log(JSON.stringify(currentPizzas))
        localStorage.setItem('Pizzas', JSON.stringify(currentPizzas));
    }, [currentPizzas]);

    useEffect(() => {
        localStorage.setItem('Drinks', JSON.stringify(currentDrinks));
    }, [currentDrinks]);


    function handleSection( section ) {
        setSelectedSection( currentSection => {
            return currentSection = section;
        })
    }
    function handleSelectMenu( type ) {
        setCurrentType( currentType => {
            return currentType = type;
        })

    }

    return (
        <div className="h-screen overflow-hidden">
        <Header />
        <div className="h-full relative bg-mainBg flex  ">
            <aside className="bg-bgGreen h-full w-[27%] flex flex-col items-center justify-start px-7 ">
            <Image className=" transform scale-[0.8] " src={logo} alt="img"/>
                <CustomButton handleSection={handleSection} selectedSection={selectedSection} text="GENERAL"></CustomButton>
                <CustomButton handleSection={handleSection} selectedSection={selectedSection} text="STRATEGY"></CustomButton>
                {selectedSection != "MENU" 
                ? <CustomButton handleSection={handleSection} selectedSection={selectedSection}  text="MENU"></CustomButton> 
                :   <div onClick={() => handleSection("MENU")} className= {`flex flex-col items-center  bg-green py-2 px-5 mb-2 w-[100%] text-[40px] text-bText rounded-[21px] hover:shadow-custom-inset transition-shadow duration-200 ${selectedSection == "MENU" ? "shadow-custom-inset" : null}`} >
                        <p>MENU</p>
                        <span className="  bg-[#617451] w-full h-[5px] mb-1"></span>
                        <button className="text-[25px] self-start pl-2 text-[#FFF2EB]" onClick={() => handleSelectMenu("Pizzas")}>-- Pizza</button>
                        <button className="text-[25px] self-start pl-2 text-[#FFF2EB]" onClick={() => handleSelectMenu("Drinks")}>-- Drinks</button>
                    </div>}

                
                <Link href={"/"} className=" bg-green py-2 px-5 mb-2 w-[100%] text-[40px] text-black rounded-[21px] flex justify-center hover:shadow-custom-inset transition-shadow duration-200">
                    <Image className=" mr-2" src={house} alt="img"></Image>
                    <p>HOME</p>
                </Link>
            </aside>
            <main className="w-full">
                {selectedSection == "GENERAL" ?  <General/> : <></>}
                {selectedSection == "STRATEGY" ?  <Strategy/> : <></>}
                {selectedSection == "MENU" ?  <Menu items={currentType === "Pizzas" ? currentPizzas : currentDrinks} setItems={currentType === "Pizzas" ? setCurrentPizzas : setCurrentDrinks} currentType={currentType}/> : <></>}
            </main>
        </div>
        </div> 
    );
}
