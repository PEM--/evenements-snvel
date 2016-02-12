const reactKey = 0;

const Input = ({type, label, placeholder, errorText, value, onChange}) => (
  <div className='formGroup'>
    {
      label ? <label htmlFor={`reactKey_${reactKey}`}>{label}</label> : ''
    }
    <input
      id={`reactKey_${reactKey}`} type={type} placeholder={placeholder}
      value={value} onChange={onChange}
    />
    <span className='errorText'>{errorText}</span>
  </div>
);

MainApp.Views.Input = Input;
