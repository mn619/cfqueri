import React, { Component } from 'react';

class Background extends Component{
constructor(props, context){
    super(props, context);
}


render() {

	if(this.props.query.handle === '' || this.props.query.tag === ''){
		return(
			<div className="alert alert-secondary" role="alert">
  				Hello There! Enter the handle and problem tag to view accepted submissions.
			</div>
		)
	}
	let problems = this.props.problems.map((problem) => {
	    var id = problem['id'];
		var problemId = problem['problemId'];
		var problemName = problem['problemName'];
		var problemRating = problem['problemRating'];
		var problemLink = problem['problemLink'];
		
		var submissionUnixTime = problem['submissionUnixTime'];
		var a = new Date(submissionUnixTime * 1000);
		var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  		var year = a.getFullYear();
  		var month = months[a.getMonth()];
	    
	    //if(problem['problemsTags'].include(this.props.query.tag))
	    return(
	        <div key = {id} className = "list-group">
	            <ul className ="list-group list-group-horizontal">
	              <a href = {problemLink}  style={{width:"50%"}}>
	                  <li className ="list-group-item">
	                    {problemId} {problemName}
	                  </li>
	              </a>
	              <li className ="list-group-item" style={{width:"80px"}}>
	                {problemRating}
	              </li>
	              <li className ="list-group-item" style={{width:"170px"}}>
	                {month} {year}
	              </li>
	              
	            </ul>
	        </div>
	    )
	    //else return null;
	})
	
	problems = problems.filter( function (obj){
	        	return obj  !== null;
	});
	        
    return (
            <div>	
		    	<div className="alert alert-info" role="alert">
	  				Handle : {this.props.query.handle} ProblemTag : {this.props.query.tag}
				</div>
				<ul className ="list-group list-group-horizontal">
		            <li className ="list-group-item" style={{width:"50%"}}>
		              Problem
		            </li>
		            <li className ="list-group-item" style={{width:"80px"}}>
		              Rating
		            </li>
		            <li className ="list-group-item" style={{width:"170px"}}>
	                Submission Time
	              </li>
		        </ul>
		        <div className="container3">
		            {problems}
		        </div>
        	</div>
    )
}
}
export default Background;
