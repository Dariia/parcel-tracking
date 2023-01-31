import React from 'react';
import './orderCards.scss';
import { Row } from "react-bootstrap";
import OrderShipping from "./OrderShipping";
import OrderItems from "./OrderItems";
import OrderDelivery from "./OrderDelivery";
import OrderCard from "./OrderCard";

const OrderCards: React.FC = () => {
  return (
    <section>
      <Row className="parcel_order-cards" data-testid="order-cards-view">
        { [ <OrderDelivery/>,
            <OrderShipping/>,
            <OrderItems/>
          ].map((item, index) =>
            <OrderCard children={item} key={`order-card-${index}`}/>
          )
        }
      </Row>
    </section>
  );
}

export default OrderCards;
