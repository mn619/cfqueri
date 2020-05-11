import React, { Component } from 'react';

class Background extends Component{
constructor(props, context){
    super(props, context);
}


render() {
	let problems = this.props.problems.map((problem) => {
	    return(
	        <div key = {problem.problemId} className = "list-group">
	            <ul className ="list-group list-group-horizontal">
	              <a href = {problem.problemLink}  style={{width:"50%"}}>
	                  <li className ="list-group-item">
	                    {problem.problemId} {problem.problemName}
	                  </li>
	              </a>
	              <li className ="list-group-item" style={{width:"80px"}}>
	                {problem.problemRating}
	              </li>
	            </ul>
	        </div>
	    )
	})
    return (
            <div>
        <div className="container1">
              Handle : {this.props.query.handle} ProblemTag : {this.props.query.tag}
            </div>
            <div className="container3">
                {problems}
            </div>
        </div>
    )
}
}
export default Background;
