import React from 'react';
import './orderShipping.scss';
import { ProgressBar } from "react-bootstrap";
import { useOrderDataContext } from "../../../contexts/OrderDataContext";
import {OrderStatus} from "../../../types/orders";

const orderStatusToProgressMapping = {
  [OrderStatus.registered]: '30',
  [OrderStatus.inTransit]: '50',
  [OrderStatus.newDeliveryDate]: '80',
  [OrderStatus.failedDelivery]: '70',
  [OrderStatus.ready]: '90',
  [OrderStatus.delivered]: '100',
};

const OrderShippingProgress: React.FC = () => {
  const { checkpoints = [] } = useOrderDataContext().orderData || {};
  const progressFromStatus = parseInt(orderStatusToProgressMapping[checkpoints[0]?.status]);

  return (
    <div className="parcel_shipping-progress-bar px-4" data-testid="order-shipping-progressbar">
      <ProgressBar now={progressFromStatus} role="progressbar" aria-label="progress bar"/>
      <p className="parcel_shipping-progress-bar-text pt-2">
        <span>Processed</span>
        <span>Delivered</span>
      </p>
    </div>)
}

export default OrderShippingProgress;
