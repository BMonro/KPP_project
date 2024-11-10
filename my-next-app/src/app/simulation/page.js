// pages/Simulation.js
"use client";

import Header from "@/components/SimulationHeader";
import BackGround from "@/components/SimulationBackground";
import { useState } from "react";

export default function Simulation() {
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
