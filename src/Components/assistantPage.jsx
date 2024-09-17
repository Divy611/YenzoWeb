import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { AudioRecorder } from './audioRecorder';

export default function AssistantPage() {
    const tabs = [
        { label: 'Search', content: <Search />, icon: <i className="fa-solid fa-magnifying-glass text-xl text-green-600"></i> },
        { label: 'Simulations', content: <Simulations />, icon: <i className="fa-solid fa-store text-xl text-green-600"></i> },
        { label: 'Saved', content: <Saved />, icon: <i className="fa-regular fa-folder-open text-xl text-green-600"></i> },
        { label: 'Challenges', content: <Saved />, icon: <i class="fa-solid fa-dumbbell text-xl text-green-600"></i> },
        { label: 'Settings', content: <Settings />, icon: <i className="fa-solid fa-gear text-xl text-green-600"></i> },
    ];
    return <VerticalTabs tabs={tabs} />;
}

const VerticalTabs = ({ tabs }) => {
    const [activeTab, setActiveTab] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);
    const handleClick = (index) => { setActiveTab(index); };
    const handleMouseEnter = () => { setIsExpanded(true); };
    const handleMouseLeave = () => { setIsExpanded(false); };
    return (
        <div className="vertical-tabs flex">
            <div className={`bg-[#0E0D12] text-white flex flex-col transition-all duration-500 ease-in-out ${isExpanded ? 'w-1/6' : 'w-16'}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <div className="flex-1 overflow-y-auto">
                    {tabs.map((tab, index) => (
                        <div key={index} className={`tab-item flex items-center py-3.5 px-3 cursor-pointer hover:bg-gray-700 transition-colors ${index === activeTab ? 'text-green-600 font-semibold' : 'text-white'}`} onClick={() => handleClick(index)}>
                            <span className='tab-icon'>{tab.icon}</span>
                            {isExpanded && <span className="ml-3 tab-text">{tab.label}</span>}
                        </div>
                    ))}
                </div>
                <div className="flex items-center bg-gray-800 p-2 h-1/6 rounded-xl rounded-b-none">
                    <img className="h-10 w-10 rounded-full" src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
                    {isExpanded && (<div className="ml-2"><h1 className="text-sm">Divy Parikh</h1><h2 className="text-xs">email@example.com</h2></div>)}
                </div>
            </div>
            <div className="flex-grow overflow-y-auto bg-[#16151A]">{tabs[activeTab].content}</div>
        </div>
    );
};

const Search = () => {
    return (
        <div className="h-[84.5vh] 2xl:h-[91vh] flex flex-col justify-between items-center overflow-y-hidden">
            <div className=""></div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="w-1/2 h-1/3 2xl:h-1/5 bg-[#0E0D12] rounded-2xl border border-green-600 shadow-md shadow-green-600">
                <div className="px-4 py-5 items-center justify-center">
                    <h1 className="text-white text-md">Hi, User!</h1>
                    <p className="text-white py-1 text-sm">It's great to have you here. To kick off our session, I'd love to hear all about you. Tell me about your background, your interests, and anything else you'd like to share. Feel free to include your hobbies, preferences, and what drives you.</p>
                </div>
            </motion.div>
            <div className="w-full h-1/6 bg-[#151418] border-t border-green-600">
                <div className="flex justify-center items-center px-10 py-4">
                    <AudioRecorder />
                    {/* <div className="relative mr-4 w-full text-left flex items-center rounded-xl">
                        <div className="w-full bg-transparent bg-opacity-50 focus:bg-transparent text-base outline-none text-green-100 p-3 leading-8 transition-colors duration-200 ease-in-out"></div>
                        <button className="text-green-600 px-4 py-3"><i className="fa-solid fa-circle-chevron-right text-2xl"></i></button>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

const Simulations = () => {
    const SimulationTile = ({ imageUrl, text, delay }) => {
        return (
            <div className="lg:w-1/2 sm:w-1/2 px-16 py-10 relative">
                <div className="flex relative items-center justify-center">
                    <motion.img src={imageUrl} className="inset-0 w-full h-full object-cover object-center rounded-2xl" style={{ filter: 'blur(2.25px)' }} alt='' initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: delay }} />
                    <div className="absolute inset-0 flex items-center justify-center"><p className="text-white text-4xl font-bold">{text}</p></div>
                </div>
            </div>
        )
    }

    return (
        <>
            <section className="py-12 mx-auto bg-[#16151A] h-[85vh] 2xl:h-[91vh] overflow-y-auto">
                <div className="flex flex-col text-center w-full mb-20">
                    <motion.h1 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-5xl font-semibold title-font mb-4 text-white">Simulations</motion.h1>
                    <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }} className="lg:w-2/3 text-sm mx-auto leading-relaxed text-white">Choose from a variety of situations to simulate.</motion.p>
                </div>
                <div className="flex flex-wrap -m-4">
                    <SimulationTile imageUrl={"https://images.pexels.com/photos/7979439/pexels-photo-7979439.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"} text={"Interviews"} delay={0} />
                    <SimulationTile imageUrl={"https://images.pexels.com/photos/5990037/pexels-photo-5990037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"} text={"Meetings"} delay={0.15} />
                    <SimulationTile imageUrl={"https://images.pexels.com/photos/7255270/pexels-photo-7255270.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"} text={"Presentations"} delay={0.25} />
                    <SimulationTile imageUrl={"https://images.pexels.com/photos/7245808/pexels-photo-7245808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"} text={"Sales"} delay={0.35} />
                    <SimulationTile imageUrl={"https://images.pexels.com/photos/1049317/pexels-photo-1049317.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"} text={"General Communication"} delay={0.45} />
                </div>
            </section>
        </>
    )
}
const Saved = () => {
    return (
        <section className="px-5 py-12 mx-auto bg-[#16151A] h-[85vh] 2xl:h-[91vh] overflow-y-auto">
        </section>
    )
}

const Settings = () => {
    return (
        <section className="px-5 py-12 mx-auto bg-[#16151A] h-[84vh] 2xl:h-[91vh] overflow-y-auto">
        </section>
    )
}