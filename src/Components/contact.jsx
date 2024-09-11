import React from 'react'
import FAQs from './faqs'
import { EmailInput } from './home'
import { motion } from 'framer-motion'

export default function Contact() {
    return (
        <>
            <div className="flex-col py-8">
                <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="flex mt-6 justify-center items-center">
                    <div className="w-16 h-1 rounded-full bg-green-500"></div><span className='text-green-500 px-3'>Contact Us</span><div className="w-16 h-1 rounded-full bg-green-500"></div>
                </motion.div>
                <motion.h1 initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.15 }} className="text-6xl text-white font-semibold text-center">Send Us a Message</motion.h1>
            </div>
            <div className="flex justify-center items-center w-screen">
                <div className="container mx-auto my-4 px-4 lg:px-20">
                    <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="w-full p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto border border-green-600 rounded-2xl shadow-xl shadow-green-600">
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
                            <input className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline" type="text" placeholder="First Name*" />
                            <input className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline" type="text" placeholder="Last Name*" />
                            <input className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline" type="email" placeholder="Email*" />
                            <input className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline" type="number" placeholder="Phone*" />
                        </div>
                        <div className="my-4">
                            <textarea placeholder="Message*" className="w-full h-32 bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"></textarea>
                        </div>
                        <div className="my-2 w-1/2 lg:w-1/4">
                            <button className="uppercase text-sm font-bold tracking-wide bg-green-600 text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline">Send Message</button>
                        </div>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.15 }} className="w-full lg:-mt-64 lg:w-2/6 px-8 py-5 ml-auto bg-green-600 rounded-2xl">
                        <div className="flex flex-col text-white">
                            <h1 className="font-bold uppercase text-4xl my-4">Reach out to us</h1>
                            <p className="text-white">We're always here to help. Contact us if you are experiencing issues with our product or have any questions.</p>
                            <div className="flex my-4 items-center">
                                <i className="fa-regular fa-envelope pt-2" />
                                <div className="flex flex-col ml-3.5">
                                    <h2 className="text-2xl font-semibold">Email</h2>
                                    <a href='mailto:orato.official@gmail.com' className="text-white">orato.official@gmail.com</a>
                                </div>
                            </div>
                            <div className="flex my-4 items-center">
                                <i className="fa fa-phone pt-2" />
                                <div className="flex flex-col ml-3.5">
                                    <h2 className="text-2xl font-semibold">Call Us</h2>
                                    <a className="text-white">+91 89209 58975</a>
                                    <a className="text-white">+91 98990 79777</a>
                                </div>
                            </div>
                            <div className="flex my-4 w-full justify-center">
                                <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="rounded-full bg-white h-12 w-12 inline-block mx-1 items-center text-center p-2.5">
                                    <i className="fa-brands fa-instagram text-green-600 text-xl"></i>
                                </a>
                                <a href="https://www.linkedin.com/company/" target="_blank" rel="noreferrer" className="rounded-full bg-white h-12 w-12 inline-block mx-1 items-center text-center p-2.5">
                                    <i className="fa-brands fa-linkedin-in text-green-600 text-xl"></i>
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
            <FAQs />
            <EmailInput />
        </>
    )
}
