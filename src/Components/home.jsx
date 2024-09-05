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
        </>
    )
}

const HeroSection = () => {
    let { scrollYProgress } = useScroll();
    let parallax = useTransform(scrollYProgress, [0, 3], ["0%", "-195%"]);
    return (
        <motion.div className="px-10 mx-auto" style={{ translateY: parallax, perspective: 1750 }} >
            <div className="items-center lg:flex">
                <div className="w-1/2">
                    <h1 className="font-bold text-white text-6xl"><span className='text-green-500'>ORATO.</span><br /> YOUR AI SPEECH COACH</h1>
                    <p className="mt-3 text-gray-300 text-xl">Mastering Communication,<br /> One word at a time...</p>
                </div>
                <div className="flex items-center justify-center mt-6 lg:mt-0 w-1/2" style={{ overflowX: "hidden" }}>
                    <Globe />
                </div>
            </div>
        </motion.div >
    )
}

const AssistantSection = () => {
    let { scrollYProgress } = useScroll();
    let parallaxScaleBottom = useTransform(scrollYProgress, [0, 1], [1, 3]);
    let parallaxTranslateBottom = useTransform(scrollYProgress, [0, 3], ["135%", "50%"]);
    return (
        <motion.div className="px-10 py-6 mx-auto parallax-element" style={{ transform: parallaxTranslateBottom, scale: parallaxScaleBottom }}>
            <section className="">
                <div className="container mx-auto flex px-5 items-center justify-center flex-col">
                    {/* <Laptop imageUrl={HomeSnap} /> */}
                    <img className="w-4/6 mb-10 object-cover object-center rounded-xl" alt="" src={HomeSnap} />
                    <div className="text-center lg:w-2/3 w-full">
                        <h1 className="title-font text-6xl mb-4 font-semibold text-white">Improve your Oratory Skils</h1>
                        <p className="mb-8 leading-relaxed text-gray-200">Meggings kinfolk echo park stumptown DIY, kale chips beard jianbing tousled. Chambray dreamcatcher trust fund, kitsch vice godard disrupt ramps hexagon mustache umami snackwave tilde chillwave ugh. Pour-over meditation PBR&B pickled ennui celiac mlkshk freegan photo booth af fingerstache pitchfork.</p>
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
            <motion.div className=" sm:px-2 py-48">
                <div className="px-10 flex justify-between items-end">
                    <div className="w-1/3 p-5">
                        <div className="h-[60vh] bg-gray-200 rounded-xl justify-between flex-col">
                            <h1 className="px-5 py-16 font-bold text-5xl">74%</h1>
                            <h1 className="px-5 pt-2 font-semibold text-3xl">Of employers in India report difficulty in finding skilled talent, with communication skills being a key gap.</h1>
                        </div>
                    </div>
                    <div className="w-1/3 p-5">
                        <div className="h-[85vh] bg-green-500 rounded-xl justify-between flex-col">
                            <h1 className="px-5 py-16 font-bold text-5xl">91%</h1>
                            <h1 className="px-5 pt-48 font-semibold text-3xl">Employers cite communication as a critical skill for job success.</h1>
                        </div>
                    </div>
                    <div className="w-1/3 p-5">
                        <div className="h-[65vh] bg-pink-400 rounded-xl justify-between flex-col">
                            <h1 className="px-5 py-16 font-bold text-5xl">75%</h1>
                            <h1 className="px-5 pt-5 font-semibold text-3xl">Of people experience some degree of anxiety or nervousness when public speaking.</h1>
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    )
}

const Features = () => {
    const FeatureTile = ({ title, subtitle }) => {
        return (
            <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
                <div className="flex-grow">
                    <h2 className="text-white text-3xl font-extrabold mb-3">{title}</h2>
                    <p className="leading-relaxed text-base text-gray-200">{subtitle}</p>
                </div>
            </div>
        )
    }
    return (
        <section className="container px-5 py-12 mx-auto">
            <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
                <FeatureTile title={"Anxiety and Nervousness Management"} subtitle={"Virtual reality simulations to gradually expose users to speaking scenarios."} />
                <FeatureTile title={"Filler Word Reduction"} subtitle={"Advanced speech recognition to identify and track specific filler words."} />
                <FeatureTile title={"Body Language and Posture Enhancement"} subtitle={"Computer vision analysis of posture, gestures, and facial expressions along with targeted exercises for improving specific aspects."} />
            </div>
            <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6 py-12">
                <FeatureTile title={"Real-time Feedback and Personalised Coaching"} subtitle={"Instant, non-intrusive feedback during practice sessions along with detailed post-session analysis with actionable improvement suggestions."} />
                <FeatureTile title={"Tone and Pitch Consistency"} subtitle={"Personalised vocal exercises to improve range and control along with real-time graphical display of voice modulation during practice."} />
                <FeatureTile title={"Continuous Improvement and Skill Retention"} subtitle={"Regular skill assessments to identify areas needing focus."} />
            </div>
        </section>
    )
}