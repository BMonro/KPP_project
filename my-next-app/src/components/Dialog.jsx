
import Image from "next/image";

import pizza from "/public/pizza.svg";
import { useState, useRef, forwardRef } from "react";
import cross from "/public/cross.svg";
import smallLogo from "/public/smallLogo.svg";

const Dialog = forwardRef(({ isDialogOpen, setIsDialogOpen, handleAddItem }, ref) => {

    const [nameValue, setNameValue] = useState('');
    const [priceValue, setPriceValue] = useState('');
    const [timeValue, setTimeValue] = useState('');

    const handleClickAdd = () => {
        if (!nameValue || !priceValue || !timeValue) {
            return;
        }
        else {
            const item = {
                title: nameValue,
                time: timeValue,
                money: priceValue,
                img: pizza
            }
            handleAddItem(item)
            closeDialog()
        }

    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        if (ref.current) {
            ref.current.close();
        }
    };

    return (
        <dialog
            ref={ref}
            className={`relative flex flex-col items-center bg-[#FFF2EB] w-[40%] h-[75%] rounded-[10px] border-[2px] border-black p-3 ${isDialogOpen ? 'block' : 'hidden'}`}
        >
            <button className="absolute right-2 top-2" onClick={closeDialog}><Image src={cross} alt="img" /></button>
            <Image src={smallLogo} alt="img" />
            <p className="text-[35px] self-start px-2 mb-5" >Add pizza</p>
            <div className="flex flex-col w-full  px-7">
                <Item title="Name" handleInputValue={setNameValue} />
                <Item title="Cooking time" handleInputValue={setPriceValue} />
                <Item title="Price" handleInputValue={setTimeValue} />
            </div>
            <button onClick={handleClickAdd} className="bg-green py-2 px-5  mr-7 w-[30%] text-[30px] text-black rounded-[21px] hover:shadow-add-button duration-100 self-end">Add</button>
        </dialog>
    );
});

export default Dialog;

export function Item({ title, handleInputValue }) {
    return (
        <div className=" relative flex w-full items-center mb-5">
            <p className=" w-1/2 text-3xl">{title}</p>
            <input onChange={(e) => handleInputValue(e.target.value)} className="w-1/2 bg-[#F1DACE] border-[#708360] text-3xl px-5 h-[50px] border-[4px] rounded-[21px] p-2  appearance-none cursor-pointer">

            </input>

        </div>
    );
}
