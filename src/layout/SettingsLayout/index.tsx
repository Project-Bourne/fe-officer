import TabComp  from "../../pages/settings/components/TabComp/index";
import React, { ReactNode } from "react";
import { useRouter } from "next/router";

type LayoutType = {
  children: ReactNode;
};

const SettingsLayout = ({ children, showTitle, data }: any) => {
  const route = useRouter().pathname;
  return (
    <div className="w-full h-full">
      {/* Header */}
      {showTitle === false ? (
        ""
      ) : (
        <div className="flex flex-row w-full py-7 px-7 items-center justify-between">
          <h1 className="text-[18px] font-semibold">Profile Settings</h1>
        </div>
      )}

      {/* Settings tabs */}
      <div className="w-[100%] flex flex-row items-center border-b overscroll-y-auto-">
        {data?.map((item, index) => (
          <div className="w-[20%]" key={item.id}>
            <TabComp item={item} index={index} key={index} route={route} />
          </div>
        ))}
      </div>
      {children}
    </div>
  );
};

export default SettingsLayout;
