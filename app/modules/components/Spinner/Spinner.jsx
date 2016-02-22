const { Views } = MainApp;

const Spinner = ({className}) => (
  <div className={classNames('SpinnerContainer', 'animated', 'fadeIn', className)}>
    <div className='Spinner' />
  </div>
);

Views.Spinner = Spinner;
