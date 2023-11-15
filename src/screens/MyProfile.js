import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, FlatList, Image, ScrollView } from 'react-native';
import Post from '../components/Post';
import { auth, db } from '../firebase/config';

export default class MyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuarios: [],
      posteos: [],
    };
  }

  componentDidMount() {
    console.log(auth.currentUser.email);
    db.collection('users')
      .where('owner', '==', auth.currentUser.email)
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
      .where('owner', '==', auth.currentUser.email)
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

  logout() {
    auth
      .signOut()
      .then(() => {
        this.setState({
          usuarios: [],
          posteos: [],
        });
        this.props.navigation.navigate('Register');
      })
      .catch((error) => {
        console.error('Error al cerrar sesión:', error);
      });
  }

  borrarPosteo(postId) {
    db.collection('posts').doc(postId).delete();
  }

  eliminarPerfil() {
    const user = auth.currentUser;
    const userEmail = user.email;
    db.collection('users')
      .where('owner', '==', userEmail)
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          doc.ref
            .delete()
            .then(() => {
              user.delete()
                .then(() => {
                  console.log('Usuario eliminado correctamente');
                  this.props.navigation.navigate('Register');
                })
                .catch((error) => {
                  console.error('Error al eliminar usuario:', error);
                });
              console.log('Datos del usuario eliminados correctamente');
            })
            .catch((error) => {
              console.error('Error al eliminar datos del usuario:', error);
            });
        });
      })
      .catch((error) => {
        console.error('Error al buscar datos del usuario:', error);
      });

  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Tu perfil</Text>
        <View style={styles.userInfo}>
          <FlatList
            data={this.state.usuarios}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.userDetails}>
                <Text style={styles.userName}>Bienvenido {item.data.name}!</Text>
                {item.data.fotoPerfil != '' ? (
                  <Image
                    source={item.data.fotoPerfil}
                    style={styles.img}
                    resizeMode='contain'
                  />
                ) : ''}
                <Text style={styles.userInfoText}>Tu email: {item.data.owner}</Text>
                {item.data.minibio ? (
                  <Text style={styles.userInfoText}>Tu minibio: {item.data.minibio}</Text>
                ) : ''}
              </View>
            )}
          />
        </View>

        <Text style={styles.title}>Tus posteos</Text>
        <Text style={styles.userInfoText}>Cantidad: {this.state.posteos.length} </Text>
        <FlatList
          data={this.state.posteos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <>
              <Post navigation={this.props.navigation} data={item.data} id={item.id} />
              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() => this.borrarPosteo(item.id)}>
                <Text style={styles.btnText}>Borrar posteo</Text>
              </TouchableOpacity>
            </>
          )}
        />

        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.signoutBtn} onPress={() => this.logout()}>
            <Text style={styles.cerrarSesion}>Cerrar sesión</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteBtn} onPress={() => this.eliminarPerfil()}>
            <Text style={styles.btnText}>Eliminar Perfil</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    minHeight: '100vh',
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
    marginBottom: 20,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#fff',
    textAlign: 'center'
  },
  userDetails: {
    marginBottom: 15,
  },
  userPosts: {
    flex: 1,
  },
  signoutBtn: {
    backgroundColor: 'red',
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
  },
  deleteBtn: {
    backgroundColor: 'lightcoral',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  img: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  btnText: {
    color: 'black',
    textAlign: 'center',
  },
  cerrarSesion: {
    color: 'white',
    textAlign: 'center',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userInfoText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#fff',
    textAlign: 'center'
  },
});