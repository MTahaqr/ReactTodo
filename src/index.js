import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import firebase from 'firebase';

 
   var config = {
    apiKey: "AIzaSyD-xgTZodOjO2fhtWRe-lEywoaHmi6pe48",
    authDomain: "reacttodoapp-cbc24.firebaseapp.com",
    databaseURL: "https://reacttodoapp-cbc24.firebaseio.com",
    storageBucket: "reacttodoapp-cbc24.appspot.com",
    messagingSenderId: "806818246044"
  };
  firebase.initializeApp(config);


ReactDOM.render(
  <App />,
  document.getElementById('root')
);
