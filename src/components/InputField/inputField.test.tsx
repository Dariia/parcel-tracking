import React from 'react';
import { render, screen } from '@testing-library/react';
import InputField from '.';

describe('InputField', () => {
  beforeEach(() => {
    render(<InputField labelText="labelText" id="testId"/>);
  });

  it('renders label with text', () => {
    const label = screen.getByTestId('form-label');
    expect(label.innerHTML).toEqual('labelText');
  });

  it('renders label for attribute', () => {
    const label = screen.getByTestId('form-label');
    expect(label.getAttribute('for')).toEqual('testId');
  });

  it.each`
    attribute    |  value
    ${ 'id' }    |  ${'testId'}
    ${ 'name' }  |  ${'testId'}
    ${ 'type' }  |  ${'text'}
  `('renders input with $attribute', ({ attribute, value }) => {
    const input = screen.getByTestId('form-input');
    expect(input.getAttribute(attribute)).toEqual(value);
  });
});

