import { Text, View, StyleSheet, TextInput } from 'react-native';
import React, { Component } from 'react';

export default class FormDescripcionPost extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.label}>Describí tu post</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Agregá acá la descripcion de tu post"
                        onChangeText={(text) =>
                            this.props.actualizarDescripcion(text)
                        }
                        value={this.props.estadoDescripcion}
                        style={styles.input}
                        multiline={true}
                        numberOfLines={8}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },
    inputContainer: {
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 5,
    },
    input: {
        padding: 10,
        color: '#fff',
        textAlignVertical: 'top',
    },
});