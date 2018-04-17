import React from 'react';
import { TouchableOpacity, Text} from 'react-native';

const Button = ({ onPress, text }) => {
  const { buttonStyle, textStyle } = styles;
  
  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      <Text style={textStyle}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#007aff',
    marginLeft: 5,
    marginRight: 5
  },
  textStyle: {
    alignSelf: 'center',
    color: '#007aff',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  }
};

export { Button };
