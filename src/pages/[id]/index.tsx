import product from "@/components/product/product";
import { CategoryType } from "@/types/category.type";
import { IconButton, Typography } from "@material-tailwind/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosHeartEmpty } from "react-icons/io";
import { CiShare2 } from "react-icons/ci";
import useVerticalScroll from "@/hooks/useVerticalScroll";
import { FaPhoneAlt } from "react-icons/fa";
import { sharePage } from "@/utils/sharePage";
import { MdUpload } from "react-icons/md";
import Image from "next/image";
import ProductByCategory from "@/components/product/product-by-categorie";

const categoriesMocks = [
  {
    name: "Menus",
    ordre: 1,
    createdAt: "2023-11-18T19:22:28.366Z",
    updatedAt: "2023-11-18T19:22:28.366Z",
    id: "65590f13180c7228d1f8de14",
  },
  {
    name: "Burgers",
    ordre: 1,
    createdAt: "2023-11-18T19:22:28.366Z",
    updatedAt: "2023-11-18T19:22:28.366Z",
    id: "65590f13180c7228d1f8de14",
  },
  {
    name: "Sandwichs",
    ordre: 1,
    createdAt: "2023-11-18T19:22:28.366Z",
    updatedAt: "2023-11-18T19:22:28.366Z",
    id: "65590f13180c7228d1f8de14",
  },
  {
    name: "Salades",
    ordre: 1,
    createdAt: "2023-11-18T19:22:28.366Z",
    updatedAt: "2023-11-18T19:22:28.366Z",
    id: "65590f13180c7228d1f8de14",
  },
  {
    name: "Desserts",
    ordre: 1,
    createdAt: "2023-11-18T19:22:28.366Z",
    updatedAt: "2023-11-18T19:22:28.366Z",
    id: "65590f13180c7228d1f8de14",
  },
  {
    name: "Boissons",
    ordre: 1,
    createdAt: "2023-11-18T19:22:28.366Z",
    updatedAt: "2023-11-18T19:22:28.366Z",
    id: "65590f13180c7228d1f8de14",
  },
];
const colors = ["green", "red", "blue", "yellow", "purple", "orange"];

const RestaurantPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const router = useRouter();

  const scrollPosition = useVerticalScroll((isScrollingUp) => {
    if (isScrollingUp) {
      // Faire quelque chose lors du scroll vers le haut
      // console.log('Scrolling up');
    } else {
      // Faire quelque chose lors du scroll vers le bas
      // console.log('Scrolling down');
    }
  });

  const handleCategoryClick = (category: any) => {
    setSelectedCategory(category);
    // console.log({ category });
  };
  return (
    <div className="relative">
      {/* <div
        className={`flex items-center justify-between bg-gray-100 p-2 ${
          scrollPosition > 0 && "fixed top-0 left-0 right-0"
        }`}
      >
        <IconButton
          variant="text"
          color="blue-gray"
          className="bg-blue-100 rounded-2xl"
          onClick={() => {
            // handleShow();
          }}
        >
          <IoIosArrowBack className="h-5 w-5" />
        </IconButton>
        <IconButton
          variant="text"
          color="blue-gray"
          className="bg-blue-100 rounded-2xl"
          onClick={() => {
            handleShow();
          }}
        >
          <IoIosHeartEmpty className="h-5 w-5" />
          <CiShare2
            onClick={() =>
              sharePage(
                "Titre personnalisé",
                "Description personnalisée",
                "http://localhost:3000/afrograille?mode=onsite"
              )
            }
            className="h-5 w-5"
          />
        </IconButton>
      </div> */}
      <div className="flex items-center justify-center">
        {/* {product.images.length === 1 && ( */}
        {/* <Image
            src="https://images.unsplash.com/photo-1612837017391-4b6b7b0b0b0a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvcHBpbmd8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
            width={window.innerWidth}
            height={window.innerHeight - window.innerHeight / 3}
            alt={product.name}
            className="w-full h-80"
          /> */}
        <img
          src="https://kelianfood.com/wp-content/uploads/2022/02/IMG_1261.jpg"
          alt=""
          className="w-full h-60"
        />
        {/* )} */}
        {/* {product.images.length > 1 && (
            <Carousel className="rounded-xl">
              {product.images.map((image, index) => (
                <Image key={index} src={product.images[index]} width={window.innerWidth} height={200} alt={product.name} />
              ))}
            </Carousel>
          )} */}
      </div>
      {/* Restaurant Logo */}
      <div className="relative">
        <div className="flex justify-end items-center w-full bg-green-500 py-1 mb-1 px-1">
          <p className="text-semibold text-white font-sm text-center py-1 pr-3">
            Ouvert jusqu&apos;à 19h
          </p>
        </div>
        <img
          src="https://scontent.fcdg2-1.fna.fbcdn.net/v/t39.30808-6/262316544_4837364566359886_4698046591459546328_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=dd5e9f&_nc_ohc=8BFEsRWm610AX8jGmui&_nc_ht=scontent.fcdg2-1.fna&oh=00_AfAnz1avAjJBhYanXbQzQKw4cVqGedkyV2mgF5k6pn8j4g&oe=657E9B00"
          alt=""
          className="absolute top-2/3 left-5 transform -translate-y-2/3 w-24 h-24 rounded-full border-8 border-white"
        />
      </div>
      <div className="p-2">
        {/* Restaurant name */}
        <div className="flex items-center mt-4">
          <h1 className="text-2xl font-bold">AfroGraille</h1>
        </div>
        {/* Pastille */}
        <div className="flex items-center justify-between">
          <p className="text-sm font-sm">Cuisine Africaine</p>
          <p className="bg-blue-300 text-white p-1 rounded-2xl">4.9/5</p>
        </div>
        {/* Ouverture et fermeture */}
        {/* <div className="flex justify-center items-center w-full bg-red-500 py-1 mb-1 px-1 rounded-xl">
          <p className="text-sm text-white font-sm text-center">
            Ce restaurant est indisponible pour le moment
          </p>
        </div>
        <div className="flex justify-center items-center w-full bg-green-500 py-1 mb-1 px-1 rounded-xl">
          <p className="text-sm text-white font-sm text-center">
            Ouvert jusqu&apos;à 19h
          </p>
        </div>
        <div className="flex justify-center items-center w-full bg-blue-500 py-1 mb-1 px-1 rounded-xl">
          <p className="text-sm text-white font-sm text-center">
            Ouvre bienôt à 9h
          </p>
        </div>
        <div className="flex justify-center items-center w-full bg-blue-500 py-1 mb-1 px-1 rounded-xl">
          <p className="text-sm text-white font-sm text-center">
            Ouvre demain à 9h
          </p>
        </div> */}
        <a
          href="tel:+33711223344"
          className="flex justify-center font-sm items-center m-auto p-2 bg-gray-300 rounded-xl my-2"
        >
          <p className="text-sm mr-2">Appeler au</p>
          <FaPhoneAlt className="w-4 h-4 mr-1" />
          <span>+33 123 45 67 89</span>
        </a>
        {/* <div>
          <p>Adresse: 23 rue mathieu stilatti, 13003 Marseille</p>
        </div> */}
        {/* <div>
          <h1>Heure d&apos;ouverture</h1>
          <p>Aujourd&apos;hui : 9h - 12h </p>
          <p>Demain : 9h - 19h </p>
          <p>Voir toutes horaires... </p>
        </div> */}
        {/* Restaurant description */}
        {/* <div className="flex items-center">
          <p className="text-sm font-light">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            voluptatum, voluptates, quos, quas quia doloremque officia
            necessitatibus doloribus quibusdam voluptatem quod.
          </p>
        </div> */}

        {/* Commander a nouveau */}
        {/* <div>
          <p className="text-sm font-semibold">Commander à nouveau</p>
          <hr />
          <div className="flex gap-2 overflow-x-scroll mt-1">
            <div className="border rounded-lg flex flex-col justify-center items-center p-1 min-w-[7rem]">
              <img
                src="https://images.unsplash.com/photo-1512152272829-e3139592d56f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="w-20 h-16 rounded-2xl"
              />
              <hr />
              <p className="font-bold">NUA KAO</p>
              <p className="font-light text-sm">10 000 GNF</p>
              <p className="border px-2 flex justify-center items-center text-green-500 w-full">
                +
              </p>
            </div>
          </div>
        </div> */}

        {/* Categories */}
        <div 
          className={`flex items-center justify-between overflow-y-scroll gap-2  ${
            scrollPosition > 422 &&
            "fixed top-0 left-0 right-0 px-1 py-1 bg-gray-200"
          }`}
        >
          {categoriesMocks &&
            categoriesMocks.map((category: CategoryType, index: number) => (
              <div
                key={index}
                className={`px-3 py-1 my-1 rounded-lg text-gray-900 bg-gray-100 border-gray-100 cursor-pointer ${
                  selectedCategory === category.name.toLowerCase()
                    ? "border border-green-900"
                    : ""
                }`}
                onClick={() => {
                  handleCategoryClick(category.name.toLowerCase());
                  // dispatch(updateCategory(category.name.toLowerCase()));
                }}
                style={{ whiteSpace: "nowrap" }}
              >
                <p className="mt-1 font-semibold text-xl">{category.name}</p>
              </div>
            ))}
        </div>

        {/* Products */}
        <ProductByCategory />
      </div>
    </div>
  );
};

export default RestaurantPage;
