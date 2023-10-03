import { CategoryType } from "@/types/category.type";
import { ProductStatusEnum, ProductType } from "@/types/product.type";

const images = [
  "https://www.junglescout.com/wp-content/uploads/2021/01/product-photo-water-bottle-hero.png",
  "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?cs=srgb&dl=pexels-math-90946.jpg&fm=jpg",
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
  "https://sosav.fr/blog/wp-content/uploads/2019/09/iphone-product-red.jpg",
  "https://www.lezzat.co.uk/wp-content/uploads/2021/03/Amazon-Product-Photography-Agency-UK-1.jpg",
  "https://www.junglescout.com/wp-content/uploads/2021/01/product-photo-water-bottle-hero.png",
  "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?cs=srgb&dl=pexels-math-90946.jpg&fm=jpg",
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
];
const generateProduct = (productId: number): ProductType => {
  const productName = `Product ${productId}`;
  const productCategories: CategoryType[] = [
    {
      id: "cat123",
      name: "Category 1",
      description: "Category 1 description",
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "cat456",
      name: "Category 2",
      description: "Category 2 description",
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "cat789",
      name: "Category 3",
      description: "Category 3 description",
      createdAt: "",
      updatedAt: "",
    },
  ];
  const productDescription = `Description for Product ${productId}`;
  const productPrice = Math.floor(Math.random() * 1000); // Random price between 0 and 1000
  const productDiscount = Math.floor(Math.random() * 50); // Random discount between 0 and 50
  const productStock = Math.floor(Math.random() * 100); // Random stock between 0 and 100
  const productStatus =
    Math.random() < 0.5 ? ProductStatusEnum.ACTIVE : ProductStatusEnum.INACTIVE; // Randomly set to active or inactive
  const productImages = [
    images[Math.floor(Math.random() * images.length)],
    images[Math.floor(Math.random() * images.length)],
    images[Math.floor(Math.random() * images.length)],
  ];
  const productCreatedAt = new Date().toISOString();
  const productUpdatedAt = new Date().toISOString();

  return {
    id: productId.toString(),
    name: productName,
    category: productCategories,
    description: productDescription,
    price: productPrice,
    discount: productDiscount,
    stock: productStock,
    status: productStatus,
    images: productImages,
    createdAt: productCreatedAt,
    updatedAt: productUpdatedAt,
  };
};

export const generate50Products = (): ProductType[] => {
  const products: ProductType[] = [];
  for (let i = 1; i <= 50; i++) {
    const product = generateProduct(i);
    products.push(product);
  }
  return products;
};
