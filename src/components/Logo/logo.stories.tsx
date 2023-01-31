import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Logo from '.';

export default {
  title: 'Components/Elements/Logo',
  component: Logo,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Logo>;

const Template: ComponentStory<typeof Logo> = (args) => <Logo {...args} />;
export const LogoComponent = Template.bind({});
