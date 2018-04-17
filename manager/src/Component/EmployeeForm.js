import React, { Component } from 'react';
import { View, Picker, Text } from 'react-native';
import { connect } from 'react-redux';
import { Input, CardSection } from './common';
import { employeeFormChanged } from '../actions';


class EmployeeForm extends Component {
    
    renderPickerItems = () => {
        const dayOfWeek = [
            'Monday', 
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
        ];
        return dayOfWeek.map((dow) => <Picker.Item key={dow} label={dow} value={dow} />);
    }
    
    render() {   
        return (
        <View>
            <CardSection>
                <Input 
                    label="Name"
                    placeholder="Evan"
                    onChangeText={
                        (value) => { this.props.employeeFormChanged({ prop: 'name', value }); }
                    }
                    value={this.props.name}
                />
            </CardSection>
            <CardSection>
                <Input 
                    label="Phone"
                    placeholder="555-555-5555"
                    onChangeText={
                        (value) => { this.props.employeeFormChanged({ prop: 'phone', value }); }
                    }
                    value={this.props.phone}
                />
            </CardSection>
            <CardSection style={styles.pickerCardSectionStyle}>
                <Text style={styles.pickerLabelStyle}>Shift</Text>
                <Picker
                    selectedValue={this.props.shift}
                    onValueChange={
                        (value) => { this.props.employeeFormChanged({ prop: 'shift', value }); }
                    }
                >
                    {this.renderPickerItems()}
                </Picker>
            </CardSection>            
        </View>
        );
    }
}

const styles = {
    pickerLabelStyle: {
        fontSize: 18,
        paddingLeft: 20,
    },
    pickerCardSectionStyle: {
        flexDirection: 'column'
    }
};

const mapStateToProp = (state) => {
    const { name, phone, shift } = state.employeeForm;
    return { name, phone, shift };
};

export default connect(mapStateToProp, { employeeFormChanged })(EmployeeForm);
