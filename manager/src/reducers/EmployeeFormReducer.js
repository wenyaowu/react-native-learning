import { 
    EMPLOYEE_FORM_CHANGE, 
    EMPLOYEE_CREATE_INIT,
    EMPLOYEE_CREATE_SUCCESS
} from '../actions/type';

const INITIAL_STATE = {
    name: '',
    phone: '',
    shift: '',
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EMPLOYEE_FORM_CHANGE: {
            const { prop, value } = action.payload;
            return { ...state, [prop]: value };
        }
        case EMPLOYEE_CREATE_INIT: 
        case EMPLOYEE_CREATE_SUCCESS: {
            return INITIAL_STATE;
        }
        default: {
            return state;
        }
    }
};
