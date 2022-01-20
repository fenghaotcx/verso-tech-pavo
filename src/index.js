import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { RecoilRoot } from "recoil";
import Boundary from "./components/Boundary.js"


ReactDOM.render(
  <RecoilRoot>
    <Boundary>
      <HashRouter>
        <App />
      </HashRouter>
    </Boundary>
  </RecoilRoot>,
  document.getElementById('root')
);

