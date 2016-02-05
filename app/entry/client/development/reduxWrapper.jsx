import React from 'react';
import { Provider } from 'react-redux';
// import devtools
import DevTools from './reduxDevtools/devTools.jsx';

const Wrapper = ({store, children}) => {
  // in dev mode, press ctrl+h to load redux devtools
  const showDevTools = process.env.NODE_ENV !== 'production' && !process.env.IS_MIRROR;
  return (
    <Provider store={store}>
      <div>
        {children}
        {showDevTools ? <DevTools /> : ''}
      </div>
    </Provider>
  );
};

export default Wrapper;
