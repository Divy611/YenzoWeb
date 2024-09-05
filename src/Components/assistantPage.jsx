import React, { useState } from 'react'

export default function AssistantPage() {
    const tabs = [
        { label: 'Search', content: <></>, icon: <i className="fa-solid fa-magnifying-glass text-xl text-green-500"></i> },
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
            <div className="tab-list" style={{ backgroundColor: "#16151A" }}>
                <div className="justify-between">
                    <div className="py-7 justify-between h-full">
                        {tabs.map((tab, index) => (
                            <div key={index} className={`tab-item items-center p-5 hover:bg-green-300 hover:text-white text-white ${index === activeTab ? 'active text-green-500 font-semibold' : ''}`} onClick={() => handleClick(index)}>
                                <span className="tab-icon">{tab.icon}</span>
                                <span className="tab-text px-2">{tab.label}</span>
                            </div>

                        ))}
                        <div className="px-2 rounded-xl rounded-br-none rounded-bl-none bg-gray-900">
                            <div className="h-1/3 ">
                            </div>
                        </div>
                    </div>
                    <div></div>
                </div>
            </div>
            <div className="tab-content">{tabs[activeTab].content}</div>
        </div>
    );
};