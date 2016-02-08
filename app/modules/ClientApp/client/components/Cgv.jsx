import AnimatedLink from './AnimatedLink';
import { BasicPages } from '../../both/basicPages';
import globalSubs from '../../both/subscriptions';

console.log('BasicPages', BasicPages, globalSubs);

const Cgv = () => {
  const cgvContent = marked(BasicPages.findOne({slug: 'cgv'}).content);
  return (
    <div className='animated fadeInUp'>
      <div dangerouslySetInnerHTML={{__html: cgvContent }} />
      <AnimatedLink to='/'>Retour</AnimatedLink>
    </div>
  );
};

export default Cgv;
