import React from 'react';
import './orderCard.scss';
import { Card, Col } from "react-bootstrap";

const OrderCard: React.FC = ({ children }) => {
  return (
    <Col lg="4" className="pt-0 px-4 pb-4 parcel_form-card p-lg-3">
      <article>
        <Card className="pt-4 pb-4 parcel_order-card" data-testid="order-card">
          { children }
        </Card>
      </article>
    </Col>
  );
}

export default OrderCard;
