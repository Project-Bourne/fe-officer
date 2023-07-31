import { HomeData } from '@/utils/constants';
import React, { ReactNode, useState } from 'react';

type LayoutType = {
    children: ReactNode;
};

const HomeLayout = ({ children }: LayoutType) => {

    return (
        <div className="w-full h-full">
                
            {children}
        </div>
    );
};

export default HomeLayout;
