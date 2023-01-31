import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import OrderForm from '.';

export default {
  title: 'Components/Views/OrderForm',
  component: OrderForm,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof OrderForm>;

const Template: ComponentStory<typeof OrderForm> = (args) => <OrderForm {...args} />;
export const OrderFormComponent = Template.bind({});
