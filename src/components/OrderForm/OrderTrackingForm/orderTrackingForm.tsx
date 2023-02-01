import React, { useState, createRef, useEffect } from 'react';
import '../orderForm.scss';
import { useHistory } from 'react-router-dom';
import { Button, Form, Alert } from "react-bootstrap";
import InputField from "../../InputField";
import { collectFormData, FormDataType, isValidZipCode } from "../../../utils/form";
import { useOrderDataContext } from "../../../contexts/OrderDataContext";
import { HttpStatusCode } from "../../../types/api";
import { AxiosError } from "axios";
import { Order } from "../../../types/orders";
import useFetch from "../../../hooks/useFetch";

export interface OrderFormDataProps {
  zip: string;
  code: string;
}

export interface Props {
  setIsLoading: (isShow: boolean) => void;
}

const OrderTrackingForm: React.FC<Props> = ({ setIsLoading }) => {
  const history = useHistory();
  const { setOrderData } = useOrderDataContext();
  const formRef = createRef<HTMLFormElement>();
  const [ errorNotification, setErrorNotification ] = useState<string | null>(null);
  const { isLoading, error, fetchedData, fetchOrder } = useFetch();

  const isValidForm = (collectedFormData: FormDataType): boolean => {
    const { zip, code } = collectedFormData;
    const isValid = code !== '' && isValidZipCode(zip.toString());
    return isValid;
  };

  const handleFormChange = () => {
    setErrorNotification(null);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const collectedFormData = collectFormData(formRef);
    const isValid = isValidForm(collectedFormData);

    isValid
      ? fetchOrder({
        zip: collectedFormData.zip.toString() || '',
        code: collectedFormData.code.toString() || ''
      })
      : setErrorNotification('All fields should be filled with valid data.');
  };

  useEffect(() => {
    if (!error) {
      setErrorNotification(null);
      return;
    }

    let errorMessage;
    if(((error as AxiosError)?.response?.status || 0) < HttpStatusCode.ServerError) {
      errorMessage = 'Your order was not found. Please check if entered data is correct.'
    } else {
      errorMessage = 'Error appeared on our side. Please try later or connect our service support team.'
    }
    setErrorNotification(errorMessage);
  }, [ error ]);


  useEffect(() => {
    setOrderData(fetchedData as Order);
    fetchedData && history.push('/order');
  }, [ fetchedData, history, setOrderData ]);

  useEffect(() => {
    setIsLoading(isLoading);
  }, [ isLoading, setIsLoading ]);

  return (
    <Form ref={formRef} onSubmit={handleFormSubmit} onChange={handleFormChange} data-testid="order-form">
      <legend className="parcel_details-title pb-3" data-testid="order-form-text">
        Enter your order number and zip code combination
        to see the order details and shipping updates
      </legend>
      <InputField className="pb-3" labelText="Order Number" id="code" dataTestId="order-form-code-field"/>
      <InputField className="pb-3" labelText="Zip Code" id="zip" dataTestId="order-form-zip-field"/>
      <Alert variant="danger"
        data-testid="order-form-code-notification"
        children={errorNotification}
        show={Boolean(errorNotification)}
      />
      <div className="p2-3 parcel_form-button-wrapper pt-3">
        <Button
          data-testid="order-form-button"
          className="parcel_button-primary"
          type="submit"
          aria-label="track order"
          disabled={Boolean(errorNotification)}
        >
          Track
        </Button>
      </div>
    </Form>
  );
}

export default OrderTrackingForm;
