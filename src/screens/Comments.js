import { Text, View, FlatList } from 'react-native'
import React, { Component } from 'react'
import FormComentario from '../components/FormComentario'
import { db } from '../firebase/config'

export default class Comments extends Component {
    constructor(props) {
        super(props)
        this.state = {
            post: null
        }
    }

    componentDidMount() {
        console.log(this.props)
        db
            .collection('posts')
            .doc(this.props.route.params.id)
            .onSnapshot((doc) => {
                if (doc) {
                    this.setState({ post: doc.data() })
                }
            })
    }
    render() {
        return (
            <View>
                <Text>Comments</Text>
                {

                    this.state.post !== null ?
                        this.state.post.comentarios.length !== 0 ?
                            <FlatList
                                data={this.state.post.comentarios}
                                keyExtractor={(item) => item.createdAt.toString()}
                                renderItem={({ item }) => <View>
                                    <Text>{item.owner}</Text>
                                    <Text>{item.comentario}</Text>
                                </View>} />
                            :
                            <Text> Aún no hay comentarios en este post</Text>
                        :
                        ''
                }
                <FormComentario
                    postId={this.props.route.params.id}
                />
            </View>
        )
    }
}