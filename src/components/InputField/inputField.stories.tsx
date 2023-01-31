import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import InputField from '.';

export default {
  title: 'Components/Elements/InputField',
  component: InputField,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof InputField>;

const Template: ComponentStory<typeof InputField> = (args) => <InputField {...args} />;
export const InputFieldComponent = Template.bind({});
InputFieldComponent.args = {
  labelText: 'Label',
  id: 'testId'
};
