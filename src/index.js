import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { RecoilRoot } from "recoil";
import Boundary from "./components/Boundary.js"


ReactDOM.render(
  <RecoilRoot>
    <Boundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Boundary>
  </RecoilRoot>,
  document.getElementById('root')
);

