import { useState } from "react";
import CustomButton from "./CustomButton";
import arrow from "/public/arrow.svg"
import Image from "next/image";
import { useEffect } from "react";
export default function General() {
    const [currentCooks, setCurrentCooks] = useState(1);  // за замовчуванням 1
    const [currentRegisters, setCurrentRegisters] = useState(1);  // за замовчуванням 1
    const [currentMode, setCurrentMode] = useState("1 cook - 1 option");  // за замовчуванням перший режим

    useEffect(() => {
        const savedStrategy = localStorage.getItem('choosedCooks');
        const choosedCashRegisters = localStorage.getItem('choosedCashRegisters');
        const choosedKitchenMode = localStorage.getItem('choosedKitchenMode');



        if (savedStrategy) setCurrentCooks(JSON.parse(savedStrategy));
        if (choosedCashRegisters) setCurrentRegisters(JSON.parse(choosedCashRegisters));
        if (choosedKitchenMode) setCurrentMode(JSON.parse(choosedKitchenMode));
    }, []);


    const items = [
        {
            title: "Number of cooks",
            options: [1, 2, 3, 4, 5],
            value: currentCooks,
            setValue: setCurrentCooks
        },
        {
            title: "Number of cash registers",
            options: [1, 2, 3],
            value: currentRegisters,
            setValue: setCurrentRegisters
        },
        {
            title: "Kitchen mode",
            options: ["1 cook - 1 option", "1 cook - 1 pizza"],
            value: currentMode,
            setValue: setCurrentMode
        },
    ];

    function handleSave() {
        console.log({
            currentCooks,
            currentRegisters,
            currentMode
        });

        localStorage.setItem('choosedCooks', JSON.stringify(currentCooks));
        localStorage.setItem('choosedCashRegisters', JSON.stringify(currentRegisters));
        localStorage.setItem('choosedKitchenMode', JSON.stringify(currentMode));
        alert('You have successfully saved your data!');
    }

    return (
        <section className="pb-8 pt-16 px-20 flex flex-col">
            {items.map((item, index) => (
                <GeneralItem
                    key={index}
                    title={item.title}
                    options={item.options}
                    value={item.value}
                    onChange={(e) => item.setValue(e.target.value)}  // Обробник зміни значення
                />
            ))}
            <button
                className="absolute bottom-[20%] bg-green py-2 px-5 mb-2 w-[15%] text-[40px] text-bText rounded-[21px] hover:shadow-custom-inset transition-shadow duration-200 self-end"
                onClick={handleSave} // Виклик функції для збереження
            >
                Save
            </button>
        </section>
    );
}

export function GeneralItem({ title, options, value, onChange }) {
    return (
        <div className="relative flex w-full items-center mb-9">
            <p className="w-1/2 text-4xl">{title}</p>
            <select
                value={value} // Значення вибору
                onChange={onChange} // Обробник зміни
                className="w-1/2 bg-[#F1DACE] border-[#708360] text-4xl px-5 h-[70px] border-[4px] rounded-[21px] p-2 appearance-none cursor-pointer"
            >
                {options.map((option, index) => (
                    <option key={index} value={option}> {/* Значення передаємо без `option{index}` */}
                        {option}
                    </option>
                ))}
            </select>
            <span className="right-0 absolute flex h-[90%] w-14 bg-[#708360] rounded-[21px] justify-center pointer-events-none cursor-pointer">
                <Image src={arrow} alt="img" />
            </span>
        </div>
    );
}
