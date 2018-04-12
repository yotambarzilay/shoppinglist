import React from 'react';
import { Keyboard } from 'react-native';
import { Input, Icon } from 'react-native-elements';

let suffix = 0;
const generateId = () => `${Date.now().toString(36)}${suffix++}`;

class AddItemInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
        
        this.onSubmitEditing = this.onSubmitEditing.bind(this);
    }

    setValue(e) {
        this.setState({value: e.nativeEvent.text});
    }

    render() {
        return (
            <Input  placeholder="הוספה"
                    controlled
                    value={this.state.value}
                    onChange={e => this.setValue(e)}
                    onSubmitEditing={this.onSubmitEditing}
                    returnKeyType='done'
                    leftIcon={
                        <Icon
                            name='add'
                            size={24}
                            color='#a9d6b2'
                        />
                    }
            />
        );
    }

    onSubmitEditing() {
        this.props.addItem(generateId(), this.state.value);
        this.setState({value: ''});
    }
}

export default AddItemInput;