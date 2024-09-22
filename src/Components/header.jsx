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

export function AuthHeader() {
    return (
        <header className="px-6 py-8 mx-auto bg-[#16151A]">
            <div className="lg:flex lg:items-center">
                <div className="flex items-center justify-between">
                    <a href="/"><img className="w-auto h-6 sm:h-7" src={Logo1} alt="" /></a>
                </div>
            </div>
        </header>
    )
}
