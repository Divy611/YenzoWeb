import Logo from "../assets/logo.png"
import React, { useState } from 'react'
import Logo1 from "../assets/logo1.png"
import { Link } from 'react-router-dom/cjs/react-router-dom'

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    return (
        <header className="relative p-7">
            <div className="mx-auto flex justify-between items-center">
                <Link to="/"><img className="w-auto h-10" src={Logo} alt="" /></Link>
                <div className="hidden md:flex items-center">
                    <Link to="/" className="px-2.5 py-2 text-lg text-gray-300 transition-colors duration-300 transform rounded-md hover:bg-gray-100 hover:text-black md:mx-2">Home</Link>
                    <Link to="/about" className="px-2.5 py-2 text-lg text-gray-300 transition-colors duration-300 transform rounded-md hover:bg-gray-100 hover:text-black md:mx-2">About</Link>
                    <Link to="/contact" className="px-2.5 py-2 text-lg text-gray-300 transition-colors duration-300 transform rounded-md hover:bg-gray-100 hover:text-black md:mx-2">Contact</Link>
                    <Link to="/pricing" className="px-2.5 py-2 text-lg text-gray-300 transition-colors duration-300 transform rounded-md hover:bg-gray-100 hover:text-black md:mx-2">Pricing</Link>
                </div>
                <div className="md:hidden">
                    <button type="button" className="text-gray-500 hover:text-white focus:outline-none focus:text-white" aria-label="toggle menu" onClick={toggleMenu}>
                        {isMenuOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" /></svg>
                        )}
                    </button>
                </div>
            </div>
            <div className={`md:hidden absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-black ${isMenuOpen ? 'translate-x-0 opacity-100' : 'opacity-0 -translate-x-full'}`}>
                <div className="flex flex-col px-2 -mx-4">
                    <Link to="/" className="px-2.5 py-2 text-lg text-gray-300 transition-colors duration-300 transform rounded-md hover:bg-gray-100 hover:text-black md:mx-2">Home</Link>
                    <Link to="/about" className="px-2.5 py-2 text-lg text-gray-300 transition-colors duration-300 transform rounded-md hover:bg-gray-100 hover:text-black md:mx-2">About</Link>
                    <Link to="/contact" className="px-2.5 py-2 text-lg text-gray-300 transition-colors duration-300 transform rounded-md hover:bg-gray-100 hover:text-black md:mx-2">Contact</Link>
                    <Link to="/pricing" className="px-2.5 py-2 text-lg text-gray-300 transition-colors duration-300 transform rounded-md hover:bg-gray-100 hover:text-black md:mx-2">Pricing</Link>
                </div>
            </div>
        </header>
    );
}


export function AltHeader() {
    const CustomLink = ({ child }) => {
        return (
            <button className="border border-green-500 px-3 py-1 rounded items-center justify-center text-center h-full mx-2 text-green-500">
                <Link to="/chat" className="transition-colors duration-300 transform">{child}</Link>
            </button>
        )
    }
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);
    return (
        <header className="px-6 py-8 mx-auto bg-[#0E0D12]">
            <div className="lg:flex lg:items-center">
                <div className="flex items-center justify-between">
                    <Link to="/"><img className="w-auto h-6 sm:h-7" src={Logo1} alt="" /></Link>
                    <div className="flex lg:hidden">
                        <button onClick={toggleMenu} type="button" className="text-gray-500 hover:text-white focus:outline-none focus:text-white" aria-label="toggle menu">
                            {!isOpen ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" /></svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                            )}
                        </button>
                    </div>
                </div>

                <div className={`${isOpen ? 'translate-x-0 opacity-100' : 'opacity-0 -translate-x-full'} absolute inset-x-0 z-20 flex-1 w-full px-6 py-4 transition-all duration-300 ease-in-out lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center lg:justify-between`} style={{ backgroundColor: "#0E0D12" }}>
                    <div className="flex flex-col text-white capitalize lg:flex lg:px-16 lg:-mx-4 lg:flex-row lg:items-center">
                        <Link to="#" className="mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-4">
                            <button className="flex items-center text-green-500 border border-green-600 p-2 rounded-lg text-xs"><i className="fa-solid fa-plus"></i><h1 className="ml-2">New Chat</h1></button>
                        </Link>
                        <Link to="#" className="mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-1">
                            <button className="h-8 w-8 rounded-full text-green-500 border border-green-600"><i className="fa-solid fa-clock-rotate-left"></i></button>
                        </Link>
                    </div>

                    <div className="flex justify-center mt-6 lg:flex lg:mt-0 lg:-mx-2">
                        <CustomLink child={<i className="fa-regular fa-bookmark"></i>} />
                        <CustomLink child={<i className="fa-solid fa-layer-group"></i>} />
                        <CustomLink child={<i className="fa-regular fa-share-from-square"></i>} />
                    </div>
                </div>
            </div>
        </header>
    )
}

export function AuthHeader() {
    return (
        <header className="px-6 py-8 mx-auto bg-[#16151A]">
            <div className="lg:flex lg:items-center">
                <div className="flex items-center justify-between">
                    <Link to="/"><img className="w-auto h-6 sm:h-7" src={Logo1} alt="" /></Link>
                </div>
            </div>
        </header>
    )
}
