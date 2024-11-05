import CustomButton from "./CustomButton";
import arrow from "/public/arrow.svg"
import Image from "next/image";

export default function General() {
    const items = [
        {
            title: "Number of cooks",
            options: [1, 2, 3, 4, 5]
        },
        {
            title: "Number of cash registers",
            options: [1, 2, 3]
        },
        {
            title: "Kitchen mode",
            options: ["1 cook - 1 option", "1 cook - 1 pizza"]
        },
    ];

    return (
        <section className="pb-8 pt-16 px-20 flex flex-col">
            {items.map((item, index) => (
                <Item key={index} title={item.title} options={item.options} />
            ))}
            <button className=" absolute bottom-[20%] bg-green py-2 px-5 mb-2 w-[15%] text-[40px] text-bText rounded-[21px] hover:shadow-custom-inset transition-shadow duration-200  self-end ">Save</button>
        </section>
    );
}

function Item({ title, options }) {
    return (
        <div className=" relative flex w-full items-center mb-9">
            <p className=" w-1/2 text-4xl">{title}</p>
            <select className="w-1/2 bg-[#F1DACE] border-[#708360] text-4xl px-5 h-[70px] border-[4px] rounded-[21px] p-2  appearance-none cursor-pointer">
                {options.map((option, index) => (
                    <option key={index} className=" hover:bg-black " value={`option${index}`}>
                        {option}
                    </option>
                ))}
            </select>
            <span className=" right-0 absolute flex h-[90%] w-14 bg-[#708360] rounded-[21px] justify-center pointer-events-none cursor-pointer" ><Image src={arrow}></Image></span>
        </div>
    );
}
