import React, { useState } from 'react';
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Card,
  Switch,
} from '@material-tailwind/react';
import Image from 'next/image';
import { HiOutlineMenuAlt1 } from 'react-icons/hi';
import BurgerButton from './burger-button';
import isMobileDevice from '@/hooks/isMobileDevice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Link from 'next/link';

export function HeaderNavbar() {
  const [openNav, setOpenNav] = useState(false);
  // const availabity = useSelector(
  //   (state: RootState) => state.filter.availability,
  // );
  const isMobile = isMobileDevice();
  const dispatch = useDispatch();

  const handleAvailability = (param: any) => {
    // dispatch(updateFilter(param));
  };

  return (
    <Navbar className=" top-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4">
      <div className="flex items-center justify-between text-blue-gray-900">
        <div className="flex justify-start items-center">
          {isMobile ? <BurgerButton /> : null}
          <Link href="/" className="flex items-center justify-between mr-4">
            {/* <Image
              className="w-8 h-8 mr-2"
              src="/afrograille-logo/afrograille.svg"
              alt="logo"
              width={500}
              height={500}
            /> */}
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              AfroGraille
            </span>
          </Link>
        </div>
        <div>
          <Typography
            as="a"
            href="#"
            className="hidden md:flex mr-4 cursor-pointer py-1.5 font-medium"
          >
            AfroGraille Administration
          </Typography>
        </div>
        <div className="flex">
          <Switch
            label="Disponible"
            // checked={availabity === 'online'}
            onChange={() =>
              // handleAvailability({
              //   availability: availabity === 'online' ? 'offline' : 'online',
              // })
              {}
            }
            color="blue"
            checked={true}
            crossOrigin={undefined}
          />
        </div>
      </div>
    </Navbar>
  );
}
