import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { MyRouterApp } from './MyRouterApp';
import FilterableTraining from './FilterableTraining';
import reportWebVitals from './reportWebVitals';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

ReactDOM.render((
  <FilterableTraining />
), document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
