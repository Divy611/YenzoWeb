import React from 'react'
import Logo from "../assets/logo.png"
import { Link } from 'react-router-dom/cjs/react-router-dom'

export default function Footer() {
    return (
        <footer className='justify-between'>
            <div className="container px-5 py-12 mx-auto text-lg flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
                <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-end">
                    <Link to="/" className="flex title-font font-medium items-center md:justify-start justify-center"><img src={Logo} className='w-1/2' alt="" /></Link>
                </div>
                <div className="flex-grow flex flex-wrap md:pl-20 -mb-16 md:mt-0 mt-12 md:text-end text-center">
                    <div className="lg:w-1/4 md:w-1/2 w-full px-4"></div>
                    <div className="lg:w-1/4 md:w-1/2 w-full px-4"></div>
                    <NavSection header={"Company"} title1={"About"} link1={"/about"} title2={"Our Team"} link2={"/team"} title3={"Contact Us"} link3={"/contact"} />
                    <NavSection header={"Product"} title1={"Pricing"} link1={"/pricing"} title2={"Privacy Policy"} link2={"/privacy"} title3={"Terms of Service"} link3={"/terms"} />
                </div>
            </div>
            <div className="w-full">
                <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col justify-between">
                    <p className="text-sm text-gray-300 sm:py-2 sm:mt-0 mt-4">Copyright © 2024 Orato</p>
                    <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
                        <Link to="" className="text-gray-500 hover:text-white">
                            <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                            </svg>
                        </Link>
                        <Link to="" className="ml-3 text-gray-500 hover:text-white">
                            <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                            </svg>
                        </Link>
                        <Link to="" className="ml-3 text-gray-500 hover:text-white">
                            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                            </svg>
                        </Link>
                        <Link to="" className="ml-3 text-gray-500 hover:text-white">
                            <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="0" className="w-5 h-5" viewBox="0 0 24 24">
                                <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                                <circle cx="4" cy="4" r="2" stroke="none"></circle>
                            </svg>
                        </Link>
                    </span>
                </div>
            </div>
        </footer>
    )
}

const NavSection = ({ header, title1, link1, title2, link2, title3, link3 }) => {
    return (
        <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-white tracking-widest text-xl mb-3">{header}</h2>
            <nav className="list-none mb-12">
                <li><Link to={link1} className="py-3 text-gray-300 hover:text-gray-500">{title1}</Link></li>
                <li><Link to={link2} className="py-3 text-gray-300 hover:text-gray-500">{title2}</Link></li>
                <li><Link to={link3} className="py-3 text-gray-300 hover:text-gray-500">{title3}</Link></li>
            </nav>
        </div>
    )
}
