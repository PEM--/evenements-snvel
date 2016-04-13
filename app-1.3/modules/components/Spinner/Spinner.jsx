import React from 'react';
import classNames from 'classnames';

const { Views } = MainApp;

const Spinner = ({className, style}) => (
  <div
    className={classNames('SpinnerContainer', 'animated', 'fadeIn', className)}
    style={style}
  >
    <div className='Spinner' />
  </div>
);

Views.Spinner = Spinner;
