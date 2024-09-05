import React from 'react'
import { Stats } from './home'

export default function About() {
    return (
        <>
            <MainSection />
            <Stats />
        </>
    )
}

const MainSection = () => {
    return (
        <>
            <section className="text-gray-600 body-font">
                <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                    <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                        <h1 className="title-font text-6xl mb-4 font-bold text-white">Elevate Your Voice,<br /> Transform Your Presence.</h1>
                        <p className="mb-8 leading-relaxed text-gray-300 text-lg">At Orato, we are on a mission to revolutionise how professionals and students master the art of communication. Whether you're preparing for a big presentation, sharpening your virtual communication skills, or simply seeking to enhance your everyday interactions, Orato is your trusted partner in communication excellence.</p>
                    </div>
                    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 flex items-center">
                        <div className="w-1/3">
                            <img className='h-48 rounded-lg' src="https://images.pexels.com/photos/5990058/pexels-photo-5990058.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
                        </div>
                        <div className="w-1/3 flex-col items-center justify-between h-full">
                            <div className='py-2'><img className='h-48 rounded-lg' src="https://images.pexels.com/photos/5324858/pexels-photo-5324858.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" /></div>
                            <div className='py-2'><img className='h-48 rounded-lg' src="https://images.pexels.com/photos/8937594/pexels-photo-8937594.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" /></div>
                        </div>
                        <div className="w-1/3 flex-col items-center justify-between h-full">
                            <div className='py-10'><img className='h-48 rounded-lg' src="https://images.pexels.com/photos/8937612/pexels-photo-8937612.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" /></div>
                            <div className='py-10'><img className='h-48 rounded-lg' src="https://images.pexels.com/photos/5990058/pexels-photo-5990058.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" /></div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}