import AnimatedLink from './AnimatedLink';
import { BasicPages } from '../../both/basicPages';
import { globalSubs } from '../../both/subscriptions';

const Cgv = () => {
  console.log('CGV', BasicPages.find().fetch());
  console.log('Subscription', globalSubs);
  return (
    <div className='animated fadeInUp'>
      <h2>CGV</h2>
      <AnimatedLink to='/'>Retour</AnimatedLink>
    </div>
  );
};

export default Cgv;
