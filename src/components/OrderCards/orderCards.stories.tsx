import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import OrderCards from '.';
import orderMock from "../../mocks/orders.json";
import {OrderDataContext} from "../../contexts/OrderDataContext";
import { Order } from "../../types/orders";

export default {
  title: 'Components/Views/OrderCards',
  component: OrderCards,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof OrderCards>;

const orderDataMock = {
  checkpoints: orderMock[0]['checkpoints'],
  articles: orderMock[0].delivery_info.articles
} as Order;

const Template: ComponentStory<typeof OrderCards> = (args) =>
  <OrderDataContext.Provider value={{ orderData: orderDataMock, setOrderData: () => {} }}>
    <OrderCards {...args} />
  </OrderDataContext.Provider>;
export const OrderCardsComponent = Template.bind({});
