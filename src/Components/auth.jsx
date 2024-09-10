import React from 'react'
import NoTextLogo from "../assets/logo_no_title.png"
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

export default function Login() {
    return (<AuthFields title={"LOGIN"} />)
}

export function Signup() {
    return (<AuthFields title={"SIGNUP"} />)
}

const AuthFields = ({ title }) => {
    return (
        <div className="py-10 2xl:py-56 flex flex-col items-center text-center bg-[#16151A]">
            <img src={NoTextLogo} className='h-20 w-20' alt="" />
            <div className="flex-col py-2"><h1 className='text-white text-3xl font-semibold'>{title}</h1><h2 className='text-gray-500'>Welcome Back!</h2></div>
            <div className='w-1/3 px-3 py-5'>
                <div className="border border-green-500 rounded-lg">
                    <input type="email" className='w-full bg-transparent p-4 rounded-lg text-lg text-white' />
                </div>
            </div>
            <div className='w-1/3 px-3'>
                <div className="border border-green-500 rounded-lg">
                    <input type="password" className='w-full bg-transparent p-4 rounded-lg text-lg text-white' />
                </div>
            </div>
            <div className='w-1/3 px-3 py-5'>
                <button className='bg-green-500 rounded-lg w-full py-4 text-white font-semibold'>{title}</button>
            </div>
            <div className='w-1/3 px-3'>
                <button className='bg-[#1B1A1D] text-center rounded-lg w-full py-4 px-5 text-gray-300 flex items-center'><img src='https://w7.pngwing.com/pngs/326/85/png-transparent-google-logo-google-text-trademark-logo-thumbnail.png' alt='' className='h-8 w-8' />&nbsp;&nbsp;&nbsp;Continue with Google</button>
            </div>
            <div className='w-1/3 py-7'><div className="w-full h-0.5 rounded-full bg-green-500"></div></div>
            <h1 className='text-white'>Don't have an account? <Link to="" className='text-green-500'>Sign Up Today!</Link></h1>
        </div>
    )
}
