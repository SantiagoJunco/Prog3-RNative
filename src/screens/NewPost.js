import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../firebase/config'
import FormNewPost from '../components/FormNewPost'
export default class NewPost extends Component {


  onSubmit({
    descripcion
  }){
    db.collection('posts').add(
      {
        owner: auth.currentUser.email,
        createdAt:Date.now(),
        descripcion:descripcion, // tambien la imagen aca
        likes:[],
        comentarios: []
      }
    )
    .catch((err) => console.log(err))

  }
  render() {
    return (
      <View>
        <Text>Crea aquí tu nuevo posteo!</Text>
        <FormNewPost
        onSubmit={(obj)=> this.onSubmit(obj)}
        />
      </View>
    )
  }
}