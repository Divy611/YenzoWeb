import React from 'react'
import About1 from '../assets/about1.png'
import About2 from '../assets/about2.png'
import About3 from '../assets/about3.png'
import About4 from '../assets/about4.png'
import About5 from '../assets/about5.png'
import { Stats, FeatureTile, EmailInput } from './home'
import { useScroll, useTransform, motion } from 'framer-motion'

export default function About() {
    return (
        <>
            <MainSection />
            <Features />
            <Stats />
            <EmailInput />
        </>
    )
}

const MainSection = () => {
    let { scrollYProgress } = useScroll();
    let parallax = useTransform(scrollYProgress, [0, 3], ["0%", "-195%"]);
    return (
        <>
            <motion.section className="text-gray-600 body-font" style={{ translateY: parallax, perspective: 1750 }}>
                <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                    <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                        <motion.h1 initial={{ opacity: 0, x: -25 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="title-font text-6xl mb-4 font-bold text-white">Elevate Your Voice,<br /> Transform Your Presence.</motion.h1>
                        <motion.p initial={{ opacity: 0, x: -25 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.25 }} className="mb-8 leading-relaxed text-gray-300 text-lg">At Yenzo, we are on a mission to revolutionise how professionals and students master the art of communication. Whether you're preparing for a big presentation, sharpening your virtual communication skills, or simply seeking to enhance your everyday interactions, Yenzo is your trusted partner in communication excellence.</motion.p>
                    </div>
                    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 flex items-center">
                        <div className="w-1/3">
                            <img className='h-48 rounded-lg' src={About1} alt="" />
                        </div>
                        <div className="w-1/3 flex-col items-center justify-between h-full">
                            <div className='py-2'><img className='h-48 rounded-lg' src={About2} alt="" /></div>
                            <div className='py-2'><img className='h-48 rounded-lg' src={About3} alt="" /></div>
                        </div>
                        <div className="w-1/3 flex-col items-center justify-between h-full">
                            <div className='py-10'><img className='h-48 rounded-lg' src={About4} alt="" /></div>
                            <div className='py-10'><img className='h-48 rounded-lg' src={About5} alt="" /></div>
                        </div>
                    </div>
                </div>
            </motion.section>
        </>
    )
}

const Features = () => {
    return (
        <section className="container px-7 py-8 mx-auto">
            <div className="text-center mb-20">
                <div className="flex mt-6 justify-center items-center">
                    <div className="w-16 h-1 rounded-full bg-green-600"></div><span className='text-green-600 px-3'>Our Values</span><div className="w-16 h-1 rounded-full bg-green-600"></div>
                </div>
                <h1 className="text-6xl font-bold title-font text-white mb-4 py-4">What we Offer</h1>
            </div>
            <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6 py-3">
                <FeatureTile title={"User-Centricity"} subtitle={"We place the needs and goals of our users at the heart of everything we do, designing our platform to deliver a truly personalized and empowering experience."} delay={0.15} />
                <FeatureTile title={"Continuous Improvement"} subtitle={"We are relentlessly committed to innovation, constantly enhancing our AI models and expanding our feature set to stay ahead of the curve."} delay={0.25} />
                <FeatureTile title={"Attention to Detail"} subtitle={"We believe that mastering communication is in the subtle nuances, which is why we analyze and optimize every aspect of speech, language, and body language."} delay={0.35} />
            </div>
            <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6 py-3">
                <FeatureTile title={"Empathy and Inclusivity"} subtitle={"We foster a culture of understanding, embracing diverse communication styles and catering to the unique needs of professionals from all backgrounds."} delay={0.5} />
                <FeatureTile title={"Integrity and Transparency"} subtitle={"We are unwavering in our dedication to ethical AI practices, data privacy, and open communication with our users and stakeholders."} delay={0.65} />
                <FeatureTile title={"Collaborative Spirit"} subtitle={"We believe that great ideas and solutions emerge from diverse perspectives, which is why we actively seek partnerships and community engagement."} delay={0.75} />
            </div>
        </section>
    )
}