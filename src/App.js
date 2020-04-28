import React, {Component} from 'react';
import Background from './Background';
import Form from './Form';

class App extends Component {
 state ={
        handle: null,
        tag: null,
    }
    addQueri = (e) =>{
    	this.setState(e);
    }
    
  render(){
    return (
      <div className="App">
      <Form getQueri = {this.addQueri}/>
      <Background queri = {this.state} />
      </div>
    );
  }
}

export default App;
