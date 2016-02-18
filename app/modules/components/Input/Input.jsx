const reactKey = 0;
const PHONE_NUMBER_REGEX = '^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$';

const Input = ({
  type,
  label = null, placeholder,
  errorText = null,
  disabled = false,
  value, onChange
}) => {
  const inLabel = label ? label : `${placeholder} :`;
  const inError = errorText !== null;
  const pattern = type === 'tel' ? PHONE_NUMBER_REGEX : null;
  const interceptor = (e) => {
    if (!disabled) {
      onChange(e.target.value);
    }
  };
  console.log('Input disabled', disabled)
  return (
    <div className={classNames('formGroup', {
      error: inError, disabled: disabled
    })}>
      {
        inLabel ? <label htmlFor={`reactKey_${reactKey}`}>{inLabel}</label> : ''
      }
      <input
        id={`reactKey_${reactKey}`} type={type} placeholder={placeholder}
        value={value} onChange={interceptor} pattern={pattern}
        disabled={disabled}
      />
      {
        errorText ? <span className='errorText animated shake'>{errorText}</span> : ''
      }
    </div>
  );
};

MainApp.Views.Input = Input;
