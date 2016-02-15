const reactKey = 0;

const Input = ({type, label = null, placeholder, errorText = null, value, onChange}) => {
  const inLabel = label ? label : `${placeholder} :`;
  const inError = errorText !== null;
  const interceptor = (e) => onChange(e.target.value);
  return (
    <div className={classNames('formGroup', {'error': inError})}>
      {
        inLabel ? <label htmlFor={`reactKey_${reactKey}`}>{inLabel}</label> : ''
      }
      <input
        id={`reactKey_${reactKey}`} type={type} placeholder={placeholder}
        value={value} onChange={interceptor}
      />
      {
        errorText ? <span className='errorText animated shake'>{errorText}</span> : ''
      }
    </div>
  );
};

MainApp.Views.Input = Input;
