import { Text, View, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import React, { Component } from 'react';
import { db, auth } from '../firebase/config';
import firebase from 'firebase';

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: 0,
      estaMiLike: false,
    };
  }

  componentDidMount() {
    let validacionLike = this.props.data.likes.includes(auth.currentUser.email);
    this.setState({
      estaMiLike: validacionLike,
    });
  }

  like() {
    db.collection('posts')
      .doc(this.props.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email),
      })
      .then((resp) => {
        this.setState({
          estaMiLike: true,
        });
      })
      .catch((err) => console.log(err));
  }

  unlike() {
    db.collection('posts')
      .doc(this.props.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email),
      })
      .then((resp) => {
        this.setState({
          estaMiLike: false,
        });
      })
      .catch((err) => console.log(err));
  }

  irAComentar() {
    this.props.navigation.navigate('Comments', { id: this.props.id });
  }

  irAlPerfil() {
    this.props.data.owner == auth.currentUser.email
      ? this.props.navigation.navigate('MyProfile')
      : this.props.navigation.navigate('UserProfile', { user: this.props.data.owner });
  }

  render() {
    return (
      <View style={styles.containerPost}>
        <TouchableOpacity onPress={() => this.irAlPerfil()}>
          <Text style={styles.ownerText}>{this.props.data.owner}</Text>
        </TouchableOpacity>
        <Image source={{ uri: this.props.data.foto }} style={styles.img} resizeMode='contain' />
        <Text style={styles.description}>{this.props.data.descripcion}</Text>
        <View style={styles.likeContainer}>
          <Text style={styles.likeCount}>{this.props.data.likes.length}</Text>
          {this.state.estaMiLike ? (
            <TouchableOpacity onPress={() => this.unlike()}>
              <FontAwesome name='heart' color='red' size={24} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => this.like()}>
              <FontAwesome name='heart-o' color='red' size={24} />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity style={styles.commentButton} onPress={() => this.irAComentar()}>
          <Text style={styles.commentButtonText}>Ver Comentarios ({this.props.data.comentarios.length})</Text>
        </TouchableOpacity>
        <FlatList
          data={this.props.data.comentarios.slice(-4).reverse()} // electiva de mostrar 4 comentarios
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.commentContainer}>
              <Text>{item.owner}:</Text>
              <Text>{item.comentario}</Text>
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerPost: {
    flex: 1,
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 20,
  },
  img: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  description: {
    marginBottom: 10,
    color: 'black',
    fontSize: 16,
    fontFamily: 'Arial',
    textAlign: 'center',
  },
  likeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeCount: {
    marginLeft: 5,
    color: 'black',
    fontSize: 16,
    fontFamily: 'Arial',
  },
  commentContainer: {
    backgroundColor: '#f0f0f0',
    padding: 8,
    marginVertical: 4,
    borderRadius: 8,
  },
  ownerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'Arial',
    textAlign: 'center',
  },
  commentButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  commentButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Arial',
  },
});
