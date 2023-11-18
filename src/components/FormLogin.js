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
            .then((user) => {
                this.setState({
                    mail: '',
                    password: '',
                    errMailOrPass: '',
                    contador: 0,
                    errores: {
                        errorPassword: '',
                        errorMail: ''
                    },
                });
                this.props.navigation.navigate("TabNavigation")
            }) 
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
            <View style={styles.container}>
                <Text style={styles.title}>Logueate en ReSport: Remeras Usadas</Text>
                <View style={styles.formContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder='Introduce tu email'
                        keyboardType='email-address'
                        value={this.state.mail}
                        onChangeText={(text) => this.setState({mail: text, errores: {... this.state.errores, errorMail:''}})}
                    />
                    {this.state.errores.errorMail !== "" ? <Text style={styles.errorText}>{this.state.errores.errorMail} </Text> : ''}

                    <TextInput
                        style={styles.input}
                        placeholder='Introduce tu password'
                        keyboardType='default'
                        value={this.state.password}
                        secureTextEntry={true}
                        onChangeText={(text) => this.setState({password: text, errores: {... this.state.errores, errorPassword:''}})}
                    />
                    {this.state.errores.errorPassword !== "" ? <Text style={styles.errorText}>{this.state.errores.errorPassword} </Text> : ''}

                    {this.state.errMailOrPass !== '' ? <Text style={styles.errorText}>{this.state.errMailOrPass}</Text> : ''}

                    { this.state.mail == '' || this.state.password == ''
                    ? 
                    ''
                    :
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => this.loguearUsuario(this.state.mail, this.state.password)}
                    >
                        <Text style={styles.textBtn}>Iniciar sesión</Text>
                    </TouchableOpacity>
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#2980B9',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#fff',
    },
    formContainer: {
        width: '100%',
    },
    input: {
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 10,
        marginBottom: 24,
        padding: 10,
        color: '#fff',
    },
    btn: {
        backgroundColor: 'black',
        padding: 16,
        marginBottom: 24,
        borderRadius: 10,
    },
    textBtn: {
        color: 'white',
        textAlign: 'center',
    },
    errorText: {
        color: 'white',
        marginBottom: 10,
    },
});