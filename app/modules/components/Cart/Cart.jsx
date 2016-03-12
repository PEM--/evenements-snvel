const Cart = ({amount, items}) => (
  <div className='Cart-container'>
    <div className='Cart'>
      <div className='icon fa fa-shopping-cart' />
      <div className='number'>{items}</div>
      <div className='legend'>réservation(s)</div>
      <div className='amount'>{numeralAmountFormat(amount)}</div>
    </div>
  </div>
);

MainApp.Views.Cart = Cart;
