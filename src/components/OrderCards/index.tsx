import React from 'react';
import './orderCards.scss';
import { Row } from "react-bootstrap";
import OrderShipping from "./OrderShipping";
import OrderItems from "./OrderItems";
import OrderDelivery from "./OrderDelivery";
import OrderCard from "./OrderCard";
import PageAnimation from "../PageAnimation";

const OrderCards: React.FC = () => {
  return (
    <PageAnimation>
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
    </PageAnimation>
  );
}

export default OrderCards;
