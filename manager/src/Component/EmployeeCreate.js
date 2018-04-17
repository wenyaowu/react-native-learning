import React, { Component } from 'react';
import { connect } from 'react-redux';
import { employeeFormChanged, createEmployee } from '../actions';
import { Card, CardSection, Button } from './common';
import EmployeeForm from './EmployeeForm';

class EmployeeCreate extends Component {

    onButtonPress() {
        const { name, phone, shift } = this.props;
        this.props.createEmployee({ name, phone, shift: shift || 'Monday' });
    }
    
    render() {
        return (
            <Card>
                <EmployeeForm {...this.props} />
                <CardSection>
                    <Button 
                        text="Create"
                        onPress={() => { this.onButtonPress(); }}
                    />
                </CardSection>
            </Card>
        );
    }
}

const mapStateToProp = (state) => {
    const { name, phone, shift } = state.employeeForm;
    return { name, phone, shift };
};
export default connect(mapStateToProp, { employeeFormChanged, createEmployee })(EmployeeCreate);
