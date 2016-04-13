import React from 'react';

let mainReactKey = 0;

const Radio = ({label, options, value, onChange}) => {
  mainReactKey++;
  const interceptor = (e) => onChange(e.target.value);
  const labeledOptions = typeof options[0] === 'object' ?
    options : options.map(o => {
      return { label: o, value: o };
    });
  return (
    <div>
      {
        label ? <label htmlFor={`radio_${mainReactKey}`}>{label}</label> : ''
      }
      {
        options.map((o, idx) => (
          <div key={idx}>
            <input
              id={`radio_${mainReactKey}_${idx}`}
              type='radio' name={`radio_${mainReactKey}`}
              value={o.value}
              checked={o.value === value}
              onChange={interceptor}
            />
            <label htmlFor={`radio_${mainReactKey}_${idx++}`}>{o.label}</label>
          </div>
        ))
      }
    </div>
  );
};

MainApp.Views.Radio = Radio;
