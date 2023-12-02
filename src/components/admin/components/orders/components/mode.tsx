'use client';
import React, { useState } from 'react';
import { Badge, Button, Tab, Tabs, TabsHeader } from '@material-tailwind/react';
import { MdDeliveryDining } from 'react-icons/md';
import { SlBag } from 'react-icons/sl';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import isMobileDevice from '@/hooks/isMobileDevice';

export const Mode = () => {
  // const mode = useSelector((state: RootState) => state.filter.mode);
  const isMobile = isMobileDevice();
  const dispatch = useDispatch();

  const handleSelect = (param: any) => {
    // dispatch(updateFilter(param));
  };

  return (
    <div className="md:w-[32rem] w-screen justify-center px-4">
      <Tabs value={"del"}>
        <TabsHeader>
          <Tab
            onClick={() => handleSelect({ mode: 'del' })}
            key={'del'}
            value={'del'}
          >
            <Badge content="5" withBorder placement="top-end">
              <div className="flex items-center gap-4 m-2 ">
                {!isMobile && <MdDeliveryDining />}
                {'Livraison'}
              </div>
            </Badge>
          </Tab>
          <Tab
            onClick={() => handleSelect({ mode: 'cc' })}
            key={'cc'}
            value={'cc'}
          >
            <Badge content="5" withBorder placement="top-end">
              <div className="flex items-center gap-2 m-2">
                {!isMobile && <SlBag />}
                {'Emporter'}
              </div>
            </Badge>
          </Tab>
        </TabsHeader>
      </Tabs>
    </div>
  );
};
