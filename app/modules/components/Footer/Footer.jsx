const { Views } = MainApp;

const Footer = ({basicPages}) => (
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
        <Views.SocialLinks />
      </div>
    </nav>
  </footer>
);

Views.Footer = Footer;
