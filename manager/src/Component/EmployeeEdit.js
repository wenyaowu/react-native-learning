import Communications from 'react-native-communications';
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardSection, Button, Confirm } from './common';
import EmployeeForm from './EmployeeForm';
import { employeeFormChanged, updateEmployee, deleteEmployee } from '../actions';


class EmployeeEdit extends Component {

    state = { showModal: false };

    componentWillMount() { //Initialize everytime
        _.each(this.props.employee, (value, prop) => {
            this.props.employeeFormChanged({ prop, value });
        });
    }

    onButtonPress() {
        const { name, phone, shift } = this.props;
        this.props.updateEmployee({ name, phone, shift, uid: this.props.employee.uid });
    }

    onTextPress() {
        const { phone, shift } = this.props;
        Communications.text(phone, `Your upcoming shift is on ${shift}`);
    }

    onDeletePress() {
        this.setState({ showModal: !this.state.showModal });
    }

    onAccept() {
        this.props.deleteEmployee({ uid: this.props.employee.uid });
    }

    onDecline() {
        this.setState({ showModal: false });
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
                <CardSection>
                    <Button 
                        text="Text"
                        onPress={this.onTextPress.bind(this)}
                    />
                </CardSection>
                <CardSection>
                    <Button 
                        text="Delete Employee"
                        onPress={this.onDeletePress.bind(this)}
                    />
                </CardSection>
                
                <Confirm 
                    onAccept={this.onAccept.bind(this)}
                    onDecline={this.onDecline.bind(this)}
                    visible={this.state.showModal}
                >
                    Are you sure you want to delete this?
                </Confirm>
            </Card>
        );
    }
}

const mapStateToProps = (state) => {
    const { name, phone, shift } = state.employeeForm;
    return { name, phone, shift };
};

export default connect(mapStateToProps, { employeeFormChanged, updateEmployee, deleteEmployee })(EmployeeEdit);
