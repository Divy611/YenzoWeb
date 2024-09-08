import React from 'react'

export default function Contact() {
    return (
        <div className='h-[85vh] w-full flex'>
            <img className='w-1/3 h-full' src="https://images.pexels.com/photos/7682130/pexels-photo-7682130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
            <div className="w-2/3 h-full">
                <h1 className="text-white font-bold capitalize text-6xl text-center py-7">Contact us</h1>
                <div className="mt-8 lg:w-1/2 lg:mx-6 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}>
                    <div className="w-full px-8 py-10 mx-auto overflow-hidden shadow-2xl rounded-xl dark:bg-black lg:max-w-xl">
                        <form className="mt-4">
                            <div className="flex-1">
                                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Full Name</label>
                                <input required type="text" name="name" placeholder="Enter Your Name" className="block w-full px-5 py-3 mt-2 text-gray-700 bg-black border border-gray-200 rounded-md dark:bg-black dark:text-gray-300 dark:border-gray-600 focus:border-gray-200 focus:ring-white focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                            </div>
                            <div className="flex-1 mt-6">
                                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email address</label>
                                <input required type="email" name="user_email" placeholder="email@example.com" className="block w-full px-5 py-3 mt-2 text-gray-700 bg-black border border-gray-200 rounded-md dark:bg-black dark:text-gray-300 dark:border-gray-600 focus:border-gray-200 focus:ring-white focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                            </div>
                            <div className="w-full mt-6">
                                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Message</label>
                                <textarea required name="message" className="block w-full h-32 px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-black border border-gray-200 rounded-md md:h-48 dark:bg-black dark:text-gray-300 dark:border-gray-600 focus:border-gray-200 focus:ring-white focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" placeholder="Message"></textarea>
                            </div>
                            <button type='submit' value="Send" style={{ fontFamily: "poppins" }} className="w-full px-6 py-3 mt-6 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-gray-200 focus:ring-white50">Get in Touch</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
