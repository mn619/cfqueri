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
		
		var problemCount = 0;
		var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	  	
	  	
	  	
		let problems = this.props.problems.map((problem) => {
			var id = problem['id'];
			var problemId = problem['problemId'];
			var problemName = problem['problemName'];
			var problemRating = problem['problemRating'];
			var problemLink = problem['problemLink'];
			
			var submissionUnixTime = problem['submissionUnixTime'];
			var a = new Date(submissionUnixTime * 1000);
			var year = a.getFullYear();
	  		var month = months[a.getMonth()];
			problemCount = problemCount + 1;
			var color = "#ffffff";
			if(problemCount%2 === 1)
				color = "#f0f4f5";
			

			return(
				<tr key = {id}>
					<td>
						{problemCount}
					</td>
					
					<td>
		          		<a href = {problemLink}>
		            	    {problemId} {problemName}
			         	</a>
					</td>
			        <td>
			         	{problemRating}
			        </td>
			        <td>
						{month} {year}
			        </td>
				</tr>
			)
		})
			  	
		return(
			<div>
				<div>
	  				Handle : <b style={{color: this.props.query.HandleColor}}> {this.props.query.handle} </b> ProblemTag : <b> {this.props.query.tag} </b>
				</div>
				<table className="table table-striped table-bordered">
					<thead>
					  <tr>
						<th>#</th>
						<th>Problem</th>
						<th>Rating</th>
						<th>Submission Time</th>
					  </tr>
					</thead>
					<tbody>
					  {problems}
					</tbody>
				</table>
			</div>
		)
	}
}
export default Background;
