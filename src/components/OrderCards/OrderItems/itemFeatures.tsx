import React from 'react';
import './orderItems.scss';
import { OrderArticle } from "../../../types/orders";

type ProductFeaturesProps = Omit<Record<keyof OrderArticle, {
  label?: string;
  postfix?: string;
}>, 'articleImageUrl'>

interface Props {
  item: OrderArticle;
}

const ItemFeatures: React.FC<Props> = ({ item }) => {
  const productFeatures: ProductFeaturesProps = {
    articleName: {},
    articleNo: { label: 'Article number: '},
    quantity: { label: 'Qty: '},
    price: { postfix: '€'},
  };

  return (
    <ol className="parcel_order-item--features" data-testid="order-item-features">
      { Object.entries(productFeatures).map(([ key, value ]) => {
        const itemText = item[key as keyof OrderArticle] || '';
        return (
          <li
            className={`parcel_order-item--${key}`}
            key={key}
            data-testid="order-card-item-feature"
          >
            {value.label || ''}{itemText}{value.postfix || ''}
          </li>)
      })}
    </ol>)
}

export default ItemFeatures;
