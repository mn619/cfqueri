import React, {Component} from 'react';
import Background from './Background';
import Form from './Form';

class App extends Component {
 state ={
        handle: null,
        tag: null,
    }
    addQuery = (e) =>{
    	this.setState(e);
    }
    
  render(){
    return (
      <div className="App">
      <Form getQuery = {this.addQuery}/>
      <br/>
      <Background query = {this.state} />
      </div>
    );
  }
}

export default App;
