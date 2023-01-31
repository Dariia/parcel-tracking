import React from 'react';
import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import App from '.';
import orderMock from '../../mocks/orders.json';
import { Router } from "react-router-dom";
import { getMockHistory } from "../../utils/testing";
import * as apiClient from "../../api";

jest.mock('../../api', );

const orderDataMock = {
  checkpoints: orderMock[1].checkpoints,
  articles: orderMock[1].delivery_info.articles
};

const historyMock = getMockHistory();

const fillFormFieldsAndSubmit = () =>{
  const form = screen.getByTestId('order-form');
  const zipInput = within(screen.getByTestId('order-form-zip-field')).getByTestId('form-input');
  const codeInput = within(screen.getByTestId('order-form-code-field')).getByTestId('form-input');

  act(() => {
    fireEvent.change(zipInput, { target: { value: '55555' } });
    fireEvent.change(codeInput, { target: { value: 'AB66666' } });
    fireEvent.submit(form);
  });
}

describe('App',() => {
  describe('Order form view', () => {
    beforeEach(() => {
      render(<Router history={historyMock}><App/></Router>);
    });

    it('renders form', () => {
      const formView = screen.getByTestId('order-form-view');
      expect(formView).toBeInTheDocument();
    });

    it.each`
      element          |  selector
      ${'header'}      |  ${'header'}
      ${'cards view'}  |  ${'order-cards-view'}
    `('not renders $element', ({selector}) => {
      expect(() => screen.getByTestId(selector))
        .toThrow('Unable to find an element');
    });
  });

  describe('Order cards view', () => {
    beforeEach(() => {
      apiClient.orderApi.fetchOrder = jest.fn().mockResolvedValue(orderDataMock);
      render(<Router history={historyMock}><App/></Router>);
    });

    it.each`
      element          |  selector
      ${'header'}      |  ${'header'}
      ${'cards view'}  |  ${'order-cards-view'}
    `('renders $element', async ({selector}) => {
      fillFormFieldsAndSubmit();
      await waitFor(() => {
        expect(screen.getByTestId(selector)).toBeInTheDocument();
      });
    });

    it('not renders form view', async () => {
      fillFormFieldsAndSubmit();
      await waitFor(() => {
        expect(() => screen.getByTestId('order-form-view'))
          .toThrow('Unable to find an element');
      });
    });
  });
});