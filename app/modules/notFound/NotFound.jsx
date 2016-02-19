const { Views } = MainApp;
const { AnimatedLink } = Views;

const NotFound = () => (
  <div className='NotFound MainContent maximized animated bounceIn flex col textCenter'>
    <div className='flexItemStaticSize textCenter'>
      <img src='/img/snvel.svg' width='200px' height='96px' alt='Logo SNVEL'/>
    </div>
    <h1 className='flexItemStaticSize lisibility'>{'Information non\u2011retrouvée'}</h1>
    <div className='flexItemStaticSize'>
      <AnimatedLink to='/'>On vous propose de revenir à l'accueil</AnimatedLink>
    </div>
  </div>
);

Views.NotFound = NotFound;
