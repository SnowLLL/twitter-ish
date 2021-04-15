import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { TweetForm } from '../src/tweets/components';
import reportWebVitals from './reportWebVitals';

const rId = document.getElementById('root');
const e = React.createElement
// add children or props to TweetForm component
const MyComponent = e(TweetForm, rId.dataset)
// ReactDOM.render(e(App, rId.dataset), rId);
ReactDOM.render(MyComponent, rId);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
