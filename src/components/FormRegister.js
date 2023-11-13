import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import { auth, db } from '../firebase/config';

class FormRegister extends Component {
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
    };
  }

  registrarUsuario(name, email, password) {
    if (this.state.name == '') {
      this.setState({
        errors: {
          ...this.state.errors,
          errorName: 'Ingresa un nombre válido',
        },
      });
    } else if (this.state.mail == '' || this.state.mail.includes('@') == false) {
      this.setState({
        errors: {
          ...this.state.errors,
          errorMail: 'Verifica que el correo electrónico sea válido',
        },
      });
    } else if (this.state.password == '' || this.state.password.length < 6) {
      this.setState({
        errors: {
          ...this.state.errors,
          errorPassword: 'La contraseña no puede estar vacía y debe tener más de 6 caracteres',
        },
      });
    } else
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((user) =>
          db.collection('users').add({
            owner: this.state.mail,
            createdAt: Date.now(),
            name: this.state.name,
            minibio: this.state.minibio,
            fotoPerfil: this.state.fotoPerfil,
          })
        )
        .then((resp) => console.log(resp))
        .catch((err) => {
          console.log(err);
          this.setState({ mailExiste: err.message });
        });
  }

  render() {
    return (
      <View>
        <Text style={styles.title}>Regístrate en ReSports: Remeras Usadas</Text>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Ingresa tu nombre"
            placeholderTextColor="white" 
            keyboardType="default"
            onChangeText={(text) => this.setState({ name: text, errors: { ...this.state.errors, errorName: '' } })}
          />
          {this.state.errors.errorName != '' ? <Text style={styles.errorText}>{this.state.errors.errorName}</Text> : ''}

          <TextInput
            style={styles.input}
            placeholder="Ingresa tu correo electrónico"
            placeholderTextColor="white"  
            keyboardType="email-address"
            onChangeText={(text) => this.setState({ mail: text, errors: { ...this.state.errors, errorMail: '' } })}
          />
          {this.state.errors.errorMail != '' ? <Text style={styles.errorText}>{this.state.errors.errorMail}</Text> : ''}
          {this.state.mailExiste != '' ? <Text style={styles.errorText}>{this.state.mailExiste}</Text> : ''}

          <TextInput
            style={styles.input}
            placeholder="Crea una minibio"
            keyboardType="default"
            value={this.state.minibio}
            onChangeText={(text) => this.setState({ minibio: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Ingresa tu contraseña"
            keyboardType="default"
            value={this.state.password}
            secureTextEntry={true}
            onChangeText={(text) =>
              this.setState({ password: text, errors: { ...this.state.errors, errorPassword: '' } })
            }
          />
          {this.state.errors.errorPassword != '' ? (
            <Text style={styles.errorText}>{this.state.errors.errorPassword}</Text>
          ) : (
            ''
          )}

          <TextInput
            style={styles.input}
            placeholder="Ingresa tu foto de perfil"
            keyboardType="default"
            value={this.state.fotoPerfil}
            onChangeText={(text) => this.setState({ fotoPerfil: text })}
          />

          <Text style={styles.textLink}>
            ¿Ya tienes una cuenta?
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
              <Text style={styles.link}> Inicia sesión aquí!</Text>
            </TouchableOpacity>
          </Text>

          {this.state.password == '' || this.state.mail == '' || this.state.name == '' ? (
            ''
          ) : (
            <TouchableOpacity
              onPress={() => this.registrarUsuario(this.state.name, this.state.mail, this.state.password)}
              style={styles.btn}
            >
              <Text style={styles.textBtn}>Regístrame ahora!!</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,  
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',  
  },
  input: {
    borderWidth: 1,
    borderColor: 'white',
    marginBottom: 24,
    padding: 10,
    borderRadius: 8,
    color: 'white', 
  },
  btn: {
    backgroundColor: 'black',
    padding: 16,
    borderRadius: 8,
  },
  textBtn: {
    color: 'white',
  },
  textLink: {
    marginBottom: 24,
    fontSize: 16,  
    fontWeight: 'bold', 
    color: 'white',
  },
  link: {
    color: 'yellow',
  },
  errorText: {
    color: 'white',
  },
});

export default FormRegister