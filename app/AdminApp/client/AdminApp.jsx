import { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import style from './styles/AdminApp.import.css';

const AdminApp = ({children}) => (
  <div className={style.container}>
    <Helmet
      title='Evénements SNVEL - Admin'
      meta={[
        { name: 'description', content: 'This is the admin section!' }
      ]}
    />
    <Link to='/'>Back</Link>
    <h1>Admin</h1>
    {children}
  </div>
);

export default AdminApp;
