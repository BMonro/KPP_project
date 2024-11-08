"use client";

import Image from "next/image";
import Header from "@/components/Header";
import CustomButton from "@/components/CustomButton";
import { useState } from "react";
import Link from "next/link";

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
            <div className="simulation">
                {/* Столик */}
                <div className="table1">
                <Image 
                        src="/simulation/images/Table1.png" 
                        alt="Table1"  // Додано alt текст для доступності
                        width={250}
                        height={300}
                    />
                </div>

                 {/* Столик 2 */}
                 <div className="table2">
                    <Image 
                        src="/simulation/images/Table2.png" 
                        alt="Table2"  // Додано alt текст для доступності
                        width={300}
                        height={300}
                    />
                </div>
            </div>
        </div>
    );
}
