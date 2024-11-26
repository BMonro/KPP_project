
import Image from "next/image";
import soda from "/public/soda.svg";
import pizza from "/public/pizza.svg";
import { useState, useRef, forwardRef } from "react";
import cross from "/public/cross.svg";
import smallLogo from "/public/smallLogo.svg";

const Dialog = forwardRef(({ isDialogOpen, setIsDialogOpen, handleAddItem, currentType }, ref) => {

    const [nameValue, setNameValue] = useState('');
    const [priceValue, setPriceValue] = useState('');
    const [timeValue, setTimeValue] = useState('');

    const handleClickAdd = () => {
        let img;

        // Обрізаємо всі значення до 20 символів
        const trimmedNameValue = nameValue?.trim().slice(0, 15);
        const trimmedPriceValue = priceValue?.trim().slice(0, 15);
        const trimmedTimeValue = timeValue?.trim().slice(0, 15);

        // Перевірка довжини полів
        if (
            (nameValue && nameValue.trim().length > 15) ||
            (priceValue && priceValue.trim().length > 15) ||
            (timeValue && timeValue.trim().length > 15)
        ) {
            alert("Кожне поле має містити не більше 15 символів!");
            return;
        }

        // Валідація cookingTime (лише цифри)
        const isCookingTimeValid = /^[0-9]+$/.test(trimmedTimeValue);

        // Валідація ціни (лише цифри)
        const isPriceValid = /^[0-9]+$/.test(trimmedPriceValue);

        if (currentType === "Pizzas") {
            img = pizza;

            // Перевірка заповнення всіх полів для "Pizzas" та валідності даних
            if (!trimmedNameValue || !trimmedPriceValue || !trimmedTimeValue) {
                alert("Усі поля мають бути заповнені!");
                return;
            }

            if (!isCookingTimeValid) {
                alert("Час приготування має містити лише цифри!");
                return;
            }

            if (!isPriceValid) {
                alert("Ціна має містити лише цифри!");
                return;
            }
        } else {
            img = soda;

            // Перевірка заповнення полів для "Sodas" та валідності даних
            if (!trimmedNameValue || !trimmedPriceValue) {
                alert("Усі поля мають бути заповнені!");
                return;
            }

            if (!isPriceValid) {
                alert("Ціна має містити лише цифри!");
                return;
            }
        }

        // Створюємо новий елемент
        const item = {
            name: trimmedNameValue,
            cookingTime: trimmedTimeValue, // Залишаємо значення рядком
            price: trimmedPriceValue,      // Залишаємо значення рядком
            img: img
        };

        handleAddItem(item);
        closeDialog();
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
            <p className="text-[35px] self-start px-2 mb-5" >Add {currentType == "Pizzas" ? "pizza" : "drink"}</p>
            <div className="flex flex-col w-full  px-7">
                <Item title="Name" handleInputValue={setNameValue} />
                {currentType == "Pizzas" ? <Item title="Cooking time" handleInputValue={setTimeValue} /> : null}

                <Item title="Price" handleInputValue={setPriceValue} />
            </div>
            <button onClick={handleClickAdd} className="bg-green py-2 px-5  mr-7 w-[30%] text-[30px] text-black rounded-[21px] hover:shadow-add-button duration-100 self-end">Add</button>
        </dialog>
    );
});
Dialog.displayName = "Dialog";
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
