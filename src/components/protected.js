import React, { Component } from 'react';

export default function Protected(ProtectedComponent){
  return class extends Component{
    constructor(props){
      super(props)
      if(!window.localStorage.getItem('jwt')){
        this.props.history.push('/')
      }
    }
    render(){
      return (
        <ProtectedComponent {...this.props} />
      )
    }
  }
}