import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import reducers from './reducers';
import Router from './Router';

class App extends Component {

    componentWillMount() {
        const config = {
            apiKey: 'AIzaSyDumpFGaRX55l8WtHG2IuBimd3RUXE3rFI',
            authDomain: 'manager-f697f.firebaseapp.com',
            databaseURL: 'https://manager-f697f.firebaseio.com',
            projectId: 'manager-f697f',
            storageBucket: 'manager-f697f.appspot.com',
            messagingSenderId: '325888437771',
        };
        firebase.initializeApp(config);
    }
    render() {
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
        return (
            <Provider store={store}>
                <Router />
            </Provider>        
        );
    }
}

export default App;
