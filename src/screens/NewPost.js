import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
import { db, auth } from '../firebase/config';
import FormNewPost from '../components/FormNewPost';
import CamaraPost from '../components/CamaraPost';

export default class NewPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            descripcion: '',
            urlFoto: '',
            paso1: true,
        };
    }

    onSubmit({ descripcion, fotoUrl }) {
        db.collection('posts')
            .add({
                owner: auth.currentUser.email,
                createdAt: Date.now(),
                foto: fotoUrl,
                descripcion: descripcion,
                likes: [],
                comentarios: [],
            })
            .then(() => {
                this.props.navigation.navigate('Home');
                this.setState({ paso1: true });
            })
            .catch((err) => console.log(err));
    }

    actualizarDescripcion(text) {
        this.setState({
            descripcion: text,
        });
    }

    actualizarFotoUrl(url) {
        this.setState({
            urlFoto: url,
            paso1: false,
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.pageTitle}>Crea aquí tu nuevo posteo!</Text>
                {this.state.paso1 ? (
                    <CamaraPost
                        actualizarFotoUrl={(url) => this.actualizarFotoUrl(url)}
                    />
                ) : (
                    <>
                        <FormNewPost
                            actualizarDescripcion={(desc) =>
                                this.actualizarDescripcion(desc)
                            }
                            estadoDescripcion={this.state.descripcion}
                        />
                        <TouchableOpacity
                            style={styles.btn}
                            onPress={() =>
                                {this.onSubmit({
                                    descripcion: this.state.descripcion,
                                    fotoUrl: this.state.urlFoto,
                                })
                                this.setState({descripcion: ''})
                            }
                            }
                        >
                            <Text style={styles.enviar}>Enviar</Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#2980B9',
    },
    enviar:{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center'
    },
    pageTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#fff',
    },
    btn: {
        borderWidth: 1,
        borderColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
});