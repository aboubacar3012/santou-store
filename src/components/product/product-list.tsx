import React, { useEffect, useState } from "react";
import ProductComponent from "./product";
import { generate50Products } from "@/docs/generateProduct";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/services/products";
import { ProductType } from "@/types/product.type";

const productList = generate50Products();
const ProductListComponent = () => {
  const [products, setProducts] = useState([]);
  // Queries
  const { data, isLoading, isFetching, error, isError } = useQuery({
    queryKey: ["products"], // une clé simple car on récupère tous les todos
    queryFn: getProducts, // la fonction qui va retourner les données
    refetchOnWindowFocus: false, // ne pas rafraîchir la requête quand on focus la fenêtre
    retry: false, // ne pas réessayer la requête en cas d'erreur
    staleTime: 1000 * 60 * 5, // la requête est considérée comme périmée après 5 minutes
  });

  useEffect(() => {
    if (data) {
      setProducts(data.products);
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Erreur lors du chargement des produits</div>;

  if (products.length === 0) return <div>Aucun produit</div>;

  if (products && products.length > 0)
    return (
      <div>
        {/* <div className="grid grid-cols-2 gap-2  gap-x-2 overflow-y-scroll scroll-b justify-center items-center w-full "> */}
        {/* <div className="p-3 space-y-4 z-0 h-[36rem]  overflow-y-scroll scroll-b"> */}
        <div className="grid grid-cols-2 gap-2  gap-x-2">
          {products.map((product: ProductType) => (
            <ProductComponent key={product.id} product={product} />
          ))}
          {/* </div> */}
        </div>
      </div>
    );
};

export default ProductListComponent;
