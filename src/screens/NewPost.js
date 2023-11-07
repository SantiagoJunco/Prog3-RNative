import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../firebase/config'
import FormNewPost from '../components/FormNewPost'
import CamaraPost from '../components/CamaraPost'

export default class NewPost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            descripcion: '',
            urlFoto: '',
            paso1: true
        }
    }

    onSubmit({
        descripcion,
        fotoUrl
    }) {
        db.collection('posts').add(
            {
                owner: auth.currentUser.email,
                createdAt: Date.now(),
                foto: fotoUrl,
                descripcion: descripcion,
                likes: [],
                comentarios: []
            }
        )
            .then(() => {
                this.props.navigation.navigate('Home')
                this.setState({ paso1: true })
            })
            .catch((err) => console.log(err))
    }

    actualizarDescripcion(text) {
        this.setState({
            descripcion: text
        })
    }

    actualizarFotoUrl(url) {
        this.setState({
            urlFoto: url,
            paso1: false
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Crea aquí tu nuevo posteo!</Text>
                {
                    this.state.paso1 ?
                        <CamaraPost
                            actualizarFotoUrl={(url) => this.actualizarFotoUrl(url)}
                        />
                        :
                        <>
                            <FormNewPost
                                // onSubmit={(obj) => this.onSubmit(obj)}
                                actualizarDescripcion={(desc) => this.actualizarDescripcion(desc)}
                                estadoDescripcion={this.state.descripcion}
                            />
                            <TouchableOpacity
                                style={styles.btn}
                                onPress={() => this.onSubmit({
                                    descripcion: this.state.descripcion,
                                    fotoUrl: this.state.urlFoto
                                })}
                            >
                                <Text>
                                    Enviar
                                </Text>
                            </TouchableOpacity>
                        </>
                }
            </View>
        )
    }
}


const styles = StyleSheet.create({
    btn: {
        borderWidth: 1,
        borderColor: 'green'
    },
    container: {
        flex: 1
    }
})