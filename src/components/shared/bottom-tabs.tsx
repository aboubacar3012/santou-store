import { updateControl } from '@/redux/features/controlsSlice';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/router';
import React from 'react'
import { AiOutlineHistory } from 'react-icons/ai';
import { BiHomeAlt2, BiUserCircle } from 'react-icons/bi';
import { BsBookmarks } from 'react-icons/bs';
import { GiShoppingCart } from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux';

const BottomTabs = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);
  return (
    <div className="container fixed bottom-0  p-3   flex items-center justify-between   bg-gray-900 shadow-3xl text-gray-400 cursor-pointer">
    <div className="flex flex-col items-center transition ease-in duration-200 hover:text-blue-400 ">
      <button
        onClick={() => router.push("/screens/home-screen")}
        type="button"
        className="inline-flex flex-col items-center justify-center group"
      >
        <BiHomeAlt2 className="h-6 w-6" />
        <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
          Accueil
        </span>
      </button>
    </div>
    <div className="flex flex-col items-center transition ease-in duration-200 hover:text-blue-400 ">
      <button
        onClick={() => router.push("/screens/orders-screen")}
        type="button"
        className="inline-flex flex-col items-center justify-center group"
      >
        <AiOutlineHistory className="h-6 w-6" />
        <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
          Commandes
        </span>
      </button>
    </div>
    <div
      // onClick={() => router.push("/screens/cart-screen")}
      onClick={() => dispatch(updateControl({ showCart: true }))}
      className="flex flex-col items-center  hover:text-blue-400 "
    >
      <div className="absolute bottom-9 shadow-2xl text-center flex items-center justify-center rounded-full border-4 text-3xl border-gray-50 hover:border-blue-500 bg-blue-500 w-16 h-16 p-2 text-white transition ease-in duration-500 ">
        <div className="flex flex-col justify-end items-center">
          {cart.products.length > 0 && (
            <span className="-mb-3 text-red-500 text-xl">
              {cart.products.length}
            </span>
          )}
          <GiShoppingCart className="w-8 h-8" />
        </div>
        {
          cart.products.length > 0 && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full border-4 opacity-50" />
          )
        }
      </div>
    </div>
    <div className="flex flex-col items-center transition ease-in duration-200 hover:text-blue-400 ">
      <button
        onClick={() => router.push("/screens/favorites-screen")}
        type="button"
        className="inline-flex flex-col items-center justify-center group"
      >
        <BsBookmarks className="h-6 w-6" />
        <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
          Favoris
        </span>
      </button>
    </div>
    {/* <div className="flex flex-col items-center transition ease-in duration-200 hover:text-blue-400 ">
      <button
        onClick={() => router.push("/screens/favorites-screen")}
        type="button"
        className="inline-flex flex-col items-center justify-center group"
      >
        <GoRocket className="h-6 w-6" />
        <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
          Missions
        </span>
      </button>
      </div> */}
    <div className="flex flex-col items-center transition ease-in duration-200 hover:text-blue-400 ">
      <button
        onClick={() => router.push("/screens/profile-screen")}
        type="button"
        className="inline-flex flex-col items-center justify-center group"
      >
        <BiUserCircle className="h-6 w-6" />
        <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
          Mon Profil
        </span>
      </button>
    </div>
  </div>
  )
}

export default BottomTabs
