import React, { lazy } from 'react';
import Loader from 'shared/components/Loader';
import './fontStyles.css';

const Setup = lazy(() => import('./Setup'));

const App: React.FC = () => {
  return (
    <Loader>
      <Setup />
    </Loader>
  );
};

export default App;
