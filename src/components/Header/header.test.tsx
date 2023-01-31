import {render, screen, waitFor, within} from '@testing-library/react';
import { Router } from "react-router-dom";
import { getMockHistory } from "../../utils/testing";
import Header from '.';

const historyMock = getMockHistory();

describe('Header', () => {
  beforeEach(() => {
    render(<Router history={historyMock}><Header /></Router>);
  });

  it('renders logo', () => {
    const logo = screen.getByTestId('logo');
    expect(logo).toBeInTheDocument();
  });

  it('renders sign out button with text', () => {
    const button = screen.getByTestId('header-sign-out-button');
    const text = within(button).getByTestId('header-sign-out-button-text');
    expect(text.innerHTML).toEqual('sign out');
  });

  it('sign out on click cleans context', async() => {
    const button = screen.getByTestId('header-sign-out-button');
    button.click();
    await waitFor(() => {
      expect(historyMock.push).toBeCalled();
    });
  });
});
