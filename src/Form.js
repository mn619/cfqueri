import React, { Component } from 'react';

class Form extends Component{
    state ={
        handle: '',
        tag: '',
        ratingLow: -1,
        ratingHigh: 10000
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
		  <div className = "form-row">
		  	<div className="form-group col-md-6">
				<label htmlFor="Handle" id = "handle"> Handle </label>
				<input type="text" className="form-control" id="handle" aria-describedby="handle" onChange={this.handleChange}/>
			</div>
			<div className="form-group col-md-6">
				<label htmlFor = "Tag" id = "tag"> Problem Tag </label>
				<input type="text" className ="form-control" id="tag" aria-describedby="handle" onChange={this.handleChange} />
		  	</div>
		  </div>
		  
		  <div className = "form-row">
		  	<div className="form-group col-md-6">
				<label htmlFor="ratingLow" id = "ratingLow"> Difficulty Above </label>
				<input type="text" className="form-control" id="ratingLow" aria-describedby="handle" onChange={this.handleChange}/>
			</div>
			<div className="form-group col-md-6">
				<label htmlFor = "RatingHigh" id = "ratingHigh"> Difficulty Below </label>
				<input type="text" className ="form-control" id="ratingHigh" aria-describedby="handle" onChange={this.handleChange} />
		  	</div>
		  </div>
		  
		  <button type="submit" className="btn btn-primary">Submit</button>
		</form>     
        )
       
       
    }
}

export default Form;
