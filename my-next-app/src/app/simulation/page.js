// pages/Simulation.js
"use client";

import Header from "@/components/SimulationHeader";
import BackGround from "@/components/SimulationBackground";
import { useState } from "react";
import { sendDataToBackend } from "@/utils/sentData";

export default function Simulation() {

    // Отримуємо всі дані з localStorage
    const data = {}; 
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i); 
        const value = localStorage.getItem(key);
        data[key] = value; 
        console.log(`${key}: ${value}`); 
    }
    sendDataToBackend(data);



    const [isRunning, setIsRunning] = useState(false);

    function handleStart() {
        setIsRunning(true);
    }

    function handleStop() {
        setIsRunning(false);
    }

   

    return (
        <div className="h-screen overflow-hidden">
            <Header />
            <BackGround />
        </div>
    );
}
