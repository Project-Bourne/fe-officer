import React, { useState } from 'react';
import Image from 'next/image';
import data, { HistoryItem } from './data';

function Histroy() {
  const [savedItems, setSavedItems] = useState<number[]>([]); // Array to store saved item indices

  // Function to get the first 3 history items
  const getFirstThreeHistoryItems = () => {
    return data.slice(0, 3);
  };

  const handleSave = (index: number) => {
    if (savedItems.includes(index)) {
      // If the item is already saved, remove it from the array
      setSavedItems(savedItems.filter((itemIndex) => itemIndex !== index));
    } else {
      // If the item is not saved, add it to the array
      setSavedItems([...savedItems, index]);
    }
  };

  return (
    <>
      {/* tab section  */}
      <div>
        <h1></h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-10 px-5">
        {/* Conditional rendering for empty data */}
        {data.length === 0 ? (
          <div className="flex flex-col items-center justify-center w-[100%] my-[5rem] md:ml-[15rem] pb-10">
            <Image
              src={require('../../../assets/icons/Time.svg')}
              alt="documents"
              className="cursor-pointer pb-5"
              width={100}
            />
            <h1 className="text-center text-2xl pb-5">No history yet</h1>
            <p className="text-center text-gray-400 pb-5">
              Your recent documents will appear here
            </p>
          </div>
        ) : (
          <>
            {/* Render the list items */}
            {getFirstThreeHistoryItems().map((item: HistoryItem, index) => (
              <div
                key={index}
                className="row-span-2 p-4 rounded-[1rem] border  bg-sirp-lightGrey w-10rem"
              >
                <div className="flex align-middle justify-end">
                  {/* save icon  */}
                  <Image
                    className="flex align-middle justify-center cursor-pointer"
                    src={
                      savedItems.includes(index)
                        ? item.imgSrcSave
                        : item.imgSrc
                    }
                    alt="upload image"
                    width={18}
                    height={18}
                    priority
                    onClick={() => handleSave(index)} // Add the click event handler to the save icon
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-light my-3">{item.title}</span>
                  <span className="font-normal mb-3">{item.description}</span>
                  <span className="font-light my-3">{item.keywordTitle}</span>
                  <div className="flex flex-wrap align-middle gap-4">
                    {item.keywords.map((keyword) => (
                      <span
                        key={keyword.id}
                        className="lang rounded-lg bg-sirp-primaryLess2 border border-sirp-keynotebg flex align-middle px-3 py-1"
                      >
                        {keyword.keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* "Show all" button */}
            <div
              className="border flex items-center gap-2 cursor-pointer bg-sirp-lightGrey justify-center py-2 border-gray-500 mt-5 w-[100%] rounded-[1rem]"
            >
              <h2>Show all</h2>
              <Image
                src={require('../../../assets//icons/leftArro.svg')}
                alt="documents"
                className="cursor-pointer w-[2rem] h-[2rem] mt-2"
                width={10}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Histroy;
