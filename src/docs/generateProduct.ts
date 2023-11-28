import { CategoryType } from "@/types/category.type";
import { ProductStatusEnum, ProductType } from "@/types/product.type";

const images = [
  "https://image.spreadshirtmedia.net/image-server/v1/products/T20A2PA5098PT17X18Y0D194716222W31051H27790/views/1,width=120,height=120,appearanceId=2,backgroundColor=F2F2F2,modelId=5627,crop=detail/guinee-sweat-a-capuche-premium-homme.jpg",
  "https://www.cdiscount.com/pdt2/2/4/6/1/700x700/mp07403246/rw/t-shirt-art-de-la-carte-mondiale-de-la-guinee-hom.jpg",
  "https://mms.businesswire.com/media/20230104005594/fr/1676572/23/The_new_brand_identity_of_Republic_of_Guinea_photo_AETOSWire.jpg",
  "https://scontent-cdg4-2.xx.fbcdn.net/v/t39.30808-6/363818064_237522925865432_3454659898275996310_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5614bc&_nc_ohc=YsavBL8GjuIAX8kTRKB&_nc_ht=scontent-cdg4-2.xx&oh=00_AfC3WXNL6NtGVgETQxMWq-KtyUaW5k6_SEs_Mg7TGWIqwQ&oe=652AA791",
  "https://scontent-cdg4-1.xx.fbcdn.net/v/t39.30808-6/363815110_237202262564165_5831518902546123988_n.jpg?stp=cp6_dst-jpg&_nc_cat=108&ccb=1-7&_nc_sid=5614bc&_nc_ohc=Mkv83Tca3NMAX_bfz_H&_nc_ht=scontent-cdg4-1.xx&oh=00_AfBn5MS_7lJ68Klv96t3fpNtcPqc3pF_GqWyi15veJ0KLg&oe=652AA440",
  "https://scontent-cdg4-3.xx.fbcdn.net/v/t39.30808-6/355072294_212918301659228_8172774393976939771_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=5614bc&_nc_ohc=sPIS-eHkIkQAX_G3Qct&_nc_ht=scontent-cdg4-3.xx&oh=00_AfA9E2cnPmHChNomKczozJpUyZSVWvxPn9YTaKJCx88ozQ&oe=652AE43A",
  "https://olwina.com/images/detailed/8/WhatsApp_Image_2022-10-12_at_11.02.12_PM__1_.jpeg",
  "https://saheliya.com/wp-content/uploads/2021/07/maxi_kimono_manches_evasees_bleus_marron_chiffon_soie_duster1-scaled.jpg",
  "https://img.over-blog-kiwi.com/0/95/90/05/20160218/ob_9bc4bc_p1080546.JPG",
  "https://www.banabaana.com/upload/photos/2019/06/11/21/24/2863imd7v4.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWid7VCl1se9qFxy-_KYM1gbITodc7neVUrTKE4FzkCvs1IlXDWV7ERQDhygLYW8snH1E&usqp=CAU",
];
const generateProduct = (productId: number) => {
  // const productName = `Product ${productId}`;
  // const productCategories: CategoryType[] = [
  //   {
  //     id: "cat123",
  //     name: "Category 1",
  //     // description: "Category 1 description",
  //     createdAt: "",
  //     updatedAt: "",
  //   },
  //   {
  //     id: "cat456",
  //     name: "Category 2",
  //     // description: "Category 2 description",
  //     createdAt: "",
  //     updatedAt: "",
  //   },
  //   {
  //     id: "cat789",
  //     name: "Category 3",
  //     // description: "Category 3 description",
  //     createdAt: "",
  //     updatedAt: "",
  //   },
  // ];
  // const productDescription = `Description for Product ${productId}`;
  // const productPrice = Math.floor(Math.random() * 1000); // Random price between 0 and 1000
  // const productDiscount = Math.floor(Math.random() * 50); // Random discount between 0 and 50
  // const productStock = Math.floor(Math.random() * 100); // Random stock between 0 and 100
  // const productStatus =
  //   Math.random() < 0.5 ? ProductStatusEnum.ACTIVE : ProductStatusEnum.INACTIVE; // Randomly set to active or inactive
  // const productImages = [
  //   images[Math.floor(Math.random() * images.length)],
  //   images[Math.floor(Math.random() * images.length)],
  //   images[Math.floor(Math.random() * images.length)],
  // ];
  // const productCreatedAt = new Date().toISOString();
  // const productUpdatedAt = new Date().toISOString();

  // return {
  //   id: productId.toString(),
  //   name: productName,
  //   category: productCategories,
  //   description: productDescription,
  //   price: productPrice,
  //   discount: productDiscount,
  //   stock: productStock,
  //   status: productStatus,
  //   images: productImages,
  //   createdAt: productCreatedAt,
  //   updatedAt: productUpdatedAt,
  // };
};

export const generate50Products = () => {
  // const products: ProductType[] = [];
  // for (let i = 1; i <= 50; i++) {
  //   const product = generateProduct(i);
  //   products.push(product);
  // }
  // return products;
};
