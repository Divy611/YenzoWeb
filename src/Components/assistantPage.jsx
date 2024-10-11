import { agendas } from './lists'
import { motion } from 'framer-motion'
import Sim1 from '../assets/sim1.jpeg'
import Sim2 from '../assets/sim2.jpeg'
import Sim3 from '../assets/sim3.jpeg'
import Sim4 from '../assets/sim4.jpeg'
import Sim5 from '../assets/sim5.jpeg'
import React, { useState } from 'react'
import LogoFull from '../assets/logo1.png'
import Logo from '../assets/logo_no_title.png'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'

export default function AssistantPage() {
    const tabs = [
        { label: 'Home', content: <HomeScreen />, icon: <i className="fa-solid fa-home text-xl text-green-600"></i> },
        { label: 'Simulations', content: <Simulations />, icon: <i className="fa-solid fa-store text-xl text-green-600"></i> },
        { label: 'Leaderboard', content: <LeaderBoard />, icon: <i className="fa-solid fa-list text-xl text-green-600"></i> },
        { label: 'Settings', content: <Settings />, icon: <i className="fa-solid fa-gear text-xl text-green-600"></i> },
    ];
    return <VerticalTabs tabs={tabs} />;
}

const VerticalTabs = ({ tabs }) => {
    const [activeTab, setActiveTab] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);
    const handleClick = (index) => setActiveTab(index);
    const handleMouseEnter = () => setIsExpanded(true);
    const handleMouseLeave = () => setIsExpanded(false);

    return (
        <div className="vertical-tabs flex h-[100vh]">
            <div className={`bg-[#0E0D12] h-full text-white flex flex-col justify-between transition-all duration-500 ease-in-out ${isExpanded ? 'w-1/6' : 'w-16'}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <div className="px-3.5 py-5 items-center">
                    {isExpanded ? <img src={LogoFull} className='p-5' alt="" /> : <img src={Logo} className='w-6/7' alt="" />}
                </div>
                <div className="flex-1 overflow-y-auto items-center">
                    {tabs.map((tab, index) => (
                        <div key={index} className={`tab-item flex items-center py-4 px-5 cursor-pointer hover:bg-gray-700 transition-colors ${index === activeTab ? 'text-green-600 font-semibold' : 'text-white'}`} onClick={() => handleClick(index)}>
                            <span className="tab-icon">{tab.icon}</span>
                            {isExpanded && <span className="ml-3 tab-text">{tab.label}</span>}
                        </div>
                    ))}
                </div>
                <div className="flex items-center bg-gray-800 p-2 h-24 rounded-t-xl">
                    <img className="h-10 w-10 rounded-full" src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
                    {isExpanded && (
                        <div className="ml-2">
                            <h1 className="text-sm">Divy Parikh</h1>
                            <h2 className="text-xs">email@example.com</h2>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex-grow overflow-y-auto bg-[#16151A]">{tabs[activeTab].content}</div>
        </div>
    );
};

const HomeScreen = () => {
    const history = useHistory();
    const AgendaList = () => {
        return (
            <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.35 }} className="w-full h-1/2 2xl:h-1/3 bg-[#151418] rounded-xl shadow-md shadow-gray-600">
                <div className="p-3.5 h-full justify-center">
                    <div className="px-2 h-full rounded-lg flex flex-col overflow-y-auto text-start">
                        {agendas.map((agenda, index) => (
                            <div key={index} className='py-5 border-b border-gray-300 flex items-center justify-between'>
                                <div className="flex items-center">
                                    <input type="checkbox" className={`appearance-none w-4 h-4 border border-gray-500 rounded-full checked:bg-green-600 focus:outline-none ${agenda.isComplete ? 'bg-green-600' : ''}`} />
                                    <h1 className={`ml-2.5 text-white ${agenda.isComplete ? "line-through" : ""}`}>{agenda.heading}</h1>
                                </div>
                                <h2 className={`text-green-600 ${agenda.isComplete ? "line-through" : ""}`}>+{agenda.points} points</h2>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        )
    }
    return (
        <section className="container px-5 py-32 mx-auto bg-[#16151A] h-[100vh] items-center justify-center text-center overflow-y-auto">
            <div className="mx-auto flex px-5 h-full 2xl:h-3/4 2xl:py-12 w-1/2 flex flex-col justify-between items-center">
                <div>
                    <motion.h1 initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="title-font text-3xl mb-4 font-medium text-white">Hi User! Welcome to Yenzo</motion.h1>
                    <motion.p initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }} className="mb-5 2xl:mb-0 leading-relaxed text-green-500">What's on your agenda today?</motion.p>
                </div>
                <AgendaList />
                <motion.button onClick={() => { history.push('/new-session') }} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }} className="flex items-center text-white bg-gray-800 border-0 p-3 focus:outline-none hover:bg-gray-900 rounded-xl text-lg">
                    <i className="fa-solid fa-microphone text-xl text-green-600"></i>
                    <h1 className='ml-3 text-sm'>Start a New Session</h1>
                </motion.button>
            </div>
        </section >
    )
}

const Simulations = () => {
    const SimulationTile = ({ imageUrl, text, delay }) => {
        return (
            <div className="lg:w-1/2 sm:w-1/2 px-16 py-10 relative">
                <div className="flex relative items-center justify-center">
                    <motion.img src={imageUrl} className="inset-0 w-full h-full object-cover object-center rounded-2xl" style={{ filter: 'blur(5px)' }} alt='' initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: delay }} />
                    <div className="absolute inset-0 flex items-center justify-center"><motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: delay }} className="text-white text-4xl font-bold">{text}</motion.p></div>
                </div>
            </div>
        )
    }

    return (
        <>
            <section className="py-12 mx-auto bg-[#16151A] h-[100vh] overflow-y-auto overflow-x-hidden">
                <div className="flex flex-col text-center w-full mb-20">
                    <motion.h1 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-5xl font-semibold title-font mb-4 text-white">Simulations</motion.h1>
                    <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }} className="lg:w-2/3 text-sm mx-auto leading-relaxed text-white">Choose from a variety of situations to simulate.</motion.p>
                </div>
                <div className="flex flex-wrap -m-4">
                    <SimulationTile imageUrl={Sim1} text={"Interviews"} delay={0} />
                    <SimulationTile imageUrl={Sim2} text={"Meetings"} delay={0.15} />
                    <SimulationTile imageUrl={Sim3} text={"Presentations"} delay={0.25} />
                    <SimulationTile imageUrl={Sim4} text={"Sales"} delay={0.35} />
                    <SimulationTile imageUrl={Sim5} text={"General Communication"} delay={0.45} />
                </div>
            </section>
        </>
    )
}
const LeaderBoard = () => {
    return (
        <section className="px-5 py-12 mx-auto bg-[#16151A] h-[100vh] overflow-y-auto">
            <div className="flex flex-col text-center w-full mb-20">
                <motion.h1 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-5xl font-semibold title-font mb-4 text-white">Leaderboard</motion.h1>
            </div>
        </section>
    )
}

const Settings = () => {
    return (
        <section className="px-5 py-12 mx-auto bg-[#16151A] h-[100vh] overflow-y-auto">
            <div className="flex flex-col text-center w-full mb-20">
                <motion.h1 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-5xl font-semibold title-font mb-4 text-white">Settings</motion.h1>
            </div>
        </section>
    )
}