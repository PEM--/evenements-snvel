const { Col } = MainApp;

const BasicPages = ({slug}) => {
  const cgvContent = Col.BasicPages.findOne({slug: 'cgv'});
  console.log('cgvContent', cgvContent);
  const htmlContent = marked(cgvContent.content);
  return (
    <div className='animated fadeInUp'>
      <div dangerouslySetInnerHTML={{__html: htmlContent }} />
      {/*<AnimatedLink to='/'>Retour</AnimatedLink>*/}
    </div>
  );
};

MainApp.Views.BasicPages = BasicPages;
