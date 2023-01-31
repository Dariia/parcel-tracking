import React, { useState, createRef } from 'react';
import '../orderForm.scss';
import { useHistory } from 'react-router-dom';
import { Button, Form, Alert } from "react-bootstrap";
import InputField from "../../InputField";
import { orderApi } from "../../../api";
import { collectFormData, FormDataType, isValidZipCode } from "../../../utils/form";
import { useOrderDataContext } from "../../../contexts/OrderDataContext";
import { HttpStatusCode } from "../../../types/api";
import { AxiosError } from "axios";

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

  const isValidForm = (collectedFormData: FormDataType): boolean => {
    const { zip, code } = collectedFormData;
    const isValid = code !== '' && isValidZipCode(zip.toString());
    return isValid;
  };

  const fetchOrder = async (collectedFormData: FormDataType) => {
    setIsLoading(true);

    try {
      const data = await orderApi.fetchOrder({
        zip: collectedFormData.zip.toString() || '',
        code: collectedFormData.code.toString() || ''
      });
      setIsLoading(false);
      setOrderData(data);
      history.push(`/order`);
    } catch (error) {
      let errorMessage;
      if(((error as AxiosError)?.response?.status || 0) < HttpStatusCode.ServerError) {
        errorMessage = 'Your order was not found. Please check if entered data is correct.'
      } else {
        errorMessage = 'Error appeared on our side. Please try later or connect our service support team.'
      }
      setErrorNotification(errorMessage);
      setIsLoading(false);
      setOrderData(null);
    }
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const collectedFormData = collectFormData(formRef);
    const isValid = isValidForm(collectedFormData);

    isValid
      ? fetchOrder(collectedFormData)
      : setErrorNotification('All fields should be filled with valid data.');
  };

  const handleFormChange = () => {
    setErrorNotification(null);
  };

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
