const Header = ({onMenuToggle}) => (
  <header
    className='animated fadeInDown whiteColor flexItemStaticSize'
    style={{padding: '2px 2px 0 0'}}
  >
    <div className='maximized flex row'>
      <div className='flexItemDynamicSize textCenter'>
        <a href='/'>
          <img src='/img/snvel.svg' width='120px' height='48px' alt='Logo SNVEL'/>
        </a>
      </div>
      <div className='flexItemStaticSize' style={{width: '40px'}}>
        <button onClick={onMenuToggle} className='clickable'>
          <i className='fa fa-bars fa-2x expandToParent'></i>
        </button>
      </div>
    </div>
  </header>
);

MainApp.Views.Header = Header;
