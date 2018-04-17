import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { 
    EMPLOYEE_FORM_CHANGE, 
    EMPLOYEE_CREATE_INIT, 
    EMPLOYEE_CREATE_SUCCESS,
    EMPLOYEE_FETCH_SUCCESS,
} from './type';

export const employeeFormChanged = ({ prop, value }) => {
    return {
        type: EMPLOYEE_FORM_CHANGE,
        payload: { prop, value },
    };
};

export const updateEmployee = ({ name, phone, shift, uid }) => {
    return async () => {
        const { currentUser } = firebase.auth();
        await firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
            .set({ name, phone, shift });
        Actions.pop();
    };
};

export const createEmployee = ({ name, phone, shift }) => {
    return async (dispatch) => {
        const { currentUser } = firebase.auth();
        dispatch({ type: EMPLOYEE_CREATE_INIT });
        await firebase.database().ref(`/users/${currentUser.uid}/employees`)
            .push({ name, phone, shift });
        Actions.pop();
        dispatch({ type: EMPLOYEE_CREATE_SUCCESS });
    };
};

export const fetchEmployees = () => {
    return async (dispatch) => {
        const { currentUser } = firebase.auth();
        firebase.database().ref(`/users/${currentUser.uid}/employees`)
            .on('value', (snapshot) => {
                dispatch({ 
                    type: EMPLOYEE_FETCH_SUCCESS, payload: snapshot.val()
                });
            });
    };
};
