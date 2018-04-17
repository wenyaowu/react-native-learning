import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

import { EMAIL_CHANGED, 
    PASSWORD_CHANGED, 
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER_INIT,
} from './type';

export const emailChange = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text,
    };
};

export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text,
    };
};

export const loginUser = (email, password) => {
    const loginUserSuccess = (dispatch, user) => {
        dispatch({
            type: LOGIN_USER_SUCCESS,
            payload: user,
        });
        Actions.main();
    };
    const loginUserFail = (dispatch, errorMessage) => {
        dispatch({
            type: LOGIN_USER_FAIL,
            payload: errorMessage,
        });
    };
    
    return async (dispatch) => { //We are manually dispath action for async action       
        dispatch({
            type: LOGIN_USER_INIT,
        });
        let user;
        try {
            user = await firebase.auth().signInWithEmailAndPassword(email, password);
            loginUserSuccess(dispatch, user);
        } catch (e) {
            try {
                user = await firebase.auth().createUserWithEmailAndPassword(email, password);
                loginUserSuccess(dispatch, user);
            } catch (err) {
                loginUserFail(dispatch, err.message);
            } 
        }
    };
};

