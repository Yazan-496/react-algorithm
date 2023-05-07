import React, { useState } from 'react';
import ArrayComponent from "./array";
import CharComponent from "./chars";

const Tabs = () => {

    const [currentTab, setCurrentTab] = useState('1');
    const tabs = [
        {
            id: 1,
            tabTitle: 'Find Largest, smallest, middle numbers algorithm',
            title: 'Numbers Algorithm',
            content: <ArrayComponent />
        },
        {
            id: 2,
            tabTitle: 'Check if there are two characters repeated in a word algorithm',
            title: 'Chars Algorithm',
            content: <ArrayComponent />
        }
    ];

    const handleTabClick = (e) => {
        setCurrentTab(e.target.id);
    }

    return (
        <div className='container'>
            <div className='tabs'>
                {tabs.map((tab, i) =>
                    <button key={i} id={tab.id} disabled={currentTab === `${tab.id}`} onClick={(handleTabClick)}>{tab.tabTitle}</button>
                )}
            </div>
            <div className='content'>
                {tabs.map((tab, i) =>
                    <div className="text-center" key={i}>
                        {currentTab === `${tab.id}` && <div><p className='title'>{tab.title}</p>{tab.content}</div>}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Tabs;
