'use client';
import React, { useEffect } from 'react';
import { Drawer } from '@material-tailwind/react';
import { NavbarContent } from './navbar-content';
import { useSelector, useDispatch } from 'react-redux';

import { AiOutlineClose } from 'react-icons/ai';
import { RootState } from '@/redux/store';
import { updateControl } from '@/redux/features/controlsSlice';

export function MobileSidebar() {
  const dispatch = useDispatch();
  const controls = useSelector((state: RootState) => state.controls.values);
  const [open, setOpen] = React.useState(false);

  const closeDrawer = () => {
    dispatch(updateControl({ adminLeftSidebar: false }));
  };

  useEffect(() => {
    setOpen(controls.adminLeftSidebar);
  }, [controls]);

  return (

      <Drawer open={open} onClose={closeDrawer} className="p-4 absolute">
        <div onClick={closeDrawer} className="flex justify-end cursor-pointer">
          <AiOutlineClose className="inline-block w-5 h-5 mr-2" />
        </div>
        <NavbarContent />
      </Drawer>
  );
}
