import React, { useEffect, useState } from 'react'
import { generate50Products } from '@/docs/generateProduct';
import ProductListComponent from './product-list';
import { getProducts } from '@/services/products';
import { useQuery } from '@tanstack/react-query';
import { ProductType } from '@/types/product.type';

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
    }[];
  }
}

const ProductByCategory = () => {
  const { data, isLoading, isFetching, error, isError } = useQuery({
    queryKey: ["products"], // une clé simple car on récupère tous les todos
    queryFn: getProducts, // la fonction qui va retourner les données
    refetchOnWindowFocus: false, // ne pas rafraîchir la requête quand on focus la fenêtre
    retry: false, // ne pas réessayer la requête en cas d'erreur
    staleTime: 1000 * 60 * 5, // la requête est considérée comme périmée après 5 minutes
  });

  if (isLoading && isFetching) return <div>Loading...</div>;
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
            status: product.status
          });
        }
      });
    });
    return Object.values(productsByCategory)
  }

  console.log(data.products)
 

const groupedProducts = groupProductsByCategory(data.products);

console.log(groupedProducts)

  return (
    <div>
      {groupedProducts.map((group: any) => (
        <div key={group.category}>
          <ProductListComponent products={group.products} category={group.category} />
        </div>
      ))}
    </div>
  )
}

export default ProductByCategory;
