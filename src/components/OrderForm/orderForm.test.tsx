import React from 'react';
import { render, screen, within, fireEvent, act , waitFor} from '@testing-library/react';
import OrderForm from '.';
import * as apiClient from "../../api";
import * as OrderContext from '../../contexts/OrderDataContext';
import { Router } from "react-router-dom";
import { getMockHistory } from "../../utils/testing";
import { OrderDataContext } from "../../contexts/OrderDataContext";
import { OrderFormDataProps } from "./OrderTrackingForm/orderTrackingForm";

jest.mock('../../api', );
jest.mock('../../contexts/OrderDataContext');

const fillAndSubmitForm = ({ code, zip }: OrderFormDataProps) => {
  const form = screen.getByTestId('order-form');
  const zipInput = within(screen.getByTestId('order-form-zip-field')).getByTestId('form-input');
  const codeInput = within(screen.getByTestId('order-form-code-field')).getByTestId('form-input');

  act(() => {
    fireEvent.change(zipInput, { target: { value: zip } });
    fireEvent.change(codeInput, { target: { value: code } });
    fireEvent.submit(form);
  });
}

describe('Order Form', () => {
  const historyMock = getMockHistory();
  const setOrderMock = jest.fn();

  beforeEach(() => {
    OrderContext['useOrderDataContext'] = () => ({ orderData: null, setOrderData: setOrderMock });
    render(
      <OrderDataContext.Provider value={{ orderData: null, setOrderData: setOrderMock }}>
        <Router history={historyMock}>
          <OrderForm/>
        </Router>
      </OrderDataContext.Provider>)
  });

  describe('View', () => {
    it.each`
    element            |  selector                  |  expectedText
    ${ 'title' }       |  ${ 'order-form-title' }   | ${ 'Track your order' }
    ${ 'button' }      |  ${ 'order-form-button' }  | ${ 'Track' }
    ${ 'legend text' } |  ${ 'order-form-text' }    | ${ 'Enter your order number and zip code combination to see the order details and shipping updates' }
    `('have $element with text', ({ selector, expectedText }) => {
      expect(screen.getByTestId(selector)).toHaveTextContent(expectedText);
    });

    it.each`
    element      |  selector
    ${ 'form' }  |  ${ 'order-form' }
    ${ 'logo' }  |  ${ 'logo' }
  `('renders $element', ({ selector }) => {
      expect(screen.getByTestId(selector)).toBeInTheDocument();
    });
  });

  describe('Form', () => {
    it.each`
    element      |  selector                     |  labelText
    ${ 'zip' }   |  ${ 'order-form-zip-field' }  |  ${'Zip Code'}
    ${ 'code' }  |  ${ 'order-form-code-field' } |  ${'Order Number'}
  `('renders $field with label', ({ selector, labelText }) => {
      const field = screen.getByTestId(selector);
      const label = within(field).getByTestId('form-label');
      const input = within(field).getByTestId('form-input');
      expect(label.innerHTML).toEqual(labelText);
      expect(input.getAttribute('type')).toEqual('text');
    });
  });

  it('calls order fetch on valid form submit', async () => {
    apiClient.orderApi.fetchOrder = jest.fn().mockResolvedValue({ test: 'test data' });
    fillAndSubmitForm({ code: 'AB66666', zip: '55555' });

    await waitFor(() => {
      expect(apiClient.orderApi.fetchOrder).toBeCalledWith({"code": "AB66666", "zip": "55555"});
    });
  });

  it('sets order to context on valid form submit', async () => {
    const testData = { test: 'test data' };
    apiClient.orderApi.fetchOrder = jest.fn().mockResolvedValue(testData);
    fillAndSubmitForm({ code: 'AB66666', zip: '55555' });

    await waitFor(() => {
      expect(setOrderMock).toHaveBeenCalledWith(testData);
    });
  });

  it('shows notification on failed order fetch', async() => {
    apiClient.orderApi.fetchOrder = jest.fn().mockRejectedValue(new Error());
    fillAndSubmitForm({ code: 'AB66666', zip: '33888' });

    await waitFor(() => {
      const notification = screen.getByTestId('order-form-code-notification');
      expect(notification.innerHTML).toEqual('Your order was not found. Please check if entered data is correct.');
    });
  });

  it('sets order context value to null on failed order fetch', async() => {
    apiClient.orderApi.fetchOrder = jest.fn().mockRejectedValue(new Error());
    fillAndSubmitForm({ code: 'AB66666', zip: '33888' });

    await waitFor(() => {
      expect(setOrderMock).toHaveBeenCalledWith(null);
    });
  });

  it('shows notification on inValid form data submit', () => {
    fillAndSubmitForm({ code: 'AB66666', zip: '33' });
    const notification = screen.getByTestId('order-form-code-notification');
    expect(notification.innerHTML).toEqual('All fields should be filled with valid data.');
  });
})

