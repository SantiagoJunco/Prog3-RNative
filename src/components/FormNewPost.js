import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'

export default class FormDescripcionPost extends Component {
    constructor(props){
        super(props)
        this.state ={
            descripcionPost : ''
        }
    }
  render() {
    return (
      <View>
        <Text>Describí tu post</Text>
        <View>
            
            <TextInput
            placeholder='Agregá acá la descripcion de tu post' // arriba falta textInput pa la imagen
            onChangeText={(text)=> this.props.actualizarDescripcion(text)}
            value={this.props.estadoDescripcion}
            style={styles.input}
            multiline={true}
            numberOfLines={8}
            />
            
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    input:{
        borderWidth:1,
        borderColor:'red'
    },
    btn:{
        borderWidth:1,
        borderColor:'green'
    }
})