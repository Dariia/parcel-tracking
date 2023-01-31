import React from 'react';
import {render, screen, within} from '@testing-library/react';
import OrderCards from '.';
import * as OrderContext from '../../contexts/OrderDataContext';
import orderMock from '../../mocks/orders.json';
import { Router } from "react-router-dom";
import { getMockHistory } from "../../utils/testing";

jest.mock('../../contexts/OrderDataContext');

const orderDataMock = {
  checkpoints: orderMock[1].checkpoints,
  articles: orderMock[1].delivery_info.articles
};

OrderContext['useOrderDataContext'] = () => ({ orderData: orderDataMock, setOrderData: jest.fn() });

const historyMock = getMockHistory();

describe('Order cards',() => {
  beforeEach(() => {
    render(<Router history={historyMock}><OrderCards /></Router>);
  });

  it('renders cards', () => {
    const cards = screen.getAllByTestId('order-card');
    expect(cards.length).toEqual(3);
  });

  it.each`
    element          |  index    |  text
    ${ 'delivery' }  |  ${ 0 } |  ${'Ready for collection'}
    ${ 'shipping' }  |  ${ 1 } |  ${'Shipping Updates'}
    ${ 'articles' }  |  ${ 2 } |  ${'Articles'}
  `('card $element has title', ({ index, text }) => {
    const title = screen.getAllByTestId('order-card-title')[index];
    expect(title.innerHTML).toEqual(text);
  });

  describe('Shipping card', () => {
    it('renders progressbar', () => {
      const progressBar = screen.getByTestId('order-shipping-progressbar');
      expect(progressBar).toBeInTheDocument();
    });

    it('renders checkpoints', () => {
      const items = screen.getAllByTestId('order-shipping-checkpoint');
      expect(items.length).toEqual(2);
    });

    it.each`
      element             |  index    |  text
      ${ 'status' }       |  ${ 0 } |  ${'Registered'}
      ${ 'status text' }  |  ${ 1 } |  ${'Your package was registered in our system by the sender.'}
      ${ 'city' }         |  ${ 2 } |  ${'Knoxville'}
      ${ 'time' }         |  ${ 3 } |  ${'20.01.2023, 10:30'}
  `('renders checkpoint $element detail', ({ index, text }) => {
      const checkpoint = screen.getAllByTestId('order-shipping-checkpoint')[1];
      const detail = within(checkpoint).getAllByTestId('order-checkpoint-detail')[index];
      expect(detail.innerHTML).toEqual(text);
    });
  });

  describe('Delivery card', () => {
    it.each`
      element          |  index    |  text
      ${ 'delivery' }  |  ${ 0 } |  ${'Ready for collection'}
      ${ 'shipping' }  |  ${ 1 } |  ${'Shipping Updates'}
      ${ 'articles' }  |  ${ 2 } |  ${'Articles'}
  `('card $element has title', ({ index, text }) => {
      const title = screen.getAllByTestId('order-card-title')[index];
      expect(title.innerHTML).toEqual(text);
    });
  });

  describe('Articles card', () => {
    it('renders articles', () => {
      const items = screen.getAllByTestId('order-card-item');
      expect(items.length).toEqual(2);
    });

    it.each`
      attribute    |  value
      ${ 'alt' }   |  ${'Magsafe Charger for Apple iPhone'}
      ${ 'src' }   |  ${'https://images.unsplash.com/photo-1615526675159-e248c3021d3f'}
  `('renders article image with $attribute', ({ attribute, value }) => {
      const image = screen.getAllByTestId('order-card-item-image')[1];
      expect(image.getAttribute(attribute)).toEqual(value);
    });

    it.each`
      element             |  index    |  text
      ${ 'articleName' }  |  ${ 0 } |  ${'Magsafe Charger for Apple iPhone'}
      ${ 'articleNo' }    |  ${ 1 } |  ${'Article number: AB20129'}
      ${ 'quantity' }     |  ${ 2 } |  ${'Qty: 1'}
      ${ 'price' }        |  ${ 3 } |  ${'49€'}
  `('renders article $element feature', ({ index, text }) => {
      const item = screen.getAllByTestId('order-card-item')[1];
      const feature = within(item).getAllByTestId('order-card-item-feature')[index];
      expect(feature.innerHTML).toEqual(text);
    });
  });
});

