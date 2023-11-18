import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { db, auth } from '../firebase/config';
import firebase from 'firebase';

export default class FormComentario extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comentario: '',
        };
    }

    enviarComentario(comentario) {
        db.collection('posts')
            .doc(this.props.postId)
            .update({
                comentarios: firebase.firestore.FieldValue.arrayUnion({
                    owner: auth.currentUser.email,
                    createdAt: Date.now(),
                    comentario: comentario,
                }),
            });
        this.setState({ comentario: '' });
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    placeholder="Agrega tu comentario"
                    keyboardType="default"
                    onChangeText={(text) => this.setState({ comentario: text })}
                    value={this.state.comentario}
                    multiline={true}
                    numberOfLines={4}
                    style={styles.input}
                />
                {this.state.comentario === '' ? null : (
                    <TouchableOpacity
                        onPress={() => this.enviarComentario(this.state.comentario)}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Enviar</Text>
                    </TouchableOpacity>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#fff',
        color: '#fff',
        padding: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'black',
        textAlign: 'center',
    },
});