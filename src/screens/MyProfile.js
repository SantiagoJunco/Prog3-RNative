import { Text, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../firebase/config'
import Post from '../components/Post'

export default class MyProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            usuarios: [],
            posteos: []
        }
    }

    componentDidMount() {
        db.collection('users').where('owner', '==', auth.currentUser.email).onSnapshot((docs) => {
            let arrDocs = []
            docs.forEach((doc) => {
                arrDocs.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            this.setState({
                usuarios: arrDocs
            }, () => console.log(this.state.usuarios))

        })

        db.collection('posts').where('owner', '==', auth.currentUser.email).onSnapshot((docs) => {
            let arrDocs = []
            docs.forEach((doc) => {
                arrDocs.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            arrDocs.sort((a, b)=> b.data.createdAt - a.data.createdAt)
            this.setState({
                posteos: arrDocs
            }, () => console.log(this.state.posteos))

        })
    }

    logout() {
        auth.signOut()
        this.props.navigation.navigate('Login')
    }
    borrarPosteo(postId) {
        db.collection('posts')
          .doc(postId)
          .delete()
      }
      

    render() {
        return (
            <View>
                <Text>Tu perfil</Text>
                <View>
                    <FlatList
                        data={this.state.usuarios}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => <View>
                            <Text>Bienvenido {item.data.name}!</Text>
                            <Text>Tu email: {item.data.owner}</Text>
                            <Text>Tu minibio: {item.data.minibio}</Text>
                        </View>
                        }
                    />
                </View>
                <View>
                    <Text>Tus posteos</Text>
                    <Text>Cantidad: {this.state.posteos.length} </Text>
                    <FlatList
                        data={this.state.posteos}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) =>
                            <View>
                                <Post navigation={this.props.navigation} data={item.data} id={item.id} />
                                <TouchableOpacity onPress={() => this.borrarPosteo(item.id)}>
                                    <Text>Borrar posteo</Text>
                                </TouchableOpacity>
                            </View>
                        }
                    />
                </View>


                <View>
                    <TouchableOpacity
                        style={styles.signoutBtn}
                        onPress={() => this.logout()}
                    >
                        <Text>Cerrar sesión</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    signoutBtn: {
        backgroundColor: 'red',
        padding: 16
    }
})