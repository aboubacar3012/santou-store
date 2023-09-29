import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { GiShoppingCart } from "react-icons/gi";

const OrdersScreenPage = () => {
  const data = [
    {
      label: "Dashboard",
      value: "dashboard",
      // icon: Square3Stack3DIcon,
      desc: `It really matters and then like it really doesn't matter.
      What matters is the people who are sparked by it. And the people
      who are like offended by it, it doesn't matter.`,
    },
    {
      label: "Profile",
      value: "profile",
      // icon: UserCircleIcon,
      desc: `Because it's about motivating the doers. Because I'm here
      to follow my dreams and inspire other people to follow their dreams, too.`,
    },
  ];
  return (
    <div className="mt-8">
      <Tabs value="dashboard">
        <TabsHeader
          className="bg-transparent"
          indicatorProps={{
            className: "bg-gray-900/10 shadow-none !text-gray-900",
          }}
        >
          {data.map(({ label, value }) => (
            <Tab key={value} value={value}>
              <div className="flex items-center gap-2">
                <GiShoppingCart className="h-6 w-6" />
                {label}
              </div>
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {data.map(({ value, desc }) => (
            <TabPanel key={value} value={value}>
              {desc}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
};

export default OrdersScreenPage;
