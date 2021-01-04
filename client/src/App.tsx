import React from 'react';
import Navbar from './components/navbar';
import routeNames from './utils/routeNames';
import Routing from './components/routing';
import { BrowserRouter } from 'react-router-dom';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routing />
      </BrowserRouter>
    </>
  );
};

export default App;
