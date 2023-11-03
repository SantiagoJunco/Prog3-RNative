import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { auth } from '../firebase/config'

export default class FormLogin extends Component {
    constructor(props){
        super(props)
        this.state = {
            mail:'',
            password: '',
            errMailOrPass: '',
            contador: 0,
            errores: {
                errorPassword: "",
                errorMail: ""
            },
        }
    }

    loguearUsuario(mail, password){
        if (this.state.mail == "" || this.state.mail.includes("@") == false) {
            this.setState({
                errores: {
                    ...this.state.errores,
                    errorMail: "Chequeá que el mail sea valido."
                }
            })
        }
        else if (this.state.password == "" || this.state.password.length < 6) {
            this.setState({
                errores: {
                    ...this.state.errores,
                    errorPassword: "La contraseña no puede estar vacía y debe tener más de 6 caracteres"
                }
            })
        } else {
            auth.signInWithEmailAndPassword(mail, password)
            .then((user) => this.props.navigation.navigate("TabNavigation")) // aca home
            .catch((err) => {console.log(err), this.setState({
                errMailOrPass: this.state.contador > 0
                ? `Ups! Tu email o la contraseña son incorrectos (${this.state.contador + 1} intento)`
                : 'Ups! Tu email o la contraseña son incorrectos',
                contador: this.state.contador + 1
            })})
        }
    }

  render() {
    return (
      <View>
        <Text>Logueate en IPHONIFY</Text>
        <View>
                <TextInput
                    style = {styles.input}
                    placeholder = 'Introduce tu email'
                    keyboardType = 'email-address'
                    value = {this.state.mail}
                    onChangeText = { (text) => this.setState({mail: text, errores: {... this.state.errores, errorMail:''}}) }
                />
                 {this.state.errores.errorMail !== "" ? <Text>{this.state.errores.errorMail} </Text> : ''}

                <TextInput
                    style = {styles.input}
                    placeholder = 'Introduce tu password'
                    keyboardType = 'default'
                    value = {this.state.password}
                    secureTextEntry={true}
                    onChangeText = { (text) => this.setState({password: text, errores: {... this.state.errores, errorPassword:''}}) }
                />
               {this.state.errores.errorPassword !== "" ? <Text>{this.state.errores.errorPassword} </Text> : ''}

               {this.state.errMailOrPass !== '' ? <Text>{this.state.errMailOrPass}</Text> : ''}


                 { this.state.mail == '' || this.state.password == ''
                 ? 
                 ''
                 :
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => this.loguearUsuario(this.state.mail, this.state.password)}
                >
                    <Text>Iniciar sesión</Text>
                </TouchableOpacity>
                }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    input:{
        borderWidth: 1,
        borderColor: 'green',
        marginBottom: 24
    },
    btn:{
        backgroundColor:'purple',
        padding:16,
        marginBottom: 24
    },
    textBtn:{
        color:'white'
    }
})
