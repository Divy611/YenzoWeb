import React from 'react'
import Logo from '../assets/logo_no_title.png'

export default function LoadingScreen() {
    return (
        <section className='h-screen w-full bg-[#16151A] flex flex-row items-center justify-center'>
            <button className={`w-32 h-32 flex transition-transform duration-500 ease-in-out`} style={{ cursor: 'pointer', position: 'relative' }}>
                <img className="p-5 rounded-full object object-center" src={Logo} alt="" />
            </button>
            <h1 className='ml-3 text-white text-4xl w-1/2 text-center'>Yenzo</h1>
        </section>
    )
}
