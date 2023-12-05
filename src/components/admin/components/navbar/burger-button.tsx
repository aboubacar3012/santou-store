// import { updateControl } from '@/src/redux/features/controls/controlsSlice';
// import { RootState } from '@/src/redux/store';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HiOutlineMenuAlt1 } from 'react-icons/hi';
import { updateControl } from '@/redux/features/controlsSlice';

const BurgerButton = () => {
  const dispatch = useDispatch();

  const openDrawer = () => {
    dispatch(updateControl({ adminLeftSidebar: true }));
  };

  return (
    <div className="cursor-pointer" onClick={openDrawer}>
      <HiOutlineMenuAlt1 className="text-2xl mr-3 text-blue-gray-900 dark:text-white" />
    </div>
  );
};

export default BurgerButton;
