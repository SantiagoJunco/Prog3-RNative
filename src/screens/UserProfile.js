import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, Image } from 'react-native';
import Post from '../components/Post';
import { db } from '../firebase/config';

export default class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuarios: [],
      posteos: [],
    };
  }

  componentDidMount() {
    db.collection('users')
      .where('owner', '==', this.props.route.params.user)
      .onSnapshot((docs) => {
        let arrDocs = [];
        docs.forEach((doc) => {
          arrDocs.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        this.setState({
          usuarios: arrDocs,
        });
      });

    db.collection('posts')
      .where('owner', '==', this.props.route.params.user)
      .onSnapshot((docs) => {
        let arrDocs = [];
        docs.forEach((doc) => {
          arrDocs.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        arrDocs.sort((a, b) => b.data.createdAt - a.data.createdAt);
        this.setState({
          posteos: arrDocs,
        });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <View> 
          <Text style={styles.title}>Perfil</Text>
          <FlatList
            data={this.state.usuarios}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.userInfo}>
                <Text style={styles.userName}>Usuario: {item.data.name}</Text>
                {item.data.fotoPerfil != '' ? (
                  <Image
                    source={item.data.fotoPerfil}
                    style={styles.img}
                    resizeMode="contain"
                  />
                ) : ''}
                <Text style={styles.userInfoText}>Email: {item.data.owner}</Text>
                {item.data.minibio ? (
                  <Text style={styles.userInfoText}>Minibio: {item.data.minibio}</Text>
                ) : ''}
              </View>
            )}
          />
        </View>

        
          <Text style={styles.title}>Posteos</Text>
          <Text style={styles.userInfoText}>Cantidad: {this.state.posteos.length}</Text>
          <FlatList
            data={this.state.posteos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.postContainer}>
                <Post navigation={this.props.navigation} data={item.data} id={item.id} />
              </View>
            )}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  userInfo: {
    marginBottom: 15,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#fff',
    textAlign: 'center',
  },
  img: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  userInfoText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#fff',
    textAlign: 'center',
  },
  postContainer: {
    marginBottom: 10,
  },
});
