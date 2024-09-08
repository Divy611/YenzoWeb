import React, { useState } from 'react'

export default function AssistantPage() {
    const tabs = [
        { label: 'Search', content: <Search />, icon: <i className="fa-solid fa-magnifying-glass text-xl text-green-500"></i> },
        { label: 'Simulations', content: <></>, icon: <i className="fa-solid fa-store text-xl text-green-500"></i> },
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
            <div className="tab-list" style={{ backgroundColor: "#0E0D12" }}>
                <div className="flex flex-col justify-between">
                    <div className="py-7 h-full">
                        {tabs.map((tab, index) => (
                            <div key={index} className={`tab-item items-center p-5 ${index === activeTab ? 'active text-green-500 font-semibold' : 'text-white'}`} onClick={() => handleClick(index)}>
                                <span className="tab-icon">{tab.icon}</span>
                                <span className="tab-text px-2">{tab.label}</span>
                            </div>
                        ))}
                        <div className="p-2 text-center bg-blue-700 h-1/2 rounded w-full flex flex-col justify-between">
                            <h1 className="text-sm text-white text-center flex items-center">Upgrade your&nbsp;<span className='bg-yellow-300 py-1 px-2 rounded text-black font-semibold'>Plan</span></h1>
                            <button className="rounded-full p-2 text-white border border-white text-sm">View all Plans</button>
                        </div>
                        <div className="p-2 bg-white h-1/4 rounded"></div>
                    </div>
                    <div></div>
                </div>
            </div>
            <div className="tab-content">{tabs[activeTab].content}</div>
        </div>
    );
};

const Search = () => {
    return (
        <div style={{ backgroundColor: "#16151A" }} className="h-[85vh] flex flex-col justify-between items-center">
            <div className=""></div>
            <div className="w-1/2 h-1/2 bg-[#0E0D12] rounded-2xl border-2 border-green-500 shadow-md shadow-green-500"></div>
            <div className="w-full h-1/6 bg-black"></div>
        </div>
    )
}
