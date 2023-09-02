import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

type TabCompType = {
  item: {
    name: string;
    icon?: string;
    id: number;
    route?: string;
    selectedIcon: string;
  };
  index: number;
  route: any;
};

const TabComp = ({ item, index, route }: TabCompType) => {
  const router = useRouter();

  // States
  const [path, setPath] = useState<string>('');
  // Functions
  const updatePath:any = (e: any) => {
    // e.preventDefault();
    const newPath = item.route || '';
    setPath(newPath);
    // console.log(route, path, route, `${path}` == `${route}`, )
    router.push(
      {
        pathname: item.route
      },
      undefined,
      {
        shallow: true
      }
    );
  };

  return (
    <div
      className={
        item.route == router.pathname
          ? 'md:px-8 px-0  pt-3 flex md:flex-row flex-wrap items-center border-b-2 border-sirp-primary pb-3 md:mr-10 mr-0 mb-[-2px] cursor-pointer'
          : 'md:px-8 px-1 pt-3 flex md:flex-row flex-wrap items-center border-b pb-3 md:mr-15 mr-0 mb-[-2px] cursor-pointer text-sirp-grey'
      }
      onClick={updatePath}
    >
      <Image
        src={
          router.pathname == item.route
            ? require(`../../../../../public/icons/${item.selectedIcon}`)
            : require(`../../../../../public/icons/${item.icon}`)
        }
        // item.route.includes(route) ? require(`../../../../assets/icons/on.${item.icon}`) :
        alt="settings tab"
        width={18}
        height={18}
        style={{ marginRight: 15 }}
        priority
      />

      <h2
        className={
          router.pathname == item.route
            ? 'text-[12px] font-semibold text-sirp-primary'
            : 'text-[12px] font-semibold '
        }
      >
        {item.name}
      </h2>
    </div>
  );
};

export default TabComp;
