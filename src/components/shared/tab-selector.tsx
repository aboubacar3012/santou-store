import React, { useState } from "react";

type TabSelectorProps = {
  tab1: string;
  tab2: string;
  handleClickTab1: () => void;
  handleClickTab2: () => void;
};

const TabSelector = ({
  tab1,
  tab2,
  handleClickTab1,
  handleClickTab2,
}: TabSelectorProps) => {
  const [selectedTab, setSelectedTab] = useState(1);
  const selectedTabStyle = "bg-blue-600 text-white ";
  const unselectedTabStyle =
    "text-blue-600  transition-colors duration-300 focus:outline-none hover:bg-blue-600 hover:text-white";

  return (
    <div className="flex mt-3 items-center justify-center z-50">
      <div className="flex items-center justify-center space-x-2 p-1 border border-blue-600 dark:border-blue-400 rounded-xl">
        <button
          onClick={() => {
            setSelectedTab(1);
            handleClickTab1();
          }}
          className={`px-4 py-2 text-sm font-medium    rounded-xl ${
            selectedTab === 1 ? selectedTabStyle : unselectedTabStyle
          }`}
        >
          {tab1}
        </button>
        <button
          onClick={() => {
            setSelectedTab(2);
            handleClickTab2();
          }}
          className={`px-4 py-2 text-sm font-medium    rounded-xl ${
            selectedTab === 2 ? selectedTabStyle : unselectedTabStyle
          } `}
        >
          {tab2}
        </button>
      </div>
    </div>
  );
};

export default TabSelector;
