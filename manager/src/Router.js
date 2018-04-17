import React from 'react';
import { Scene, Stack, Router, Actions } from 'react-native-router-flux';
import LoginForm from './Component/LoginForm';
import EmployeeList from './Component/EmployeeList';
import EmployeeCreate from './Component/EmployeeCreate';
import EmployeeEdit from './Component/EmployeeEdit';

const RouterComponent = () => {
    return (
        <Router>
            <Stack key="root" hideNavBar> 
                <Scene key="auth"> 
                    <Scene key="login" component={LoginForm} title="Please Login" initial />
                </Scene>
                <Scene key="main"> 
                    <Scene 
                        rightTitle="Add"
                        onRight={() => { Actions.employeeCreate(); }}
                        key="employeeList" 
                        component={EmployeeList} 
                        title="Employees" 
                    />
                    <Scene
                        key="employeeEdit"
                        component={EmployeeEdit}
                        title="Edit Employee"
                    />
                    <Scene 
                        key="employeeCreate" 
                        component={EmployeeCreate} 
                        title="Create Employee" 
                    /> 
                </Scene>
            </Stack>
        </Router>
    );
};
export default RouterComponent;
