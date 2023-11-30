import React, { useEffect, useState } from 'react'
import { generate50Products } from '@/docs/generateProduct';
import ProductListComponent from './product-list';
import { getProducts } from '@/services/products';
import { useQuery } from '@tanstack/react-query';
import { ProductType } from '@/types/product.type';
import { OptionType } from '@/types/option.type';
import { useDispatch, useSelector } from 'react-redux';
import { updateControl } from '@/redux/features/controlsSlice';

interface ProductByCategory {
  [categoryId: string]: {
    category: string;
    products: {
      id: string;
      name: string;
      description: string;
      price: number;
      images: string[];
      discount: number;
      stock: number;
      status: string;
      options:OptionType[]
    }[];
  }
}

const ProductByCategory = () => {
  const { data, isLoading, isFetching, error, isError } = useQuery({
    queryKey: ["products"], // une clé simple car on récupère tous les todos
    queryFn: getProducts, // la fonction qui va retourner les données
    refetchInterval: 1000 * 60 * 1, // rafraîchir les données toutes les minutes
    refetchOnWindowFocus: true, // rafraîchir la requête quand on focus la fenêtre
    refetchOnMount: true, // rafraîchir la requête au montage du composant
    retry: false, // ne pas réessayer la requête en cas d'erreur
    staleTime: 1000 * 60 * 5, // la requête est considérée comme périmée après 5 minutes
  });
  const categoryToShow = useSelector((state:any) => state.filter.category);

  const dispatch = useDispatch();

  useEffect(() => {
    if(isLoading && isFetching) dispatch(updateControl({spinner: true}));
    else dispatch(updateControl({spinner: false}));

  }, [isLoading, isFetching]);

  if (isLoading && isFetching) return <div>Chargement...</div>;
  if (isError) return <div>Erreur lors du chargement des produits</div>;

  if (data.products.length === 0) return <div>Aucun produit</div>;
  

  const groupProductsByCategory = (products: any) => {
    const productsByCategory:ProductByCategory = {};
    products.forEach((product:any) => {
      product.category.forEach((category:any) => {
        const categoryId = category.id;
        const categoryName = category.name;
    
        if (categoryId) {
          if (!productsByCategory[categoryId]) {
            productsByCategory[categoryId] = {
              category: categoryName,
              products: []
            };
          }
          productsByCategory[categoryId].products.push({
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            images: product.images,
            discount: product.discount,
            stock: product.stock,
            status: product.status,
            options: product?.options ?? []
          });
        }
      });
    });
    return Object.values(productsByCategory)
  }

 
const groupedProducts = groupProductsByCategory(data.products);

const groupedProductsToShowByFilter = groupedProducts.filter((group:any) => group.category.toLowerCase() === categoryToShow || categoryToShow === "all");


  return (
    <div>
      {groupedProductsToShowByFilter && groupedProductsToShowByFilter.map((group: any) => (
        <div key={group.category}>
          <ProductListComponent products={group.products} category={group.category} />
        </div>
      ))}
    </div>
  )
}

export default ProductByCategory;
