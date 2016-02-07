import AnimatedLink from './AnimatedLink';

const ClientHome = () => (
  <div id='home' key='home' className='animated mFadeIn'>
    <h2>ClientHome</h2>
    <AnimatedLink to='/admin'>Admin</AnimatedLink>
  </div>
);

export default ClientHome;
