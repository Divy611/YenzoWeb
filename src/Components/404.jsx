import React from 'react'
import { Globe } from './shapes'
import { motion } from 'framer-motion'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'

export default function PageNotFound() {
    const history = useHistory();
    return (
        <motion.div className="mx-auto py-5" style={{ perspective: 1750 }} >
            <div className="items-center lg:flex">
                <div className="w-1/2 px-10">
                    <motion.h1 initial={{ opacity: 0, x: -25 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="px-1.5 text-green-500 capitalize text-lg">404</motion.h1>
                    <motion.h1 initial={{ opacity: 0, x: -25 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.15 }} className="py-3 font-bold text-white xl:text-6xl sm:text-3xl tracking-wide">Page not found</motion.h1>
                    <motion.p initial={{ opacity: 0, x: -25 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.35 }} className="mt-3 text-gray-300 text-xl">Sorry, the page you are looking for doesn't exist. Here are some helpful links:</motion.p>
                    <div className="px-5 flex items-center mt-6 gap-x-3">
                        <button onClick={() => { history.goBack(); }} className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto hover:bg-gray-100">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 rtl:rotate-180">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                            </svg>
                            <span>Go back</span>
                        </button>

                        <a href="/"><button className="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-green-500 rounded-lg shrink-0 sm:w-auto hover:bg-green-600">
                            Take me home
                        </button>
                        </a>
                    </div>
                </div>
                <div className="flex items-center justify-center mt-6 lg:mt-0 w-1/2 globe" style={{ overflowX: "hidden" }}>
                    <Globe />
                </div>
            </div>
        </motion.div >
        //  <div className="w-full lg:w-1/2">
        //     <p className="px-5 text-sm font-medium text-green-500">404</p>
        //     <h1 className="px-5 mt-3 text-2xl font-semibold text-white md:text-3xl">Page not found</h1>
        //     <p className="px-5 mt-4 text-gray-300">Sorry, the page you are looking for doesn't exist.Here are some helpful links:</p>
        //     <div className="px-5 flex items-center mt-6 gap-x-3">
        //         <button className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto hover:bg-gray-100">
        //             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 rtl:rotate-180">
        //                 <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
        //             </svg>
        //             <span>Go back</span>
        //         </button>

        //         <button className="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-green-500 rounded-lg shrink-0 sm:w-auto hover:bg-green-600">
        //             Take me home
        //         </button>
        //     </div>
        // </div>

        // <div className="relative mt-8 w-1/2 lg:mt-0 overflow-x-hidden">
        //      <img className=" w-full lg:h-[32rem] h-80 md:h-96 rounded-lg object-cover " src="https://images.unsplash.com/photo-1613310023042-ad79320c00ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" alt=""> 
        //     <Globe />
        // </div>
    )
}
