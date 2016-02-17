const reactKey = 0;
const Select = ({label, placeholder, errorText = 'Ouille', value, options, onChange}) => {
  const inLabel = label ? label : `${placeholder} :`;
  const inError = errorText !== null;
  const labeledOptions = typeof options[0] === 'object' ?
    options : options.map(o => {
      return { label: o, value: o };
    });
  console.log('labeledOptions', labeledOptions);
  return (
    <div className={classNames('formGroup', {'error': inError})}>
      {
        inLabel ? <label htmlFor={`reactKey_${reactKey}`}>{inLabel}</label> : ''
      }
      <ReactSelect
        id={`reactKey_${reactKey}`}
        placeholder={placeholder}
        clearable={false}
        options={labeledOptions}
        value={value}
        onChange={onChange}
      />
      {
        errorText ? <span className='errorText animated shake'>{errorText}</span> : ''
      }
    </div>
  );
};

MainApp.Views.Select = Select;
