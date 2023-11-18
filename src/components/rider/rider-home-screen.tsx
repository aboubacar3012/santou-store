import { Switch } from "@material-tailwind/react";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineRight } from "react-icons/ai";
import { BiMapPin } from "react-icons/bi";

const RiderHomeComponent = () => {
  const router = useRouter();
  return (
    <div className="mt-5">
      <Switch crossOrigin={false} label="Disponibilité" />
      <section className="text-gray-700 body-font">
        <div className="container px-2 py-5 mx-auto">
          <div className="flex flex-wrap  text-center">
            <div className="p-2 w-1/2  ">
              <div className="border-2 border-gray-600 px-2 py-4 rounded-lg transform transition duration-500 hover:scale-110">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  className="text-indigo-500 w-12 h-12 mb-3 inline-block"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 17l4 4 4-4m-4-5v9" />
                  <path d="M20.88 18.09A5 5 0 0018 9h-1.26A8 8 0 103 16.29" />
                </svg>
                <h2 className="title-font font-medium text-3xl text-gray-900">
                  2.7K
                </h2>
                <p className="leading-relaxed">Downloads</p>
              </div>
            </div>
            <div className="p-2 w-1/2  ">
              <div className="border-2 border-gray-600 px-2 py-4 rounded-lg transform transition duration-500 hover:scale-110">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  className="text-indigo-500 w-12 h-12 mb-3 inline-block"
                  viewBox="0 0 24 24"
                >
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx={9} cy={7} r={4} />
                  <path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75" />
                </svg>
                <h2 className="title-font font-medium text-3xl text-gray-900">
                  1.3K
                </h2>
                <p className="leading-relaxed">Users</p>
              </div>
            </div>
            <div className="p-2 w-1/2  ">
              <div className="border-2 border-gray-600 px-2 py-4 rounded-lg transform transition duration-500 hover:scale-110">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  className="text-indigo-500 w-12 h-12 mb-3 inline-block"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 18v-6a9 9 0 0118 0v6" />
                  <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z" />
                </svg>
                <h2 className="title-font font-medium text-3xl text-gray-900">
                  74
                </h2>
                <p className="leading-relaxed">Files</p>
              </div>
            </div>
            <div className="p-2 w-1/2  ">
              <div className="border-2 border-gray-600 px-2 py-4 rounded-lg transform transition duration-500 hover:scale-110">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  className="text-indigo-500 w-12 h-12 mb-3 inline-block"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <h2 className="title-font font-medium text-3xl text-gray-900">
                  46
                </h2>
                <p className="leading-relaxed">Places</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-2xl mx-auto bg-indigo-600 shadow-lg rounded-lg">
        <div className="px-3 py-2">
          <div className="flex items-center items-start justify-center">
            {/* Icon */}
            <BiMapPin  className="text-white h-10 w-10 m-2" />
            {/* Card content */}
            <div className="flex-grow truncate">
              {/* Card header */}
              <div className="w-full sm:flex justify-between items-center ">
                {/* Title */}
                <p className="text-md leading-snug font-extrabold text-gray-50 truncate sm:mb-0">
                  5 missions a moins de 10km
                </p>
                <h3>fdakfjlsdfjlasf</h3>
              </div>
            </div>
            <button
                type="button"
                onClick={() => router.push("/screens/favorites-screen")}
                className="flex-shrink-0 flex items-center justify-center text-indigo-600 w-8 h-8 rounded-full bg-gradient-to-b from-indigo-50 to-indigo-100 hover:from-white hover:to-indigo-50 focus:outline-none focus-visible:from-white focus-visible:to-white transition duration-150 ml-2"
              >
                <AiOutlineRight className="w-5 h-5" />
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiderHomeComponent;
