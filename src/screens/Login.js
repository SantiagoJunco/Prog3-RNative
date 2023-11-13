import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import FormLogin from '../components/FormLogin';
import { auth } from '../firebase/config';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true, // Electiva loader
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
                <View style={styles.formContainer}>
                    <FormLogin navigation={this.props.navigation} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>¿Aún no tienes una cuenta?</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
                        <Text style={styles.link}>Regístrate aquí!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
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
    formContainer: {
        width: '100%',
        marginBottom: 20,
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    link: {
        color: 'yellow',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 5,
    },    
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});