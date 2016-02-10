const { Views } = MainApp;

const Footer = ({basicPages}) => {
  console.log('Footer basicPages', basicPages);
  return (
    <footer className='animated fadeInUp primary2Color flexItemStaticSize'>
      <nav className='maximized lisibility flex row'>
        <div className='flexItemDynamicSize'>
          {
            basicPages.map(bp => (
              <div key={bp._id}>
                <Views.AnimatedLink to={bp.slug} isCream={true} >
                  {bp.title}
                </Views.AnimatedLink>
              </div>
            ))
          }
        </div>
        <div className='flexItemStaticItem'>
          <p>Social icons</p>
        </div>
      </nav>
    </footer>
    );
};

Views.Footer = Footer;
