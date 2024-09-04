import React from 'react'
import Logo from "../assets/logo.png"
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
export default function Header() {
    return (
        <>
            <nav class="relative p-3">
                <div class="container px-6 py-3 mx-auto md:flex">
                    <div class="flex items-center justify-between">
                        <Link to="/"><img class="w-auto h-6 sm:h-7" src={Logo} alt="" /></Link>
                        <div class="flex lg:hidden">
                            <button type="button" class="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600" aria-label="toggle menu">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 8h16M4 16h16" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out md:mt-0 md:p-0 md:top-0 md:relative md:opacity-100 md:translate-x-0 md:flex md:items-center md:justify-between">
                        <div class="flex flex-col px-2 -mx-4 md:flex-row md:mx-10 md:py-0">
                            <Link to="/" class="px-2.5 py-2 text-gray-300 transition-colors duration-300 transform rounded-md hover:bg-gray-100 hover:text-black md:mx-2">Home</Link>
                            <Link to="/" class="px-2.5 py-2 text-gray-300 transition-colors duration-300 transform rounded-md hover:bg-gray-100 hover:text-black md:mx-2">About</Link>
                            <Link to="/" class="px-2.5 py-2 text-gray-300 transition-colors duration-300 transform rounded-md hover:bg-gray-100 hover:text-black md:mx-2">Contact</Link>
                        </div>
                        <div class="relative mt-4 md:mt-0">
                            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg class="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                                    <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                </svg>
                            </span>
                            <input type="text" class="w-full py-2 pl-10 pr-4 text-gray-700 bg-transparent border rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300" placeholder="Search" />
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}
