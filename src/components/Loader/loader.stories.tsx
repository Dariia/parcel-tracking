import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Loader from '.';

export default {
  title: 'Components/Elements/Loader',
  component: Loader,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Loader>;

const Template: ComponentStory<typeof Loader> = (args) => <Loader {...args} />;
export const LoaderComponent = Template.bind({});
LoaderComponent.args = {
  isShow: true,
};
