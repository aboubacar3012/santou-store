import React from 'react'
import { generate50Products } from '@/docs/generateProduct';
import ProductListComponent from './product-list';

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
    }[];
  }
}

const ProductByCategory = () => {
  const products = generate50Products();
  

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
          });
        }
      });
    });
    return Object.values(productsByCategory)
  }
 
  

const groupedProducts = groupProductsByCategory(products);

  return (
    <>
      {groupedProducts.map((group: any) => (
        <div key={group.category}>
          <ProductListComponent products={group.products} category={group.category} />
        </div>
      ))}
    </>
  )
}

export default ProductByCategory;
