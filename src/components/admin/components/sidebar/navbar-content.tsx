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
    const screens = {
      showDashBoardScreen: false,
      showOrdersScreen: false,
      showSummariesScreen: false,
      showArticleFormScreen: false,
      showRestaurantFormScreen: false,
      showSettingsScreen: false,
      showHistoriesScreen: false,
      ...param, // Remplace les valeurs définies dans param
    };
  
    dispatch(updateControl({ ...screens, adminLeftSidebar: false }));
  };

  return (
    <div className="flex flex-col">
      <List>
        <ListItem onClick={() => handleSelect({ showDashBoardScreen: true })}>
          <ListItemPrefix>
            <AiOutlineDashboard className="inline-block w-5 h-5 mr-2" />
          </ListItemPrefix>
          Dashboard
        </ListItem>
        <ListItem onClick={() => handleSelect({ showOrdersScreen: true })}>
          <ListItemPrefix>
            <BsCart4 className="inline-block w-5 h-5 mr-2" />
          </ListItemPrefix>
          Commandes
        </ListItem>
        <ListItem onClick={() => handleSelect({ showSummariesScreen: true })}>
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
              <ListItem onClick={() => handleSelect({ showRestaurantFormScreen: true })}>
                <ListItemPrefix>
                  <BsChevronRight className="inline-block w-5 h-5 mr-2" />
                </ListItemPrefix>
                Restaurant
              </ListItem>
              <ListItem onClick={() => handleSelect({ showArticleFormScreen: true })}>
                <ListItemPrefix>
                  <BsChevronRight className="inline-block w-5 h-5 mr-2" />
                </ListItemPrefix>
                Article
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>

        <ListItem onClick={() => handleSelect({ showSettingsScreen: true })}>
          <ListItemPrefix>
            <FaUserCog className="inline-block w-5 h-5 mr-2" />
          </ListItemPrefix>
          Mes Infos
        </ListItem>
        <ListItem onClick={() => handleSelect({ showHistoriesScreen: true })}>
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
