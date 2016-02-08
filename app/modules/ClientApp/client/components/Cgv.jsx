import AnimatedLink from './AnimatedLink';
import { BasicPages } from '../../both/basicPages';

const Cgv = () => {
  console.log('CGV', BasicPages.find().fetch());
  return (
    <div className='animated fadeInUp'>
      <h2>CGV</h2>
      <AnimatedLink to='/'>Retour</AnimatedLink>
    </div>
  );
};

export default Cgv;
