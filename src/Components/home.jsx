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
        <motion.div class="px-10 mx-auto" style={{ translateY: parallax, perspective: 1750 }} >
            <div class="items-center lg:flex">
                <div class="w-1/2">
                    <h1 class="font-bold text-white text-6xl"><span className='text-green-500'>ORATO.</span><br /> YOUR AI SPEECH COACH</h1>
                    <p class="mt-3 text-gray-300 text-xl">Mastering Communication,<br /> One word at a time...</p>
                </div>
                <div class="flex items-center justify-center mt-6 lg:mt-0 w-1/2" style={{ overflowX: "hidden" }}>
                    <Globe />
                </div>
            </div>
        </motion.div >
    )
}

const AssistantSection = () => {
    let { scrollYProgress } = useScroll();
    let parallaxTranslateBottom = useTransform(scrollYProgress, [0, 3], ["135%", "50%"]);
    let parallaxScaleBottom = useTransform(scrollYProgress, [0, 1], [1, 3]);
    return (
        <motion.div className="px-10 py-6 mx-auto parallax-element" style={{ transform: parallaxTranslateBottom, scale: parallaxScaleBottom }}>
            <section class="">
                <div class="container mx-auto flex px-5 items-center justify-center flex-col">
                    {/* <Laptop imageUrl={HomeSnap} /> */}
                    <img class="w-4/6 mb-10 object-cover object-center rounded-xl" alt="" src={HomeSnap} />
                    <div class="text-center lg:w-2/3 w-full">
                        <h1 class="title-font text-6xl mb-4 font-semibold text-white">Improve your Oratory Skils</h1>
                        <p class="mb-8 leading-relaxed text-gray-200">Meggings kinfolk echo park stumptown DIY, kale chips beard jianbing tousled. Chambray dreamcatcher trust fund, kitsch vice godard disrupt ramps hexagon mustache umami snackwave tilde chillwave ugh. Pour-over meditation PBR&B pickled ennui celiac mlkshk freegan photo booth af fingerstache pitchfork.</p>
                        <div class="flex justify-center">
                            <button class="inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg">Button</button>
                            <button class="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">Button</button>
                        </div>
                    </div>
                </div>
            </section>
        </motion.div>
    )
}

const Stats = () => {
    return (
        <>
            <motion.div className=" sm:px-2 py-48">
                <div className="px-10 flex justify-between items-end">
                    <div className="w-1/3 p-3.5">
                        <div className="h-[65vh] bg-green-500 rounded-xl justify-between flex-col">
                            <h1 className="px-5 py-16 font-bold text-5xl">75%</h1>
                            <h1 className="px-5 pt-7 font-semibold text-3xl">Of employers in India report difficulty in finding skilled talent, with communication skills being a key gap.</h1>
                        </div>
                    </div>
                    <div className="w-1/3 p-3.5">
                        <div className="h-[85vh] bg-green-500 rounded-xl justify-between flex-col">
                            <h1 className="px-5 py-16 font-bold text-5xl">91%</h1>
                            <h1 className="px-5 pt-44 font-semibold text-3xl">Employers cite communication as a critical skill for job success.</h1>
                        </div>
                    </div>
                    <div className="w-1/3 p-3.5">
                        <div className="h-[60vh] bg-green-500 rounded-xl justify-between flex-col">
                            <h1 className="px-5 py-16 font-bold text-5xl">74%</h1>
                            <h1 className="px-5 pt-7 font-semibold text-3xl">Of people experience some degree of anxiety or nervousness when public speaking.</h1>
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    )
}

const Features = () => {
    return (
        <section class="container px-5 py-12 mx-auto">
            <div class="text-center mb-20">
                <h1 class="sm:text-3xl text-2xl font-medium title-font text-white mb-4">Raw Denim Heirloom Man Braid</h1>
                <p class="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500s">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine, ramps microdosing banh mi pug.</p>
                <div class="flex mt-6 justify-center">
                    <div class="w-16 h-1 rounded-full bg-indigo-500 inline-flex"></div>
                </div>
            </div>
            <div class="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
                <div class="p-4 md:w-1/3 flex flex-col text-center items-center">
                    <div class="flex-grow">
                        <h2 class="text-white text-lg title-font font-medium mb-3">Shooting Stars</h2>
                        <p class="leading-relaxed text-base text-gray-200">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine, ramps microdosing banh mi pug VHS try-hard.</p>
                    </div>
                </div>
                <div class="p-4 md:w-1/3 flex flex-col text-center items-center">
                    <div class="flex-grow">
                        <h2 class="text-white text-lg title-font font-medium mb-3">The Catalyzer</h2>
                        <p class="leading-relaxed text-base text-gray-200">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine, ramps microdosing banh mi pug VHS try-hard.</p>
                    </div>
                </div>
                <div class="p-4 md:w-1/3 flex flex-col text-center items-center">
                    <div class="flex-grow">
                        <h2 class="text-white text-lg title-font font-medium mb-3">Neptune</h2>
                        <p class="leading-relaxed text-base text-gray-200">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine, ramps microdosing banh mi pug VHS try-hard.</p>
                    </div>
                </div>
            </div>
            <div class="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6 py-12">
                <div class="p-4 md:w-1/3 flex flex-col text-center items-center">
                    <div class="flex-grow">
                        <h2 class="text-white text-lg title-font font-medium mb-3">Shooting Stars</h2>
                        <p class="leading-relaxed text-base text-gray-200">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine, ramps microdosing banh mi pug VHS try-hard.</p>
                    </div>
                </div>
                <div class="p-4 md:w-1/3 flex flex-col text-center items-center">
                    <div class="flex-grow">
                        <h2 class="text-white text-lg title-font font-medium mb-3">The Catalyzer</h2>
                        <p class="leading-relaxed text-base text-gray-200">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine, ramps microdosing banh mi pug VHS try-hard.</p>
                    </div>
                </div>
                <div class="p-4 md:w-1/3 flex flex-col text-center items-center">
                    <div class="flex-grow">
                        <h2 class="text-white text-lg title-font font-medium mb-3">Neptune</h2>
                        <p class="leading-relaxed text-base text-gray-200">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine, ramps microdosing banh mi pug VHS try-hard.</p>
                    </div>
                </div>
            </div>

        </section>
    )
}