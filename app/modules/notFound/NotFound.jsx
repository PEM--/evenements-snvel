const { AnimatedLink } = MainApp.Views;

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

MainApp.Views.NotFound = NotFound;

setNotFoundRoute = () => {
  FlowRouter.notFound = {
    action() {
      ReactLayout.render(MainApp.Views.MainLayout, { children: <MainApp.Views.NotFound /> });
    }
  };
};
