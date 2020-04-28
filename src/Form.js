import React, { Component } from 'react';

class Form extends Component{
    state ={
        handle: null,
        tag: null,
    }
    handleChange = (e) =>{
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) =>{
        e.preventDefault();
        this.props.getQueri(this.state);
    }
    render(){
        return(
        <form onSubmit={this.handleSubmit}>
		  <div class="form-group">
			<label for="Handle" id = "handle"> Handle </label>
			<input type="text" class="form-control" id="handle" aria-describedby="handle" onChange={this.handleChange}/>
			<small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
		  </div>
		  
		  <div class="form-group">
			<label for="Tag" id = "tag"> Problem Tag </label>
			<input type="text" class="form-control" id="tag" aria-describedby="handle" onChange={this.handleChange} />
			<small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
		  </div>
		  
		  <button type="submit" class="btn btn-primary">Submit</button>
		</form>
		
             
        )
    }
}

export default Form;
