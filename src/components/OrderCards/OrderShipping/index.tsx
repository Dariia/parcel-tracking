import React from 'react';
import './orderShipping.scss';
import { OrderCheckpoint } from '../../../types/orders';
import { useOrderDataContext } from "../../../contexts/OrderDataContext";
import { jsonDateToString } from "../../../utils/date/jsonDateToString";
import OrderShippingProgress from "./orderShippingProgress";

const OrderShipping: React.FC = () => {
  const { checkpoints = [] } = useOrderDataContext().orderData || {};

  return (
    <>
      <h2 className="parcel_sub-title px-4" data-testid="order-card-title">
        Shipping Updates
      </h2>
      <OrderShippingProgress/>
      <ul className="parcel_shipping-items px-4">
        { checkpoints.map((item: OrderCheckpoint) => (
          <li className="mt-3"
              key={item.event_timestamp}
              data-testid="order-shipping-checkpoint"
          >
            <ol className="parcel_shipping-item">
              <li data-testid="order-checkpoint-detail"
                  className="parcel_label">
                { item.status }
              </li>
              <li data-testid="order-checkpoint-detail">{ item.status_details }</li>
              <li className="parcel_shipping-card-details">
                <span data-testid="order-checkpoint-detail">{ item.city }</span>
                <span data-testid="order-checkpoint-detail">{ jsonDateToString(item.event_timestamp) }</span>
              </li>
            </ol>
          </li>))
        }
      </ul>
    </>
  );
}

export default OrderShipping;
