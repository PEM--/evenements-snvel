import React from 'react';

let checkId = 0;

const CheckBox = ({id = null, name = null, children, isChecked, onChange}) => {
  const innerId = id ? id : `checkbox${checkId++}`;
  return (
    <div refs={innerId}>
      <input id={innerId} type='checkbox' checked={isChecked} name={name} onChange={onChange} />
      <label htmlFor={innerId}>{children ? children : ' '}</label>
    </div>
  );
};

MainApp.Views.CheckBox = CheckBox;
