import React, { useState } from 'react'

export default function AssistantPage() {
    const tabs = [
        { label: 'Search', content: <Search />, icon: <i className="fa-solid fa-magnifying-glass text-xl text-green-500"></i> },
        { label: 'Simulations', content: <Simulations />, icon: <i className="fa-solid fa-store text-xl text-green-500"></i> },
        { label: 'Saved', content: <></>, icon: <i className="fa-regular fa-folder-open text-xl text-green-500"></i> },
        { label: 'Settings', content: <></>, icon: <i className="fa-solid fa-gear text-xl text-green-500"></i> },
    ];
    return (<VerticalTabs tabs={tabs} />)
}

const VerticalTabs = ({ tabs }) => {
    const [activeTab, setActiveTab] = useState(0);
    const handleClick = (index) => { setActiveTab(index); };
    return (
        <div className="vertical-tabs text-lg">
            <div className="tab-list bg-[#0E0D12]">
                <div className="h-full flex flex-col justify-between">
                    {tabs.map((tab, index) => (
                        <div key={index} className={`tab-item items-center px-3.5 py-4 ${index === activeTab ? 'active text-green-500 font-semibold' : 'text-white'}`} onClick={() => handleClick(index)}>
                            <span className="tab-icon">{tab.icon}</span>
                            <span className="tab-text px-2">{tab.label}</span>
                        </div>
                    ))}
                    <div className='p-3 h-1/3'>
                        <div className="p-2 text-center h-full bg-[#1F35C3] rounded-xl w-full flex flex-col justify-between">
                            <h1 className="text-sm text-white flex items-center px-7">Upgrade your&nbsp;<span className='bg-yellow-300 py-1 px-2 rounded text-black font-semibold'>Plan</span></h1>
                            <p className='text-white text-xs'>"Unlock lightning-fast responses and unleash your creativity.”</p>
                            <button className="rounded-full p-2 text-white border border-white text-sm">View all Plans</button>
                        </div>
                    </div>
                    <div className="p-2 bg-gray-800 h-1/6 rounded-xl rounded-b-none flex items-center">
                        <img className="h-10 w-10 rounded-full bg-white" src='https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' alt='' />
                        <div className="flex-col ml-2 text-white">
                            <h1 className='text-md'>Divy Parikh</h1>
                            <h1 className='text-sm'>divy.parikh@hotmail.com</h1>
                        </div>
                    </div>
                </div>
                <div>
                </div>
            </div>
            <div className="tab-content">{tabs[activeTab].content}</div>
        </div>
    );
};

const Search = () => {
    return (
        <div className="h-[85vh] flex flex-col justify-between items-center bg-[#16151A]">
            <div className=""></div>
            <div className="w-1/2 h-1/3 2xl:h-1/5 bg-[#0E0D12] rounded-2xl border border-green-500 shadow-md shadow-green-600">
                <div className="p-4">
                    <h1 className="text-white text-lg">Hi, User!</h1>
                    <p className="text-white py-1 text-md">It's great to have you here. To kick off our session, I'd love to hear all about you. Tell me about your background, your interests, and anything else you'd like to share. Feel free to include your hobbies, preferences, and what drives you.</p>
                </div>
            </div>
            <div className="w-full h-1/6 bg-[#151418] border-t border-green-600">
                <div className="flex w-full h-full justify-center items-center px-10">
                    <div className="relative mr-4 w-full text-left flex items-center border border-green-600 rounded-xl">
                        <button className="text-green-500 px-4 py-3"><i className="fa-solid fa-microphone text-xl"></i></button>
                        <div className="w-full bg-transparent bg-opacity-50 focus:bg-transparent text-base outline-none text-green-100 p-3 leading-8 transition-colors duration-200 ease-in-out"></div>
                        {/* <input placeholder='Click on the Mic button on the right to respond!' type="text" id="hero-field" name="hero-field" className="w-full bg-transparent bg-opacity-50 focus:bg-transparent text-base outline-none text-green-100 p-3 leading-8 transition-colors duration-200 ease-in-out" /> */}
                        <button className="text-green-500 px-4 py-3"><i className="fa-solid fa-circle-chevron-right text-2xl"></i></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Simulations = () => {
    return (
        <></>
    )
}