import { Text, View, FlatList } from 'react-native'
import React, { Component } from 'react'
import FormComentario from '../components/FormComentario'
import { db } from '../firebase/config'

export default class Comments extends Component {
    constructor(props){
        super(props)
        this.state = {
            post: null
        }
    }
    
    componentDidMount(){
        db
        .collection('posts')
        .doc(this.props.route.params.id)
        .onSnapshot((doc)=>{
            if(doc){
            this.setState({post: doc.data()})
            }
        })
        console.log(this.state.post);
    }
  render() {
    return (
        <View>
        <Text>Comments</Text>
        {
            
                this.state.post !== null ?          
                    console.log(this.state.post)
                :
                <Text> Aún no hay comentarios en este post</Text>
            }
        <FormComentario
         postId= {this.props.route.params.id}
        />
      </View>
    )
  }
}