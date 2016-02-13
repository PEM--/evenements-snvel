const reactKey = 0;

const Input = ({type, label = null, placeholder, hasError = false, errorText = null, value, onChange}) => {
  const inLabel = label ? label : `${placeholder} :`;
  const inError = hasError ? hasError : errorText !== null;
  return (
    <div className={classNames('formGroup', {'error': inError})}>
      {
        inLabel ? <label htmlFor={`reactKey_${reactKey}`}>{inLabel}</label> : ''
      }
      <input
        id={`reactKey_${reactKey}`} type={type} placeholder={placeholder}
        value={value} onChange={onChange}
      />
      {
        errorText ? <span className='errorText'>{errorText}</span> : ''
      }
    </div>
  );
};

MainApp.Views.Input = Input;
