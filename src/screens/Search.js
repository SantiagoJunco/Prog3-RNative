import React, { Component } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FormSearch from '../components/FormSearch';
import { db, auth } from '../firebase/config';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuarios: [],
      backup: [],
      valor: ''
    };
  }

  componentDidMount() {
    db.collection('users').onSnapshot((docs) => {
      let usuarios = [];
      docs.forEach((doc) => {
        usuarios.push({ id: doc.id, data: doc.data() });
      });
      this.setState({ usuarios, backup: usuarios });
    });
  }

  filtrarUsuarios(name) {
    let usuariosFiltrados = this.state.backup.filter(
      (elm) => 
      elm.data.name.toLowerCase().includes(name.toLowerCase())
      ||
      elm.data.owner.toLowerCase().includes(name.toLowerCase()) // electiva filtrado avanzado
    );
    this.setState({
      usuarios: usuariosFiltrados,
    });
  }
  actualizarInput(valor) {
    this.setState({
      valor: valor
    });
  }

  irAlPerfil(owner) {
    owner == auth.currentUser.email ?
      this.props.navigation.navigate('MyProfile')
      :
      this.props.navigation.navigate('UserProfile', { user: owner })
  }

  render() {
    return (
      <View style={styles.container}>
        <FormSearch filtrarUsuarios={(nombre) => this.filtrarUsuarios(nombre)} actualizarInput={(valor) => this.actualizarInput(valor)} />
        {this.state.valor != '' ? (
          this.state.usuarios.length != 0 ?
            <FlatList
              data={this.state.usuarios}
              renderItem={({ item }) =>
                <View style={styles.usuarioItem}>
                  <TouchableOpacity onPress={() => this.irAlPerfil(item.data.owner)}>
                    <Text style={styles.userName}>{item.data.name}</Text>
                    <Text style={styles.userOwner}>{item.data.owner}</Text>
                  </TouchableOpacity>
                </View>}
              keyExtractor={(item) => item.id.toString()}
            />
            :
            <Text style={styles.text}>No se han encontrado resultados</Text>
        ) : (
          <Text style={styles.text}>Busca un usuario</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  usuarioItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center'
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5
  },
  userOwner: {
    fontSize: 16,
    color: 'gray'
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold'
  }
});