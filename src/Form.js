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
        this.props.getQuery(this.state);
    }
    render(){
        return(
        <form onSubmit={this.handleSubmit}>
		  <div className = "form-group">
			<label htmlFor="Handle" id = "handle"> Handle </label>
			<input type="text" className="form-control" id="handle" aria-describedby="handle" onChange={this.handleChange}/>
		  </div>
		  
		  <div className="form-group">
			<label htmlFor = "Tag" id = "tag"> Problem Tag </label>
			<input type="text" className ="form-control" id="tag" aria-describedby="handle" onChange={this.handleChange} />
		  </div>
		  
		  <button type="submit" className="btn btn-primary">Submit</button>
		</form>     
        )
    }
}

export default Form;
