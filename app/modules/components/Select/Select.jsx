const reactKey = 0;
const Select = ({label, placeholder, errorText = null, value, options, onChange}) => {
  const inLabel = label ? label : `${placeholder} :`;
  const inError = errorText !== null;
  const labeledOptions = typeof options[0] === 'object' ?
    options : options.map(o => {
      return { label: o, value: o };
    });
  const interception = (e) => {
    console.log('Select', e)
    return onChange(e);
  }
  return (
    <div className={classNames('formGroup formGroupSelect', {'error': inError})}>
      {
        inLabel ? <label htmlFor={`reactKey_${reactKey}`}>{inLabel}</label> : ''
      }
      <ReactSelect
        id={`reactKey_${reactKey}`}
        placeholder={placeholder}
        clearable={false}
        options={labeledOptions}
        value={value}
        onChange={interception}
      />
      {
        errorText ? <span className='errorText animated shake'>{errorText}</span> : ''
      }
    </div>
  );
};

MainApp.Views.Select = Select;
