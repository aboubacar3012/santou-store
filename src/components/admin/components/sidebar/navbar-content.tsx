'use client';
import { useState } from 'react';
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from '@material-tailwind/react';
import { AiOutlineDashboard, AiOutlineHistory } from 'react-icons/ai';
import { BsCart4 } from 'react-icons/bs';
import { LiaFileInvoiceSolid } from 'react-icons/lia';
import { FaUserCog } from 'react-icons/fa';
import { MdAddShoppingCart } from 'react-icons/md';
import { IoIosArrowDropdown } from 'react-icons/io';
import { BsChevronRight } from 'react-icons/bs';
import LogoutBtn from './logout-btn';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { updateControl } from '@/redux/features/controlsSlice';


export function NavbarContent() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(0);
  const controls = useSelector((state: RootState) => state.controls.values);

  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value);
  };

  const handleSelect = (param: any) => {
    dispatch(updateControl(param));
  };

  return (
    <div className="flex flex-col">
      <List>
        <ListItem onClick={() => handleSelect({ dashboardScreen: true })}>
          <ListItemPrefix>
            <AiOutlineDashboard className="inline-block w-5 h-5 mr-2" />
          </ListItemPrefix>
          Dashboard
        </ListItem>
        <ListItem onClick={() => handleSelect({ ordersScreen: true })}>
          <ListItemPrefix>
            <BsCart4 className="inline-block w-5 h-5 mr-2" />
          </ListItemPrefix>
          Commandes
        </ListItem>
        <ListItem onClick={() => handleSelect({ summaryScreen: true })}>
          <ListItemPrefix>
            <LiaFileInvoiceSolid className="inline-block w-5 h-5 mr-2" />
          </ListItemPrefix>
          Récapitulatif
        </ListItem>
        <Accordion
          open={open === 1}
          icon={<IoIosArrowDropdown className="inline-block w-5 h-5 ml-2" />}
        >
          <ListItem className="p-0" selected={open === 1}>
            <AccordionHeader
              onClick={() => handleOpen(1)}
              className="border-b-0 p-3"
            >
              <ListItemPrefix>
                <MdAddShoppingCart className="inline-block w-5 h-5 mr-2" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Nouveau
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="pl-5">
              <ListItem onClick={() => handleSelect({ articleScreen: true })}>
                <ListItemPrefix>
                  <BsChevronRight className="inline-block w-5 h-5 mr-2" />
                </ListItemPrefix>
                Nouvel article
              </ListItem>
              <ListItem onClick={() => handleSelect({ formulaScreen: true })}>
                <ListItemPrefix>
                  <BsChevronRight className="inline-block w-5 h-5 mr-2" />
                </ListItemPrefix>
                Nouvelle formule
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>

        <ListItem onClick={() => handleSelect({ profileScreen: true })}>
          <ListItemPrefix>
            <FaUserCog className="inline-block w-5 h-5 mr-2" />
          </ListItemPrefix>
          Mes Infos
        </ListItem>
        <ListItem onClick={() => handleSelect({ historyScreen: true })}>
          <ListItemPrefix>
            <AiOutlineHistory className="inline-block w-5 h-5 mr-2" />
          </ListItemPrefix>
          Historique
        </ListItem>
      </List>
      <LogoutBtn />
    </div>
  );
}
