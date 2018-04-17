import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import EmployeeFormReudcer from './EmployeeFormReducer';
import EmployeeListReducer from './EmployeeListReducer';

export default combineReducers({
    auth: AuthReducer,
    employeeForm: EmployeeFormReudcer,
    employeeList: EmployeeListReducer,
});
