import { 
    EMAIL_CHANGED, 
    PASSWORD_CHANGED, 
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER_INIT,
} from '../actions/type';

const INITIAL_STATE = { 
    email: '', 
    password: '',
    user: null,
    error: '',
    loading: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EMAIL_CHANGED: {
            return { ...state, email: action.payload };
        }
        case PASSWORD_CHANGED: {
            return { ...state, password: action.payload };
        }
        case LOGIN_USER_SUCCESS: {
            return { ...state, ...INITIAL_STATE, user: action.payload };
        }
        case LOGIN_USER_FAIL: {
            return { ...state, error: `Authentication Fail. ${action.payload}`, loading: false };
        }
        case LOGIN_USER_INIT: {
            return { ...state, loading: true, error: '' };
        }
        default: {
            return state;
        }
    }
};

