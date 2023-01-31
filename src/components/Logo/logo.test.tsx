import React from 'react';
import { render, screen } from '@testing-library/react';
import Logo from '.';

describe('Logo', () => {
  beforeEach(() => {
    render(<Logo />);
  });

  it('renders logo  with a link', () => {
    const logo = screen.getByTestId('logo');
    expect(logo.getAttribute('href')).toEqual('/');
  });
});

