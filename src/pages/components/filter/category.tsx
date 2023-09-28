const CategoryFilterComponent = () => {
  return <div>
    <h4 className="font-semibold mt-1">Categories</h4>
          <div className="flex items-center justify-between overflow-y-scroll text-gray-500 cursor-pointer space-x-3">
            <div className="flex flex-col items-center justify-center px-3  bg-green-200 rounded-2xl text-orange-600 shadow hover:shadow-md cursor-pointer mb-2 p-1 bg-white transition ease-in duration-300">
              <p className="text-sm mt-1">Nourriture</p>
            </div>
            <div className="flex flex-col items-center justify-center px-3  bg-green-200 rounded-2xl text-green-600 shadow hover:shadow-md cursor-pointer mb-2 p-1 bg-white transition ease-in duration-300">
              <p className="text-sm mt-1">Accessoires</p>
            </div>
            <div className="flex flex-col items-center justify-center px-3  bg-red-200 rounded-2xl text-red-600 shadow hover:shadow-md cursor-pointer mb-2 p-1 bg-white transition ease-in duration-300">
              <p className="text-sm mt-1">Vetements</p>
            </div>
            <div className="flex flex-col items-center justify-center px-3  bg-blue-200 rounded-2xl text-blue-600 shadow hover:shadow-md cursor-pointer mb-2 p-1 bg-white transition ease-in duration-300">
              <p className="text-sm mt-1">Chaussures</p>
            </div>
            <div className="flex flex-col items-center justify-center px-3  bg-yellow-200 rounded-2xl text-yellow-600 shadow hover:shadow-md cursor-pointer mb-2 p-1 bg-white transition ease-in duration-300">
              <p className="text-sm mt-1">Sacs</p>
            </div>
            <div className="flex flex-col items-center justify-center px-3  bg-purple-200 rounded-2xl text-purple-600 shadow hover:shadow-md cursor-pointer mb-2 p-1 bg-white transition ease-in duration-300">
              <p className="text-sm mt-1">Autres</p>
            </div>
          </div>
  </div>;
};

export default CategoryFilterComponent;
