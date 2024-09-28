import FAQs from './faqs'
import { EmailInput } from './home'
import { motion } from 'framer-motion'
import React, { useState } from 'react'

export default function Pricing() {
    return (
        <>
            <PricingSection />
            <FAQs />
            <EmailInput />
        </>
    )
}

function PricingSection() {
    const [billingCycle, setBillingCycle] = useState('Monthly');
    return (
        <section className="overflow-hidden">
            <div className="container px-5 py-12 mx-auto">
                <div className="flex flex-col text-center w-full mb-20">
                    <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="flex mt-6 justify-center items-center">
                        <div className="w-16 h-1 rounded-full bg-green-600"></div><span className='text-green-600 px-3'>Pricing</span><div className="w-16 h-1 rounded-full bg-green-600"></div>
                    </motion.div>
                    <motion.h1 initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.15 }} className="text-5xl font-medium title-font mb-2 text-white">Pricing plans for teams of all sizes</motion.h1>
                    <motion.p initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.35 }} className="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-400">Get started for free. No credit card needed.</motion.p>
                    <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.5 }} className="flex mx-auto border border-green-600 rounded-xl overflow-hidden mt-5">
                        <button className={`py-2 px-4 focus:outline-none transition-colors duration-300 ${billingCycle === 'Monthly' ? 'bg-green-600 text-white' : 'text-white bg-transparent hover:bg-green-500 hover:text-white hover:opacity-40'}`} onClick={() => setBillingCycle('Monthly')}>Monthly</button>
                        <button className={`py-2 px-4 focus:outline-none transition-colors duration-300 ${billingCycle === 'Annually' ? 'bg-green-600 text-white' : 'text-white bg-transparent hover:bg-green-500 hover:text-white hover:opacity-40'}`} onClick={() => setBillingCycle('Annually')}>Annually</button>
                    </motion.div>
                </div>
                <div className="flex flex-wrap -m-4">
                    <PricingTile tierName={"STARTER"} price={'FREE'} feature1={"Limited daily practice time."} feature2={"Basic speech analysis features."} feature3={"Basic AI suggestions only."} feature4={"Weekly Progress Reports"} delay={0.15} />
                    <PricingTile tierName={"PRO"} price={billingCycle === 'Monthly' ? 199 : 150} feature1={"Unlimited Practice Time."} feature2={"Real-time feedback during practice sessions."} feature3={"Advanced speech analysis."} feature4={"Custom scenario creation."} feature5={"Priority customer support."} delay={0.35} />
                    <PricingTile tierName={"ENTERPRISE"} price={"Custom"} feature1={"All Pro Features."} feature2={"Additional scenarios tailored to specific industries."} feature3={"Check High-stakes presentation scenarios."} feature4={"Team performance analytics and reporting."} delay={0.5} />
                </div>
            </div>
        </section>
    )
}

const PricingTile = ({ tierName, price, feature1, feature2, feature3, feature4, feature5, delay }) => {
    const features = [feature1, feature2, feature3, feature4, feature5];
    return (
        <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: delay }} className="p-4 xl:w-1/3 md:w-1/2 w-full">
            <div className="h-full p-6 rounded-xl border border-gray-300 flex flex-col relative overflow-hidden">
                <h2 className="text-sm tracking-widest title-font mb-1 font-medium text-white">{tierName}</h2>
                {typeof price === 'string' ? (
                    <h1 className="text-5xl text-white leading-none font-semibold flex items-center py-2 pb-4 mb-4 border-b border-gray-200"><span>{price}</span></h1>
                ) : (
                    <h1 className="text-5xl text-white leading-none font-semibold flex items-center py-2 pb-4 mb-4 border-b border-gray-200">
                        <span>₹ {price}</span>
                        <span className="text-lg ml-1 font-normal text-gray-500">/mo</span>
                    </h1>
                )}
                {features.map((feature, index) => (
                    <p key={index} className="flex items-center text-gray-200 text-lg py-1 mb-2">
                        {feature
                            ? (<>
                                <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-green-400 text-white rounded-full flex-shrink-0">
                                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" className="w-3 h-3" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"></path></svg>
                                </span>
                                <h1 className='ml-1'>{feature}</h1>
                            </>)
                            : (
                                <span className="w-4 h-4 mr-2 inline-flex items-center justify-center text-white rounded-full flex-shrink-0"></span>
                            )}
                    </p>
                ))}
                <div className="py-2 mt-auto">
                    <button className="flex items-center mt-auto text-white bg-green-600 border-0 py-2 px-4 w-full focus:outline-none hover:bg-green-800 rounded">Pay Now!
                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-auto" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"></path></svg>
                    </button>
                </div>
            </div>
        </motion.div>
    )
}