import React, { useState } from 'react';
import { HomeSubData } from '@/utils/constants';
import Image from 'next/image';
import Histroy from './Histroy';

function TabLayout() {
  const data = HomeSubData;
  const [selectedTab, setSelectedTab] = useState(data[0].id); // Initially select the first tab
  const [showContent, setShowContent] = useState(false); // State to control showing additional content

  const handleClick = (id) => {
    setSelectedTab(id);
    setShowContent(false); // Reset the additional content when changing the selected tab
  };

  return (
    <div>
      <div className="flex flex-row gap-10 w-[100%] border-b-2">
        {data.map((item, index) => (
          <div key={index} onClick={() => handleClick(item.id)} className="ml-10">
            <div
              className={`${
                item.id === selectedTab
                  ? 'flex cursor-pointer border-b-2 w-[10rem]  border-sirp-primary pb-2'
                  : ' w-[10rem] flex cursor-pointer'
              }`}
            >
              <Image
                src={
                  item.id === selectedTab
                    ? require(`../../../assets/icons/${item.selectedIcon}`)
                    : require(`../../../assets/icons/${item.icon}`)
                }
                alt="Dashboard icon"
                width={22}
                height={22}
                className="fill-sirp-primary md:mr-[20px]"
                priority
              />
              <h1
                className={`${
                  item.id === selectedTab ? 'font-bold text-1xl text-sirp-primary' : 'font-bold text-1xl'
                }`}
              >
                {item.name}
              </h1>
            </div>
          </div>
        ))}
      </div>
      {/* Conditionally render additional content based on selectedTab */}
      <div className='flex'>
        {selectedTab === 1 && <Histroy/>}
        {selectedTab === 2 && <h1>Saved</h1>}
      </div>
    </div>
  );
}

export default TabLayout;
