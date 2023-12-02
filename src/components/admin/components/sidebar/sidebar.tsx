'use client';
import React from 'react';
import { Card } from '@material-tailwind/react';

import { NavbarContent } from './navbar-content';

export function DesktopSidebar() {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <Card className="h-[48rem] rounded-none w-full max-w-[18rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <NavbarContent />
    </Card>
  );
}
