import AnimatedLink from './AnimatedLink';

const ClientHome = ({history, location}) => {
  // console.log('ClientHome history', history);
  // console.log('ClientHome location', location);
  return (
    <div className='animated fadeInUp'>
      <h2>ClientHome</h2>
      <AnimatedLink to='/admin'>Admin</AnimatedLink>
    </div>
  );
};

export default ClientHome;
