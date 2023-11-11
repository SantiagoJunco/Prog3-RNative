import React, { Component } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

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
        <Button
          title="Buscar"
          onPress={(evento) => this.evitarSubmit(evento)}
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
  },
  busqueda: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    width: '100%',
  },
});