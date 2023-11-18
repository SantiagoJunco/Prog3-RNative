import React, { Component } from 'react';
import {Text, View, TouchableOpacity, StyleSheet, FlatList, Image, ScrollView, TextInput, Alert} from 'react-native';
import Post from '../components/Post';
import firebase from 'firebase';
import { auth, db } from '../firebase/config';

export default class MyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuarios: [],
      posteos: [],
      loading: true,
      newPassword: '',
      currentPassword: '',
      isChangingPassword: false
    };
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('focus', () => {
      console.log('MyProfile se enfocó.');
      this.cargarDatos();
    });
  }

  cargarDatos() {
    const currentUser = auth.currentUser;
    db.collection('users')
      .where('owner', '==', currentUser.email)
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
          loading: false,
        });
      });

    db.collection('posts')
      .where('owner', '==', currentUser.email)
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

  componentWillUnmount() {
    this.focusListener();
  }

  logout() {
    auth
      .signOut()
      .then(() => {
        this.setState({
          usuarios: [],
          posteos: [],
        });
        this.props.navigation.navigate('Login');
      })
      .catch((error) => {
        console.error('Error al cerrar sesión:', error);
      });
  }

  borrarPosteo(postId) {
    db.collection('posts')
      .doc(postId)
      .delete();
  }

  reauthenticate(currentPassword) {
    const user = firebase.auth().currentUser;
    const cred = firebase.auth.EmailAuthProvider.credential(
      auth.currentUser.email,
      currentPassword
    );
    return user.reauthenticateWithCredential(cred);
  }

  // electiva cambiar contraseña
  cambiarContraseña() {
    this.reauthenticate(this.state.currentPassword)
      .then(() => {
        const user = firebase.auth().currentUser;
        user
          .updatePassword(this.state.newPassword)
          .then(() => {
            Alert.alert('se cambió la contraseña')
            console.log('Actualizó la contraseña')
            this.setState({
              newPassword: '',
              currentPassword: '',
              isChangingPassword: false
            });
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
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
              user
                .delete()
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
    if (this.state.loading || this.state.usuarios.length == 0) {
      return (
        <View style={styles.container}>
          <Text style={styles.loadingText}>Cargando...</Text>
        </View>
      );
    }

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Tu perfil</Text>
        <View style={styles.userInfo}>
          <FlatList
            data={this.state.usuarios}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.userDetails}>
                <Text style={styles.userName}>
                  Bienvenido {item.data.name}!
                </Text>
                {item.data.fotoPerfil != '' ? (
                  <Image
                    source={item.data.fotoPerfil}
                    style={styles.img}
                    resizeMode="contain"
                  />
                ) : (
                  ''
                )}
                <Text style={styles.userInfoText}>
                  Tu email: {item.data.owner}
                </Text>
                {item.data.minibio ? (
                  <Text style={styles.userInfoText}>
                    Tu minibio: {item.data.minibio}
                  </Text>
                ) : (
                  ''
                )}
              </View>
            )}
          />
        </View>

        <Text style={styles.title}>Tus posteos</Text>
        <Text style={styles.userInfoText}>
          Cantidad: {this.state.posteos.length}{' '}
        </Text>
        <FlatList
          data={this.state.posteos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <>
              <Post
                navigation={this.props.navigation}
                data={item.data}
                id={item.id}
              />
              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() => this.borrarPosteo(item.id)}>
                <Text style={styles.btnText}>Borrar posteo</Text>
              </TouchableOpacity>
            </>
          )}
        />

        <View style={styles.btnContainer}>
          <View style={styles.logoutDeleteContainer}>
            <TouchableOpacity
              style={styles.signoutBtn}
              onPress={() => this.logout()}>
              <Text style={styles.cerrarSesion}>Cerrar sesión</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={() => this.eliminarPerfil()}>
              <Text style={styles.btnText}>Eliminar Perfil</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.changePassBtn}
            onPress={() =>
              this.setState((prevState) => ({
                isChangingPassword: !prevState.isChangingPassword,
              }))
            }>
            <Text style={styles.btnText}>
              {this.state.isChangingPassword
                ? 'Cancelar Cambio Contraseña'
                : 'Cambiar Contraseña'}
            </Text>
          </TouchableOpacity>

          {this.state.isChangingPassword ?
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.input}
                placeholder="Contraseña actual"
                value={this.state.currentPassword}
                secureTextEntry={true}
                onChangeText={(text) => {
                  this.setState({
                    currentPassword: text,
                  });
                }}
              />
              <TextInput
                style={styles.input}
                placeholder="Nueva contraseña"
                value={this.state.newPassword}
                secureTextEntry={true}
                onChangeText={(text) => {
                  this.setState({
                    newPassword: text,
                  });
                }}
              />
              <TouchableOpacity
                style={styles.changePassBtn}
                onPress={() => this.cambiarContraseña()}>
                <Text style={styles.btnText}>Cambiar contraseña</Text>
              </TouchableOpacity>
            </View>
            :
            ''
          }
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
    textAlign: 'center',
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
  changePassBtn: {
    backgroundColor: 'green',
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
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  logoutDeleteContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  passwordContainer: {
    marginBottom: 10,
  },
  userInfoText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#fff',
    textAlign: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'lightgray',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    color: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  changePassBtn: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  }
});
