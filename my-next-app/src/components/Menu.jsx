import CustomButton from "./CustomButton";
import arrow from "/public/arrow.svg"
import Image from "next/image";
import deleteImg from "/public/delete.svg";
import pizza from "/public/pizza.svg";
import { useState, useRef } from "react";
import cross from "/public/cross.svg";
import smallLogo from "/public/smallLogo.svg";
import Dialog from "./Dialog";

const initialItems = [
    {
        title: "Greek pizza",
        time: "20 minutes",
        money: "8 USD",
        img: pizza
    },
    {
        title: "Neapolitan pizza",
        time: "25 minutes",
        money: "10 USD",
        img: pizza
    },
    {
        title: "Greek pizza",
        time: "20 minutes",
        money: "8 USD",
        img: pizza
    },
    {
        title: "Greek pizza",
        time: "20 minutes",
        money: "8 USD",
        img: pizza
    },
    {
        title: "Greek pizza",
        time: "20 minutes",
        money: "8 USD",
        img: pizza
    },
];

export default function Menu() {
    const [items, setItems] = useState(initialItems);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const dialogRef = useRef(null);

    const openDialog = () => {
        setIsDialogOpen(true);
        if (dialogRef.current) {
            dialogRef.current.showModal();
        }
    };

    function handleAddItem(item) {
        setItems(currentItems => {
            return [...currentItems, item]
        });
    }

    function handleDeleteItem(index) {
        setItems(currentItems => {
            return currentItems.filter((_, i) => i !== index);
        });
    }

    return (
        <>
            <Dialog ref={dialogRef} isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} handleAddItem={handleAddItem} />

            <section className="pb-8 h-full pt-12 px-20 flex flex-col">
                <div className="h-[60%] overflow-y-scroll mb-4 custom-scrollbar pr-4">
                    {items.map((item, index) => (
                        <Item key={index} index={index} handleDeleteItem={handleDeleteItem} {...item} />
                    ))}
                </div>
                <button onClick={openDialog} className="bg-green py-2 px-5 mb-6 w-[30%] text-[40px] text-black rounded-[21px] hover:shadow-add-button self-end">Add Pizza</button>
                <button className="bg-green py-2 px-5 mb-2 w-[20%] text-[40px] text-bText rounded-[21px] hover:shadow-custom-inset transition-shadow duration-200 self-end">Save</button>
            </section>
        </>
    );
}

export function Item({ title, time, money, img, index, handleDeleteItem }) {
    return (
        <div className="bg-[#F1DACE] relative h-[150px] flex w-full items-center mb-9 border-[#708360] border-[4px] rounded-[21px]">
            <Image className="ml-4" src={img} alt="img" />
            <div className="flex justify-between items-center flex-grow px-4 w-full">
                <p className="w-1/3 text-4xl mr-5">{title}</p>
                <p className="w-1/3 text-4xl mr-5">{time}</p>
                <p className="w-1/3 text-4xl ">{money}</p>
            </div>

            <button onClick={() => handleDeleteItem(index)} className="rounded-[10px] flex items-center justify-center h-full pl-3 pr-2 bg-[#708360]">
                <Image src={deleteImg} alt="img" />
            </button>
        </div>
    );
}
