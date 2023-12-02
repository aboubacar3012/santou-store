import React from 'react';
import { Button, Input } from '@material-tailwind/react';
import isMobileDevice from '@/hooks/isMobileDevice';
export const SearchInput = () => {
  const isMobile = isMobileDevice()
  return (
    <div className="py-3">
      <div className="relative flex w-full gap-2 md:w-max">
        <Input
          crossOrigin={undefined}
          type="search"
          label="Rechercher ici ..."
          className="pr-20"
          containerProps={{
            className: 'md:w-[32rem] w-screen justify-center text-sm',
          }}
        />
        <Button size="sm" className="!absolute right-1 top-1 rounded ">
          Rechercher
        </Button>
      </div>
    </div>
  );
};
