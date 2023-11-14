import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { Component } from 'react'
import { Camera } from 'expo-camera'
import { storage } from '../firebase/config'

export default class CamaraPost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mostrarCamara: true,
            permisos: false,
            urlTemp: ''
        }
        this.metodosDeCamara = null
    }

    componentDidMount() {
        Camera.requestCameraPermissionsAsync()
            .then((resp) => this.setState({ permisos: true }))
            .catch((err) => console.log(err))
    }

    tomarFoto() {
        this.metodosDeCamara.takePictureAsync()
            .then((imgTemporal) => this.setState({ urlTemp: imgTemporal.uri, mostrarCamara: false }))
            .catch((err) => console.log(err))
    }

    rechazarFoto() {
        this.setState({
            mostrarCamara: true,
            urlTemp: ''
        })
    }

    aceptarFoto() {
        fetch(this.state.urlTemp)
            .then(resp => resp.blob())
            .then(img => {
                const ref = storage.ref(`fotos/${Date.now()}.jpg`)
                ref.put(img)
                    .then(resp => {
                        ref.getDownloadURL()
                            .then((url) => this.props.actualizarFotoUrl(url))
                    })
                    .catch((err) => console.log(err))
            })
            .catch((err) => console.log(err))
    }
    componentWillUnmount(){
        this.setState({
            mostrarCamara:false
        })
    }


    render() {
        console.log('Desde el render de camara')
        return (
            <View style={styles.container}>
                {
                    this.state.permisos && this.state.mostrarCamara ?
                        <>
                            <Camera
                                style={styles.camara}
                                type={Camera.Constants.Type.back}
                                ref={(metodosDeCamara) => this.metodosDeCamara = metodosDeCamara}
                            />
                            <TouchableOpacity onPress={() => this.tomarFoto()}>
                                <Text>
                                    Tomar foto
                                </Text>
                            </TouchableOpacity>
                        </>
                        : this.state.permisos && this.state.mostrarCamara === false ?
                            <>
                                <Image
                                    source={({ uri: this.state.urlTemp })}
                                    style={styles.img}
                                />
                                
                                <TouchableOpacity onPress={() => this.aceptarFoto()}>
                                    <Text>
                                        Aceptar foto
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity onPress={() => this.rechazarFoto()}>
                                    <Text>
                                        Rechazar foto
                                    </Text>
                                </TouchableOpacity>
                            </>
                            :
                            <Text>No tienes permisos para usar la cámara</Text>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    camara: {
        height: 300
    },
    img: {
        height: 300
    }
})