const reactKey = 0;
const Select = ({name, label, placeholder, errorText = null, value, options, onChange}) => {
  const inLabel = label ? label : `${placeholder} :`;
  const inError = errorText !== null;
  const resultOptions = typeof options === 'function' ? options() : options;
  console.log('Options', resultOptions, typeof options);
  const labeledOptions = typeof resultOptions[0] === 'object' ?
    resultOptions : resultOptions.map(o => ({ label: o, value: o }));
  return (
    <div className={classNames('formGroup formGroupSelect', {'error': inError})}>
      {
        inLabel ? <label htmlFor={`reactKey_${reactKey}`}>{inLabel}</label> : ''
      }
      <ReactSelect
        id={`reactKey_${reactKey}`}
        name={name}
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
