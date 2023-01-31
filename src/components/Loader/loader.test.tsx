import React from 'react';
import { render, screen } from '@testing-library/react';
import Loader from '.';

describe('Loader', () => {
  it('renders loader if isShow', () => {
    render(<Loader isShow={true}/>);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('does not render loader if isShow', () => {
    render(<Loader isShow={false}/>);
    expect(() => screen.getByTestId('loader'))
      .toThrow('Unable to find an element');
  });
});

