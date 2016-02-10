const { MainLayout, AnimatedLink } = MainApp.Views;

const NotFound = () => (
  <div className='NotFound animated bounceIn flex col textCenter'>
    <div className='flexItemStaticSize'>
      <img src='/img/snvel.svg' width='200px' height='96px' alt='Logo SNVEL'/>
    </div>
    <h1 className='flexItemStaticSize lisibility'>Information non-retrouvée</h1>
    <div className='flexItemStaticSize'>
      <AnimatedLink to='/'>On vous propose de revenir à l'accueil</AnimatedLink>
    </div>
  </div>
);

FlowRouter.notFound = {
  action() {
    ReactLayout.render(MainLayout, { children: <NotFound /> });
  }
};
