import React from 'react';
import './orderDelivery.scss';
import { useOrderDataContext } from "../../../contexts/OrderDataContext";

const OrderDelivery: React.FC = () => {
  const { checkpoints = [] } = useOrderDataContext().orderData || {};

  const {
    status_details: statusText = '',
    meta: { pickup_address: addressText = '',
      pickup_address_link = '',
      pickup_address_map_url = ''
    } = {}
  } = checkpoints[0] || {};

  return (
    <>
      <h1 className="parcel_title m-0 px-4" data-testid="order-card-title">
        Ready for collection
      </h1>
      <p className="parcel_title--smaller my-4 px-4"  data-testid="order-card-delivery-status">
        { statusText }
      </p>
      { pickup_address_map_url && (
         <div className="parcel_delivery-map">
           <figure aria-label="pickup map">
             <img
               data-testid="order-delivery-map-image"
               className="parcel_delivery-map-image"
               src={pickup_address_map_url}
               alt="pickup map"
               width="611"
               height="377"
             />
           </figure>
           <p data-testid="order-delivery-map-address"
             className="parcel_delivery-map-address"
           >
             { addressText }
           </p>
         </div>
      )}
      { addressText && (
         <a href={pickup_address_link}
            title="Get Directions"
            target="_blank"
            rel="noreferrer"
            aria-label="get directions in google map"
            className="btn btn-primary parcel_button-primary parcel_delivery-button"
            data-testid="order-delivery-map-link"
         >
           Get Directions
         </a>
      )}
    </>
  );
}

export default OrderDelivery;
