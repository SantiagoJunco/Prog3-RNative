import React, { Component } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

export default class FormSearch extends Component {
  constructor(props) {
    super(props);
  }

  evitarSubmit(evento) {
    evento.preventDefault();
  }

  controlarCambios(texto) {
    this.props.actualizarInput(texto);
    this.props.filtrarUsuarios(texto);
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.busqueda}
          placeholder="Búsqueda"
          name="busqueda"
          onChangeText={(text) => this.controlarCambios(text)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    width: '100%',
    backgroundColor: 'white',  
    borderRadius: 10,  
    marginBottom: 20
  },
  busqueda: {
    height: 40,
    borderColor: '#2980B9', 
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    width: '100%',
    color: '#2980B9',
  },
});
