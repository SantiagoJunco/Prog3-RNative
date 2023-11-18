// Comments.js
import React, { Component } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import FormComentario from '../components/FormComentario';
import { db } from '../firebase/config';

export default class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: null,
        };
    }

    componentDidMount() {
        db.collection('posts')
            .doc(this.props.route.params.id)
            .onSnapshot((doc) => {
                if (doc.exists) {
                    this.setState({ post: doc.data() });
                }
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.pageTitle}>Comments</Text>
                {this.state.post !== null ? (
                    this.state.post.comentarios.length !== 0 ? (
                        <FlatList
                            data={this.state.post.comentarios.sort(
                                (a, b) => b.createdAt - a.createdAt
                            )}
                            keyExtractor={(item) => item.createdAt.toString()}
                            renderItem={({ item }) => (
                                <View style={styles.commentContainer}>
                                    <View style={styles.commentBackground}>
                                        <Text style={styles.commentOwner}>{item.owner}</Text>
                                        <Text style={styles.commentText}>{item.comentario}</Text>
                                    </View>
                                    <View style={styles.commentSeparator} />
                                </View>
                            )}
                        />
                    ) : (
                        <Text style={styles.noCommentsText}>
                            Aún no hay comentarios en este post
                        </Text>
                    )
                ) : null}
                <FormComentario postId={this.props.route.params.id} />
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
    pageTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#fff',
    },
    commentContainer: {
        marginBottom: 15,
    },
    commentBackground: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 10,
        padding: 10,
    },
    commentOwner: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    commentText: {
        fontSize: 14,
        color: '#fff',
    },
    commentSeparator: {
        height: 10
    },
    noCommentsText: {
        fontSize: 16,
        color: '#fff',
    },
});
