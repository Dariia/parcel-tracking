import React from 'react';
import {render, screen, within} from '@testing-library/react';
import OrderCards from '.';
import * as OrderContext from '../../contexts/OrderDataContext';
import orderMock from '../../mocks/orders.json';
import { Router } from "react-router-dom";
import { getMockHistory } from "../../utils/testing";

jest.mock('../../contexts/OrderDataContext');

const orderDataMock = {
  checkpoints: orderMock[2].checkpoints,
  articles: orderMock[2].delivery_info.articles
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
      expect(items.length).toEqual(4);
    });

    it.each`
      element             |  index    |  text
      ${ 'status' }       |  ${ 0 } |  ${'Failed delivery attempt'}
      ${ 'status text' }  |  ${ 1 } |  ${'Unfortunately, the goods could not be delivered. The goods are beeing forwarded to a pick-up location.'}
      ${ 'city' }         |  ${ 2 } |  ${'Munich'}
      ${ 'time' }         |  ${ 3 } |  ${'07.01.2023, 12:30'}
  `('renders checkpoint $element detail', ({ index, text }) => {
      const checkpoint = screen.getAllByTestId('order-shipping-checkpoint')[1];
      const detail = within(checkpoint).getAllByTestId('order-checkpoint-detail')[index];
      expect(detail.innerHTML).toEqual(text);
    });
  });

  describe('Delivery card', () => {
    it.each`
      element                 |  selector                          |  text
      ${ 'delivery status' }  |  ${ 'order-card-delivery-status' } |  ${'The goods will be ready for collection on the next working day.'}
      ${ 'pickup address' }   |  ${ 'order-delivery-map-address' } |  ${'Kurfürstenplatz 8, 80796 München'}
      ${ 'directions link' }  |  ${ 'order-delivery-map-link' }    |  ${'Get Directions'}
  `('card $element has text', ({ selector, text }) => {
      expect(screen.getByTestId(selector).innerHTML).toEqual(text);
    });

    it.each`
      attribute    |  value
      ${ 'alt' }   |  ${'pickup map'}
      ${ 'src' }   |  ${'https://raw.githubusercontent.com/parcelLab/challenge-frontend-engineer/main/map.png'}
  `('renders map image with $attribute', ({ attribute, value }) => {
      const image = screen.getByTestId('order-delivery-map-image');
      expect(image.getAttribute(attribute)).toEqual(value);
    });

    it.each`
      attribute     |  value
      ${ 'target' } |  ${'_blank'}
      ${ 'href' }   |  ${'https://www.google.com/maps/place/Deutsche+Post+Filiale+426/@48.1601323,11.5732987,17z/data=!4m13!1m7!3m6!1s0x479e75c476d43137:0x170cb26ab86665fd!2sKurf%C3%BCrstenpl.+8,+80796+M%C3%BCnchen!3b1!8m2!3d48.1601287!4d11.5754874!3m4!1s0x479e7500ee0b5685:0xedf77ddb0bfe2602!8m2!3d48.1601164!4d11.5753654'}
  `('renders map link with $attribute', ({ attribute, value }) => {
      const image = screen.getByTestId('order-delivery-map-link');
      expect(image.getAttribute(attribute)).toEqual(value);
    });
  });

  describe('Articles card', () => {
    it('renders articles', () => {
      const items = screen.getAllByTestId('order-card-item');
      expect(items.length).toEqual(1);
    });

    it.each`
      attribute    |  value
      ${ 'alt' }   |  ${'Macbook Pro M2 Max 16inch'}
      ${ 'src' }   |  ${'https://images.unsplash.com/photo-1639249227523-78502e9bb8b7'}
  `('renders article image with $attribute', ({ attribute, value }) => {
      const image = screen.getAllByTestId('order-card-item-image')[0];
      expect(image.getAttribute(attribute)).toEqual(value);
    });

    it.each`
      element             |  index    |  text
      ${ 'articleName' }  |  ${ 0 } |  ${'Macbook Pro M2 Max 16inch'}
      ${ 'articleNo' }    |  ${ 1 } |  ${'Article number: AB30M216'}
      ${ 'quantity' }     |  ${ 2 } |  ${'Qty: 1'}
      ${ 'price' }        |  ${ 3 } |  ${'4199€'}
  `('renders article $element feature', ({ index, text }) => {
      const item = screen.getAllByTestId('order-card-item')[0];
      const feature = within(item).getAllByTestId('order-card-item-feature')[index];
      expect(feature.innerHTML).toEqual(text);
    });
  });
});

