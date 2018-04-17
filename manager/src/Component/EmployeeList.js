import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView } from 'react-native';
import _ from 'lodash';
import { fetchEmployees } from '../actions';
import ListItem from '../Component/ListItem';

class EmployeeList extends Component {
    
    componentWillMount() {
        this.props.fetchEmployees();
        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }

    createDataSource({ employeeList }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(employeeList);
    }

    renderRow(employee) {
        return <ListItem employee={employee} />;
    }

    render() {
        return (
            <ListView 
                enableEmptySections
                dataSource={this.dataSource}
                renderRow={this.renderRow}
            />
        );
    }
}

const mapStateToProps = (state) => {
    const employeeList = _.map(state.employeeList, (val, uid) => {
        return { ...val, uid };
    });
    return { employeeList };
};

export default connect(mapStateToProps, { fetchEmployees })(EmployeeList);
