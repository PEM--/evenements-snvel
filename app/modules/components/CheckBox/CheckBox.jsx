let checkId = 0;

const CheckBox = ({children, isChecked, onChange}) => (
  <div>
    <input id={`checkbox${checkId}`} type='checkbox' checked={isChecked} onChange={onChange} />
    <label htmlFor={`checkbox${checkId++}`}>{children ? children : ' '}</label>
  </div>
);

MainApp.Views.CheckBox = CheckBox;
