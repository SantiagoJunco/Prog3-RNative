import React, { Component } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import Post from '../components/Post';
import { db } from '../firebase/config';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posteos: [],
        };
    }

    componentDidMount() {
        db.collection('posts')
            .orderBy('createdAt', 'desc')
            .limit(6)
            .onSnapshot((docs) => {
                let arrPosteos = [];
                docs.forEach((doc) => {
                    arrPosteos.push({
                        id: doc.id,
                        data: doc.data(),
                    });
                });

                this.setState({
                    posteos: arrPosteos,
                });
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.pageTitleContainer}>
                    <Text style={styles.pageTitle}>ReSport: Remeras Usadas</Text>
                </View>
                <FlatList
                    data={this.state.posteos}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <Post navigation={this.props.navigation} data={item.data} id={item.id} />}
                />
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
    pageTitleContainer: {
        alignItems: 'center',
    },
    pageTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#fff'
    },
});