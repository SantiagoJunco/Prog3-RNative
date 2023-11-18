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
      userId: ''
    };
  }

  registrarUsuario = (name, email, password, redirigir) => {
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
      .then((user) => {
        db.collection('users')
          .add({
            owner: this.state.mail,
            createdAt: Date.now(),
            name: this.state.name,
            minibio: this.state.minibio,
            fotoPerfil: this.state.fotoPerfil
          })
          .then((resp) => {
            this.setState({
              userId: resp.id,
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
            }, () => {
              if (redirigir) {
                this.props.navigation.navigate('TabNavigation');
              }
            });
          })
      })
      .catch((err) => {
        console.log(err);
        this.setState({ mailExiste: err.message });
      });
    };
  };

  actualizarFotoUrl(url) {
    this.setState({
      fotoPerfil: url,
      step1: true
    }, () => { this.saveImg(this.state.fotoPerfil), console.log(this.state.step1) })

  }
  mostrarCamara() {
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
      this.registrarUsuario(this.state.name, this.state.mail, this.state.password, false)
      this.setState({
        step1: false
      })
    }
  }

  saveImg(url) {
    console.log('usa el save')
    db
      .collection('users')
      .doc(this.state.userId)
      .update({
        fotoPerfil: url
      })
      .then((resp) => {
        this.setState({
          fotoPerfil: '',
        },()=> this.props.navigation.navigate('TabNavigation'))
      })
      .catch((err) => console.log(err))
  }

  render() {
    
    return (
      <View style={styles.container}>
        {this.state.step1 ?
          <FormRegister
            state={this.state}
            handleInputChange={(field, value) => this.setState({ [field]: value })}
            registrarUsuario={(name, mail, password, redirigir) => this.registrarUsuario(name, mail, password, redirigir)}
            mostrarCamara={() => this.mostrarCamara()}
            navigation={this.props.navigation}
          />
          :
          <CamaraPost
            actualizarFotoUrl={(url) => this.actualizarFotoUrl(url)}
            saveImg={(url) => this.saveImg(url)} />
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