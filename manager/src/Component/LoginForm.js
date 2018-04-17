import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { 
    Card, 
    CardSection, 
    Input, 
    Button,
    Spinner,
} from './common';
import { emailChange, passwordChanged, loginUser } from '../actions';


class LoginForm extends Component {
    
    onEmailChange(text) {
        this.props.emailChange(text);
    }

    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }

    onButtonPress() {
        const { email, password } = this.props;
        this.props.loginUser(email, password);
    }

    renderError() {
        if (this.props.error) {
            return (
                <View style={{ backgroundColor: 'white' }}>
                    <Text style={styles.errorTextStyle}>
                        {this.props.error}
                    </Text>
                </View>
            );
        }
    }

    renderButton() {
        if (this.props.loading) {
            return (
                <Spinner />
            );
        }
        return (
            <Button 
                text="Login"
                onPress={this.onButtonPress.bind(this)}
            />
        );      
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input 
                        label="email"
                        placeholder="email@gmail.com"
                        onChangeText={this.onEmailChange.bind(this)}
                        value={this.props.email}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        secureTextEntry
                        label="password"
                        placeholder="Password"
                        onChangeText={this.onPasswordChange.bind(this)}
                    />
                </CardSection>
                
                {this.renderError()}
                
                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 16,
        alignSelf: 'center',
        color: 'red',
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 10,
    }
};

const mapStateToProps = (state) => {
    const { email, password, error, loading } = state.auth;
    return { email, password, error, loading };
};

export default connect(mapStateToProps, { emailChange, passwordChanged, loginUser })(LoginForm);
