import Image from "next/image";
import Link from "next/link";

export default function Header() {
    return (
        <header className="w-full h-20 bg-orange flex justify-between items-center px-6 text-4xl text-white">
            {/* Центрований текст */}
            <div className="flex-1 flex justify-center">
                <p>Pizza Simulator</p>
            </div>

            {/* Праворуч кнопки */}
            <div className="flex items-center gap-4">
                {/* Кнопка Пауза */}
                <button>
                    <Image 
                        src="/simulation/images/SymbolPause.png" 
                        alt="Pause Button" 
                        width={30} 
                        height={30} 
                        className="cursor-pointer"
                    />
                </button>

                {/* Кнопка Вихід */}
                <Link href="/">
                    <Image 
                        src="/simulation/images/SymbolLeave.png" 
                        alt="Exit Button" 
                        width={30} 
                        height={30} 
                        className="cursor-pointer"
                    />
                </Link>
            </div>
        </header>
    );
}
