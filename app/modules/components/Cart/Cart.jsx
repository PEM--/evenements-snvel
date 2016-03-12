const Cart = ({amount}) => (
  <div className='Cart-container'>
    <div className='Cart'>
      <i className='fa fa-shopping-cart' />
      <span>{amount}</span>
    </div>
  </div>
);

MainApp.Views.Cart = Cart;
