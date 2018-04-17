import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardSection, Button } from './common';
import EmployeeForm from './EmployeeForm';
import { employeeFormChanged, updateEmployee } from '../actions';


class EmployeeEdit extends Component {

    componentWillMount() { //Initialize everytime
        _.each(this.props.employee, (value, prop) => {
            this.props.employeeFormChanged({ prop, value });
        });
    }

    onButtonPress() {
        const { name, phone, shift } = this.props;
        this.props.updateEmployee({ name, phone, shift, uid: this.props.employee.uid });
    }

    render() {
        return (
            <Card>
                <EmployeeForm />
                <CardSection>
                    <Button 
                        text="Save Changes"
                        onPress={this.onButtonPress.bind(this)}
                    />
                </CardSection>
            </Card>
        );
    }
}

const mapStateToProps = (state) => {
    const { name, phone, shift } = state.employeeForm;
    return { name, phone, shift };
};

export default connect(mapStateToProps, { employeeFormChanged, updateEmployee })(EmployeeEdit);
