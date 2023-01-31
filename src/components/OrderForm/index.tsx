import React, { useState } from 'react';
import './orderForm.scss';
import { Card, Row, Col } from 'react-bootstrap';
import Logo from '../Logo';
import OrderTrackingForm from "./OrderTrackingForm/orderTrackingForm";
import Loader from "../Loader";

const OrderForm: React.FC = () => {
  const [ showLoader, setShowLoader ] = useState<boolean>(false);

  return (
    <Row className="flex align-items-center parcel_form my-auto"  data-testid="order-form-view">
      <Col md="6" lg="4" className="mx-auto">
        <section>
          <Logo className="parcel_form-image"/>
          <Card className="pt-5 px-4 pb-4 parcel_form-card">
            <h1 className="parcel_sub-title" data-testid="order-form-title">Track your order</h1>
            <OrderTrackingForm setIsLoading={setShowLoader}/>
            <Loader isShow={showLoader}/>
          </Card>
        </section>
      </Col>
    </Row>
  );
}

export default OrderForm;
