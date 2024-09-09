import React from "react";
import { Globe } from "./shapes";
import HomeSnap from "../assets/Home.png";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Home() {
    return (
        <>
            <HeroSection />
            <AssistantSection />
            <Stats />
            <Features />
            <EmailInput />
        </>
    )
}

const HeroSection = () => {
    let { scrollYProgress } = useScroll();
    let parallax = useTransform(scrollYProgress, [0, 3], ["0%", "-195%"]);
    return (
        <motion.div className="mx-auto py-10" style={{ translateY: parallax, perspective: 1750 }} >
            <div className="items-center lg:flex">
                <div className="w-1/2 px-10">
                    <h1 className="font-bold text-white xl:text-6xl sm:text-3xl"><span className='text-green-500'>ORATO.</span><br /> YOUR AI SPEECH COACH</h1>
                    <p className="mt-3 text-gray-300 text-xl">Mastering Communication,<br /> One word at a time...</p>
                </div>
                {/* <div className="flex items-center justify-center w-1/2 sm:none">
                    <img className="object-cover object-center rounded-2xl rounded-r-none w-full h-[75vh] shadow-lg shadow-green-500 border border-green-600" src={Login} alt="" />
                </div> */}
                <div className="flex items-center justify-center mt-6 lg:mt-0 w-1/2 globe" style={{ overflowX: "hidden" }}>
                    <Globe />
                </div>
            </div>
        </motion.div >
    )
}

const AssistantSection = () => {
    let { scrollYProgress } = useScroll();
    let parallaxScaleBottom = useTransform(scrollYProgress, [0, 1], [1, 3]);
    let parallaxTranslateBottom = useTransform(scrollYProgress, [0, 3], ["150%", "50%"]);
    return (
        <motion.div className="px-10 py-24 mx-auto parallax-element" style={{ transform: parallaxTranslateBottom, scale: parallaxScaleBottom }}>
            <section className="">
                <div className="container mx-auto flex px-5 items-center justify-center flex-col">
                    {/* <Laptop imageUrl={HomeSnap} /> */}
                    <img className="w-4/6 mb-10 object-cover object-center rounded-2xl" alt="" src={HomeSnap} />
                    <div className="text-center lg:w-2/3 w-full py-7">
                        <h1 className="title-font text-6xl mb-4 font-semibold text-white">Improve your Oratory Skils</h1>
                        <p className="mb-8 leading-relaxed text-gray-200 text-lg">Practice your speaking skills in private,<br /> without any embarrassment.</p>
                        <div className="flex justify-center">
                            <button className="inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg">Button</button>
                            <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">Button</button>
                        </div>
                    </div>
                </div>
            </section>
        </motion.div>
    )
}

export const Stats = () => {
    return (
        <>
            <motion.div className="sm:px-2 py-32 graphs">
                <div className="px-10 flex justify-between items-end">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="w-1/3 p-5">
                        <div className="h-[60vh] bg-gray-200 rounded-xl justify-between flex-col">
                            <h1 className="px-5 py-16 font-bold text-5xl">74%</h1>
                            <h1 className="px-5 pt-2 font-semibold text-3xl">Of employers in India report difficulty in finding skilled talent, with communication skills being a key gap.</h1>
                        </div>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.15 }} className="w-1/3 p-5">
                        <div className="h-[85vh] bg-green-500 rounded-xl justify-between flex-col">
                            <h1 className="px-5 py-16 font-bold text-5xl">91%</h1>
                            <h1 className="px-5 pt-48 font-semibold text-3xl">Employers cite communication as a critical skill for job success.</h1>
                        </div>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.35 }} className="w-1/3 p-5">
                        <div className="h-[65vh] bg-pink-400 rounded-xl justify-between flex-col">
                            <h1 className="px-5 py-16 font-bold text-5xl">75%</h1>
                            <h1 className="px-5 pt-5 font-semibold text-3xl">Of people experience some degree of anxiety or nervousness when public speaking.</h1>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </>
    )
}

export const FeatureTile = ({ title, subtitle, delay }) => {
    return (
        <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: delay }} className="p-4 md:w-1/3 flex flex-col text-center items-center flex-grow">
            <h2 className="text-white text-3xl font-extrabold mb-3">{title}</h2>
            <p className="leading-relaxed text-base text-gray-200">{subtitle}</p>
        </motion.div>
    )
}
const Features = () => {
    return (
        <section className="container px-5 py-20 mx-auto">
            <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
                <FeatureTile title={"Anxiety and Nervousness Management"} subtitle={"Virtual reality simulations to gradually expose users to speaking scenarios."} delay={0} />
                <FeatureTile title={"Filler Word Reduction"} subtitle={"Advanced speech recognition to identify and track specific filler words."} delay={0.15} />
                <FeatureTile title={"Body Language and Posture Enhancement"} subtitle={"Computer vision analysis of posture, gestures, and facial expressions along with targeted exercises for improving specific aspects."} delay={0.25} />
            </div>
            <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6 py-12">
                <FeatureTile title={"Real-time Feedback and Personalised Coaching"} subtitle={"Instant, non-intrusive feedback during practice sessions along with detailed post-session analysis with actionable improvement suggestions."} delay={0.35} />
                <FeatureTile title={"Tone and Pitch Consistency"} subtitle={"Personalised vocal exercises to improve range and control along with real-time graphical display of voice modulation during practice."} delay={0.45} />
                <FeatureTile title={"Continuous Improvement and Skill Retention"} subtitle={"Regular skill assessments to identify areas needing focus."} delay={0.5} />
            </div>
        </section>
    )
}

export const EmailInput = () => {
    return (
        <section className="text-gray-600 body-font">
            <div className="container mx-auto flex flex-col px-5 py-24 justify-center items-center">
                <div className="w-full md:w-2/3 flex flex-col mb-16 items-center text-center">
                    <motion.h1 initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="title-font text-5xl mb-4 font-bold text-white">Want to be one of our first users?</motion.h1>
                    <motion.p initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.15 }} className="mb-8 leading-relaxed text-gray-200 text-lg">Drop your email down below to get notified!</motion.p>
                    <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.35 }} className="flex w-full justify-center items-center">
                        <div className="relative mr-4 lg:w-full xl:w-1/2 w-2/4 md:w-full text-left">
                            <label for="hero-field" className="leading-7 text-sm text-gray-600"></label>
                            <input type="text" id="hero-field" name="hero-field" placeholder="Enter your email here" className="w-full bg-opacity-50 rounded focus:ring-2 focus:ring-green-200 focus:bg-transparent border border-gray-300 focus:border-green-500 text-base outline-none text-gray-700 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        <button className="inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg">Button</button>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}