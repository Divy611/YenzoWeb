import FAQs from './faqs'
import { EmailInput } from './home'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import React, { useState, useRef } from 'react'

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
                    <ContactForm />
                    <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.15 }} className="w-full lg:-mt-64 lg:w-2/6 px-8 py-5 ml-auto bg-green-600 rounded-2xl">
                        <div className="flex flex-col text-white">
                            <h1 className="font-bold uppercase text-4xl my-4">Reach out to<br /> us</h1>
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
                                    <p className="text-white">+91 89209 58975</p>
                                    <p className="text-white">+91 98990 79777</p>
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

const ContactForm = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        user_email: '',
        phone: '',
        message: ''
    });
    const form = useRef();
    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm('service_plkdmbx', 'template_ligaasq', form.current, '4o5KQ0dBHH07s3YcY')
            .then((result) => {
                setFormData({
                    name: '',
                    user_email: '',
                    phone: '',
                    message: ''
                });
                setIsSubmitted(true);
            }, (error) => { });
    };
    return (
        <motion.form ref={form} onSubmit={sendEmail} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="w-full p-12 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto border border-green-600 rounded-2xl shadow-xl shadow-green-600">
            <input required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline" type="text" placeholder="Full Name" />
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
                <input required value={formData.user_email} onChange={(e) => setFormData({ ...formData, user_email: e.target.value })} className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline" type="email" placeholder="Email" />
                <input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline" type="tel" placeholder="Phone" />
            </div>
            <div className="my-4">
                <textarea placeholder="Message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full h-32 bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"></textarea>
            </div>
            <div className="my-2 w-full">
                <button type='submit' value="Send" className="uppercase text-sm font-bold tracking-wide bg-green-600 text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline">Send Message</button>
            </div>
        </motion.form>
    );
}
