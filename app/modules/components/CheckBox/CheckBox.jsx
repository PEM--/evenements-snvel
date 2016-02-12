let checkId = 0;

const CheckBox = ({children, isChecked, onChange}) => {
  checkId++;
  return (
    children ? (
      <div>
        <input id={`checkbox${checkId}`} type='checkbox' checked={isChecked} onChange={onChange} />
        <label htmlFor={`checkbox${checkId}`}>{children}</label>
      </div>
    ) : <input id={`checkbox${checkId}`} type='checkbox' />
  );
};

MainApp.Views.CheckBox = CheckBox;
