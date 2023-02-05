import React from 'react';
import axios from 'axios';
import Form from './pages/Form';

import Header from './pages/Header';

export default function App(){
  return(
      <>
        <Header />
        <Form />
      </>
  );
}