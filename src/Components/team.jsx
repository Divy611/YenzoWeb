import React from 'react'
import Divy from "../assets/Me.jpg"
import Aditya from "../assets/Aditya.jpg"
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Team() {
    let { scrollYProgress } = useScroll();
    let parallax = useTransform(scrollYProgress, [0, 3], ["0%", "-195%"]);
    return (
        <>
            <h1 className="text-6xl font-semibold title-font mb-2 text-white text-center py-12">Our Team</h1>
            <motion.section style={{ translateY: parallax, perspective: 1750 }} className="container mx-auto flex px-5 py-20 md:flex-row flex-col items-center">
                <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                    <motion.h1 className="title-font text-5xl mb-4 font-medium text-white">Aditya Pandey</motion.h1>
                    <div className="flex flex-row items-center text-white">
                        <p>(Co Founder, CEO)</p>
                        <a className="ml-3" href='https://www.linkedin.com/in/pandeyaditya03/'><i className="fa-brands fa-linkedin"></i></a>
                        <span>&nbsp;&#x2022;&nbsp;</span>
                        <a href='mailto:pandey.aditya1003@gmail.com'>pandey.aditya1003@gmail.com</a>
                    </div>
                    <h2 className="py-5 leading-relaxed text-gray-200">I believe in the power of technology to transform lives, and I'm on a mission to be at the forefront of that transformation.</h2>
                </div>
                <div className="lg:max-w-lg lg:w-1/2 md:w-1/3 w-1/3">
                    <img className="object-cover w-3/4 object-center rounded-full" alt="" src={Aditya} />
                </div>
            </motion.section>
            <motion.section style={{ translateY: parallax, perspective: 1750 }} className="container mx-auto flex px-5 py-20 md:flex-row flex-col items-center text-start">
                <div className="lg:w-1/2 md:w-1/3 w-4/5 mb-10 md:mb-0">
                    <img className="object-cover w-3/4 object-center rounded-full" alt="" src={Divy} />
                </div>
                <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start items-center">
                    <h1 className="title-font text-5xl mb-4 font-medium text-white">Divy Parikh</h1>
                    <div className="flex flex-row items-center text-white">
                        <p>(Co Founder, CTO)</p>
                        <a className="ml-3" href='https://www.linkedin.com/in/divyparikh611/'>
                            <i className="fa-brands fa-linkedin"></i>
                        </a><span>&nbsp;&#x2022;&nbsp;</span>
                        <a href='mailto:divy.parikh@hotmail.com'>divy.parikh@hotmail.com</a>
                    </div>
                    <h2 className="py-2 mb-8 leading-relaxed text-gray-200">A highly motivated and skilled Full-Stack Developer with hands-on experience across various roles in Software Development. I am passionate about technology, entrepreneurship, sports, and music.</h2>
                </div>
            </motion.section>
        </>
    )
}