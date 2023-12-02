'use client';
import React, { useEffect } from 'react';
import { Drawer } from '@material-tailwind/react';
import { NavbarContent } from './navbar-content';
import { useSelector, useDispatch } from 'react-redux';

import { AiOutlineClose } from 'react-icons/ai';
import { RootState } from '@/redux/store';

export function MobileSidebar() {
  const dispatch = useDispatch();
  const controls = useSelector((state: RootState) => state.controls.values);
  const [open, setOpen] = React.useState(false);

  const openDrawer = () => {
    // dispatch(updateControl({ leftSidebar: true }));
  };
  const closeDrawer = () => {
    // dispatch(updateControl({ leftSidebar: false }));
  };

  useEffect(() => {
    // setOpen(controls.leftSidebar);
  }, [controls]);

  return (
    <React.Fragment>
      <Drawer open={open} onClose={closeDrawer} className="p-4 absolute">
        <div onClick={closeDrawer} className="flex justify-end cursor-pointer">
          <AiOutlineClose className="inline-block w-5 h-5 mr-2" />
        </div>
        <NavbarContent />
      </Drawer>
    </React.Fragment>
  );
}
