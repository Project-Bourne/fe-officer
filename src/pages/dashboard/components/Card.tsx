import React from 'react';
import CustomCard from '@/components/ui/CustomCard';
import Data from './data';

function Card() {
  return Data.map((item, index) => (
    <div key={index}>
        <CustomCard
          imgSrc={item.imgSrc}
          mainText={item.mainText}
          subText={item.subText}
          url={item.url}
          linkText={item.linkText}
        />
    </div>
  ));
}

export default Card;
