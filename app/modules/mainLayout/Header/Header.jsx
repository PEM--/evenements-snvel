const Header = ({onMenuToggle}) => (
  <header
    className='animated fadeInDown whiteColor flexItemStaticSize'
  >
    <div className='maximized flex row'>
      <div className='flexItemDynamicSize textCenter'>
        <a href='/'>
          <img src='/img/snvel.svg' width='100px' height='48px' alt='Logo SNVEL'/>
        </a>
      </div>
      <div className='flexItemStaticSize' style={{width: '40px'}}>
        <button onClick={onMenuToggle}>
          <i className='fa fa-bars'></i>
        </button>
      </div>
    </div>
  </header>
);

MainApp.Views.Header = Header;