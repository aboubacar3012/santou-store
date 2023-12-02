import { ProductType } from '@/types/product.type';
import { formatPrice } from '@/utils/formatPrice';
import { truncateText } from '@/utils/truncate-text';
import React from 'react';

type OrderDetailProps = {
  products: ProductType[];
}
const OrderDetail = ({ products }: OrderDetailProps) => {
 
  
  return (
    <div>
     {
      products.map((product, index) => (
        <div key={index} className="mb-3">
          <div className="flex justify-between">
              <p className="font-bold">{product.quantity} X {product.name}</p>
              <p>{formatPrice(product.price)}</p>
          </div>
          <div>
             <div>
              {
                product.options.map((option, index) => (
                  <div key={index}>
                    <p className='ml-7 font-semibold'>{option.name}: </p>
                    <div>
                      {
                        option.values.map((value, index) => (
                          <div key={index} className="flex justify-between">
                            <p className='ml-9 text-sm'>{index+1}. {truncateText(value.name ?? "", 25)}</p>
                            {value.price > 0 && <p className='ml-9 text-sm'>{formatPrice(value.price)}</p>}
                          </div>
                        ))
                      }
                    </div>
                  </div>
                  
                ))
              }
             </div>
          </div>
          {/* <div className="flex justify-between">
              <p className="font-bold">Total</p>
              <p>{formatPrice(product.price * product.quantity)}</p>
              </div> */}
        </div>
      ))
     }
    </div>
  );
};

export default OrderDetail;
