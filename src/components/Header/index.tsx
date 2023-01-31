import React from 'react';
import Logo from '../Logo';
import './header.scss';
import { Button } from "react-bootstrap";
import { useOrderDataContext } from "../../contexts/OrderDataContext";
import { useHistory } from "react-router-dom";
import { ReactComponent as LockIcon } from './images/locked.svg';

const Header: React.FC = () => {
  const { setOrderData } = useOrderDataContext();
  const history = useHistory();
  const handleSignOut = () => {
    setOrderData(null);
    history.push('/');
  };

  return (
    <header className="parcel_header py-3 mb-3" data-testid="header">
      <Logo className="parcel_header-logo"/>
      <div className="parcel_header-button-wrapper">
        <Button
          aria-label="sign out"
          className="parcel_header-button"
          type="button"
          onClick={handleSignOut}
          data-testid="header-sign-out-button"
        >
          <LockIcon className="parcel_header-button-svg"/>
          <span data-testid="header-sign-out-button-text">sign out</span>
        </Button>
      </div>
    </header>
  );
}

export default Header;
