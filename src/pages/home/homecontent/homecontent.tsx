import React, { useState } from 'react';
import ActionIcons from '../components/actionIcons/ActionIcon';
import Image from 'next/image';
import BreadCrum from '../components/BreadCrum';
import Min_and_Max_icon from '../components/Min_Max_icon';
import DummyText from '../components/dummyText';
import { useRouter } from 'next/router';

function homecontent() {
  const router = useRouter();
  const [hideMeta, setHideMeta] = useState(true);
  const handleMax = () => {
    setHideMeta(true);
  };
  const handleMin = () => {
    setHideMeta(false);
  };
  return (
    <div className="bg-sirp-secondary2 h-[100%] mx-5 rounded-[1rem]">
      <div className="flex md:justify-between flex-wrap px-5 py-5 ">
        <div className="">
          <Image
            src={require('../../../assets/icons/arrow-narrow-left 1.svg')}
            alt="documents"
            className="cursor-pointer pb-5"
            width={20}
            onClick={() => router.back()}
          />
          {/* the name goes here  */}
          <h1 className="text-2xl">Peter Duru</h1>
        </div>
        {/* all icons with modal  */}
        <ActionIcons />
      </div>
      {/* breadcrum section  */}
      <BreadCrum />
      {/* min and max */}
      <div className="bg-white border my-10 mx-10 rounded-[1rem]">
        <Min_and_Max_icon maxOnClick={handleMax} minOnClick={handleMin} />
        {hideMeta == true && (
          <div className="pl-5 my-5">
            <p className="text-md text-gray-500">Title</p>
            <h1 className="md:text-3xl text-[14px]">
              Specific Conditions or Instruction
            </h1>
          </div>
        )}
        {hideMeta == false && ( //hide and show meta data
          <h1 className="md:text-lg font-bold pl-5 pb-2">
            Specific Conditions or Instruction
          </h1>
        )}
      </div>
      <div className="my-10 mx-5">
        <DummyText />
      </div>
    </div>
  );
}

export default homecontent;
