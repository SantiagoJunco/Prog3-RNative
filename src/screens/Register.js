import React, { Component } from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { auth, db } from '../firebase/config';
import FormRegister from '../components/FormRegister';
import CamaraPost from '../components/CamaraPost';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      mail: '',
      password: '',
      minibio: '',
      fotoPerfil: '',
      errors: {
        errorName: '',
        errorPassword: '',
        errorMail: '',
      },
      mailExiste: '',
      step1: true,
      userId: '',
      loading: true // Electiva loader
    };
  }
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
        this.setState({ loading: false });

        if (user !== null) {
            this.props.navigation.navigate('TabNavigation');
        }
    });
}

  registrarUsuario = (name, email, password) => {
    if (this.state.name === '') {
      this.setState({
        errors: {
          ...this.state.errors,
          errorName: 'Ingresa un nombre válido',
        },
      });
    } else if (this.state.mail === '' || this.state.mail.includes('@') === false) {
      this.setState({
        errors: {
          ...this.state.errors,
          errorMail: 'Verifica que el correo electrónico sea válido',
        },
      });
    } else if (this.state.password === '' || this.state.password.length < 6) {
      this.setState({
        errors: {
          ...this.state.errors,
          errorPassword: 'La contraseña no puede estar vacía y debe tener más de 6 caracteres',
        },
      });
    } else {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((user) =>{
          db.collection('users')
          .add({
            owner: this.state.mail,
            createdAt: Date.now(),
            name: this.state.name,
            minibio: this.state.minibio,
            fotoPerfil: this.state.fotoPerfil
          })
            .then((resp) =>{
              this.setState({
                userId: resp.id,
              })
              this.props.navigation.navigate('TabNavigation')
            }
            )
          }
        )
        .catch((err) => {
          console.log(err);
          this.setState({ mailExiste: err.message });
        });
    }
  };

  actualizarFotoUrl(url) {
    this.setState({
      fotoPerfil: url

    }, () => this.saveImg(this.state.fotoPerfil) )
  }
  mostrarCamara() {
    this.registrarUsuario(this.state.name, this.state.mail, this.state.password)
    this.setState({
      name: '',
      mail: '',
      password: '',
      minibio: '',
      fotoPerfil: '',
      errors: {
        errorName: '',
        errorPassword: '',
        errorMail: '',
      },
      mailExiste: '',
      step1: false,
      userId: '',
    })
  }

  saveImg(url){
    console.log('usa el save')
    db
    .collection('users')
    .doc(this.state.userId)
    .update({
        fotoPerfil: url
    })
    .then((resp) =>{
      this.setState({
        fotoPerfil: '',
        step1: false
      }, ()=> this.props.navigation.navigate('TabNavigation'))
      
    })
    .catch((err) => console.log(err))
}

  render() {
    if (this.state.loading) {
      return (
          <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="blue" />
          </View>
      );
  }
    return (
      <View style={styles.container}>
        {this.state.step1 ?
          <FormRegister
            state={this.state}
            handleInputChange={(field, value) => this.setState({ [field]: value })}
            registrarUsuario={() => this.registrarUsuario(this.state.name, this.state.mail, this.state.password)}
            mostrarCamara={() => this.mostrarCamara()}
            navigation={this.props.navigation}
          />
         :
          <> 
          <CamaraPost actualizarFotoUrl={(url) => this.actualizarFotoUrl(url)} saveImg ={(url) => this.saveImg(url)} />
          </>
        }
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#2980B9',
  },
});