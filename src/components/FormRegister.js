import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

class FormRegister extends Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    const {
      name,
      mail,
      password,
      minibio,
      errors,
      mailExiste,
    } = this.props.state;
    return (
      <View>
        <Text style={styles.title}>Regístrate en ReSports: Remeras Usadas</Text>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Ingresa tu nombre"
            placeholderTextColor="white"
            keyboardType="default"
            onChangeText={(text) =>
              this.props.handleInputChange('name', text)
            }
          />
          {errors.errorName !== '' ? (
            <Text style={styles.errorText}>{errors.errorName}</Text>
          ) : (
            ''
          )}

          <TextInput
            style={styles.input}
            placeholder="Ingresa tu correo electrónico"
            placeholderTextColor="white"
            keyboardType="email-address"
            onChangeText={(text) =>
              this.props.handleInputChange('mail', text)
            }
          />
          {errors.errorMail !== '' ? (
            <Text style={styles.errorText}>{errors.errorMail}</Text>
          ) : (
            ''
          )}
          {mailExiste !== '' ? (
            <Text style={styles.errorText}>{mailExiste}</Text>
          ) : (
            ''
          )}

          <TextInput
            style={styles.input}
            placeholder="Crea una minibio"
            keyboardType="default"
            value={minibio}
            onChangeText={(text) =>
              this.props.handleInputChange('minibio', text)
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Ingresa tu contraseña"
            keyboardType="default"
            value={password}
            secureTextEntry={true}
            onChangeText={(text) =>
              this.props.handleInputChange('password', text)
            }
          />
          {errors.errorPassword !== '' ? (
            <Text style={styles.errorText}>{errors.errorPassword}</Text>
          ) : (
            ''
          )}

          <Text style={styles.textLink}>
            ¿Ya tienes una cuenta?
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Login')}
            >
              <Text style={styles.link}> Inicia sesión aquí!</Text>
            </TouchableOpacity>
          </Text>

          {password === '' || mail === '' || name === '' ? (
            ''
          ) : (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => this.props.registrarUsuario(name, mail, password, true)}
                style={styles.btn}
              >
                <Text style={styles.textBtn}>Regístrame ahora!!</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.props.mostrarCamara()
                }}
                style={[styles.btn, { marginTop: 16 }]}  
              >
                <Text style={styles.textBtn}>Tomar foto ahora!!</Text>
              </TouchableOpacity>
            </View>
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
  buttonContainer: {
    marginTop: 16,
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

export default FormRegister;