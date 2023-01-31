import React from 'react';
import logo from './images/logo.png';
import './logo.scss';

interface Props {
  className?: string;
}

const Logo: React.FC<Props> = ({ className }) => {
  return (
    <a href="/" title="Parcel Company" className={className} data-testid="logo">
      <img src={logo} width="50" height="50" alt="Parcel Company Logo" className="parcel_logo"/>
    </a>
  );
}

export default Logo;
