import React from 'react';

const Header = ({isMenuOpen, onMenuToggle}) => (
  <header
    className='animated fadeInDown whiteColor flexItemStaticSize'
    style={{height: '54px'}}
  >
    <div className='maximized flex row'>
      <div className='flexItemDynamicSize textCenter'>
        <a href='/'>
          <img src='/img/snvel.svg' width='100px' height='48px' alt='Logo SNVEL'/>
        </a>
      </div>
      <div className='flexItemStaticSize' style={{width: '40px'}}>
        <button onClick={onMenuToggle}>
          <div className={classNames('hamburger', {open: isMenuOpen})}>
            <div className='left' />
            <div className='right' />
          </div>
        </button>
      </div>
    </div>
  </header>
);

MainApp.Views.Header = Header;
