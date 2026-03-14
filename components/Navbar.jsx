import Link from "next/link";
import NavbarClient from "./NavbarClient";

export default function Navbar() {
    return (
        // <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700">
        //     <Link href="/">
        //         {/*<Image*/}
        //         {/*    className="cursor-pointer w-28 md:w-32"*/}
        //         {/*    src={assets.logo}*/}
        //         {/*    alt="logo"*/}
        //         {/*/>*/}
        //         <h3 className="text-2xl md:text-2xl text-gray-500 text-orange-600"> <span
        //             className="font-semibold text-orange-600">Dilawar Traders</span></h3>
        //     </Link>
            <NavbarClient />
        // {/* </nav> */}
    );
}
