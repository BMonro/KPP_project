
export default function CustomButton({ text, handleSection = null }) {
    return (
        <button onClick={() => handleSection(text)} className=" bg-green py-2 px-5 mb-2 w-[100%] text-[40px] text-bText rounded-[21px] hover:shadow-custom-inset transition-shadow duration-200 ">
            <p>{text}</p>
        </button>
    );
}
