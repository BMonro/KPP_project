
export default function CustomButton({ text, selectedSection, handleSection = null }) {
    return (
        <button onClick={() => handleSection(text)} className={`bg-green py-2 px-5 mb-2 w-[100%] text-[40px] text-bText rounded-[21px] hover:shadow-custom-inset transition-shadow duration-200 ${selectedSection == text ? "shadow-custom-inset" : null}`} >
            <p>{text}</p>
        </button>
    );
}
