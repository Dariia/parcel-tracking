import React from 'react';
import './loader.scss';

interface Props {
  isShow: boolean;
}

const Loader: React.FC<Props> = ({ isShow }) =>
  isShow ? (
    <div className="parcel-loader-wrapper" data-testid="loader">
      <div className="parcel-loader"/>
    </div>
  ) : null;

export default Loader;
