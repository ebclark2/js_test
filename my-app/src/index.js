import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { MyRouterApp } from './MyRouterApp';
import FilterableTraining from './FilterableTraining';
import AzureServiceView from './AzureServices';
import reportWebVitals from './reportWebVitals';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

ReactDOM.render((
  //<FilterableTraining />
  <React.StrictMode>
  <AzureServiceView />
  </React.StrictMode>
), document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
