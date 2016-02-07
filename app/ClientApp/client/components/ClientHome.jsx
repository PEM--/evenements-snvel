import AnimatedLink from './AnimatedLink';
import { RouteContext } from 'react-router';

const ClientHome = RouteContext(() => {
  console.log('ClientHome', this.context);
  return (
    <div className='animated fadeInUp'>
      <h2>ClientHome</h2>
      <AnimatedLink to='/admin'>Admin</AnimatedLink>
    </div>
  );
});

export default ClientHome;
