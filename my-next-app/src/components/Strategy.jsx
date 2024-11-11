import CustomButton from "./CustomButton";
import arrow from "/public/arrow.svg"
import Image from "next/image";
import strategy1Img from "/public/strategy1.svg"
import strategy2Img from "/public/strategy2.svg"
import strategy3Img from "/public/strategy3.svg"
import { GeneralItem } from "./General";
import { useState } from "react";

export default function Strategy() {
    const [currentStrategy, setCurrentStrategy] = useState('Strategy 1');  // за замовчуванням 1
    const items = [
        {
            title: "Strategy 1",
            text: "Constant number of customers during the day",
            img: strategy1Img,
        },
        {
            title: "Strategy 2",
            text: "A sharp increase in customers during rush hour",
            img: strategy2Img,
        },
        {
            title: "Strategy 3",
            text: "Steadily growing number of customers",
            img: strategy3Img,
        },
    ];

    const generalItem =
    {
        title: "Choose the strategy",
        options: ["Strategy 1", "Strategy 2", "Strategy 3"],
        value: currentStrategy,
        setValue: setCurrentStrategy
    };

    function handleSave() {
        console.log({
            currentStrategy,
        });

        localStorage.setItem('choosedStrategy', JSON.stringify(currentStrategy));
    }

    return (
        <section className="pb-8 pt-8 px-20 flex flex-col">
            <div className=" flex justify-between gap-10 mb-6">
                {items.map((item, index) => (
                    <Item key={index} title={item.title} text={item.text} img={item.img} />
                ))}
            </div>
            <GeneralItem title={generalItem.title} options={generalItem.options} value={generalItem.value} onChange={(e) => generalItem.setValue(e.target.value)} />

            <button onClick={handleSave} className=" absolute bottom-[12%] bg-green py-2 px-5 mb-2 w-[15%] text-[40px] text-bText rounded-[21px] hover:shadow-custom-inset transition-shadow duration-200  self-end ">Save</button>
        </section>
    );
}

function Item({ title, text, img }) {
    return (
        <div className=" w-1/3 relative flex flex-col text-center bg-[#F1DACE] items-center  border-[#708360] rounded-[21px] border-[4px]">
            <p className=" w-full p-3 text-4xl  text-black bg-[#708360] rounded-[10px] ">{title}</p>
            <p className=" p-3 text-[28px] leading-8  text-[#5E5E5E] mb-3 flex-grow">{text}</p>
            <Image className="mb-4 " src={img} alt="img" />
        </div>
    );
}
