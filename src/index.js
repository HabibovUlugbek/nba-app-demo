import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router} from 'react-router-dom';
import {firebase} from './firebase'

import Routes from './routes';

const App = (props) => {
    return(
      <Router>
        <Routes {...props} />
      </Router>
    )
}

firebase.auth().onAuthStateChanged((user) => {
    ReactDOM.render(
      <React.StrictMode>
        <App user={user}/>
      </React.StrictMode>,
      document.getElementById('root')
    );
})



