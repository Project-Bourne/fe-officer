import React from 'react';
import Image from 'next/image';
import { CustomCardModal } from '@/models/ui/components.models';
import Link from 'next/link';

function CustomCard(props: CustomCardModal) {
  const { imgSrc, mainText, subText, url, linkText } = props;

  return (
    <>
      <div className="border mx-auto md:mx-0  border-sirp-dashbordb1 rounded-[1.5rem] bg-sirp-secondary2  h-[13rem] mt-5  p-3">
        <div className="flex flex-row items-center gap-5 pt-5">
          <div>
            <Image
              src={imgSrc}
              alt="documents"
              className="cursor-pointer"
              width={100}
            />
          </div>
          <div>
            <p className="font-bold">{mainText}</p>
            <span className="capitalize font-light text-sirp-grey text-titl">
              {subText}
            </span>
          </div>
        </div>
        <div className="border mt-[2rem] w-[20.5rem] pb-2 pt-2 capitalize  text-center hover:bg-sirp-dashboardcola hover:text-white text-sirp-dashboardcola font-bold rounded-[1rem] border-sirp-dashboardcola">
          <Link href={url}>
            <span>{linkText}</span>
          </Link>
        </div>
      </div>
    </>
  );
}

export default CustomCard;
