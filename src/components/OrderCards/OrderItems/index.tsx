import React from 'react';
import './orderItems.scss';
import { useOrderDataContext } from "../../../contexts/OrderDataContext";
import placeholder from "./images/product-placeholder.png";
import { OrderArticle } from "../../../types/orders";
import ItemFeatures from "./itemFeatures";

const OrderItems: React.FC = () => {
  const { articles } = useOrderDataContext().orderData || {};

  return (
    <>
      <h2 className="parcel_sub-title px-4"  data-testid="order-card-title">
        Articles
      </h2>
      <ul className="parcel_order-items px-4">
        { articles?.map((item: OrderArticle) => (
          <li key={item.articleNo} className="parcel_order-item mb-4"  data-testid="order-card-item">
            <figure aria-label={item.articleName}>
              <img
                 className="parcel_order-item--image"
                 data-testid="order-card-item-image"
                 width="65"
                 height="65"
                 src={ item.articleImageUrl || placeholder }
                 alt={item.articleName}
              />
            </figure>
            <ItemFeatures item={item} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default OrderItems;
