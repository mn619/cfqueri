import React, {Component} from 'react';
import Background from './Background';
import Form from './Form';

class App extends Component {
 state ={
 		query:[{
        	handle: null,
        	tag: null,
        }],
        problems: []
    }
    addQuery = (e) =>{
    	this.setState({query: e});
    	
    	var handle = e.handle;
    	var tag = e.tag;
		var problems = [];
    	var apiAddress = 'https://codeforces.com/api/user.status?handle=' + handle;

		fetch(apiAddress)
		.then(results => {
		    return results.json();
		}).then(data => {
	    	problems = data.result.map((problem) => {
				var contestId = problem['problem']['contestId'] !== undefined? problem['problem']['contestId'].toString(): 0
				var problemId = problem['problem']['contestId'] !== undefined? problem['problem']['contestId'].toString() + problem['problem']['index'].toString(): 0;
				var problemName = problem['problem']['name'];
				var problemIndex = problem['problem']['index'].toString();
				var problemRating = problem['problem']['rating'] !== undefined? problem['problem']['rating'].toString(): -1;

				var link = 'http://codeforces.com/problemset/problem/' + contestId + "/" + problemIndex;
			   	if(problem['verdict'] === 'OK' && ('tags' in problem['problem']) && (problem['problem']['tags'].includes(tag))){
			   		return ({contestId: contestId, problemId : problemId, problemName: problemName, problemIndex: problemIndex, problemRating: problemRating, problemLink: link});
			   	}
			   	else return null;
			})

	    	//filter the null elements
	        problems = problems.filter( function (obj){
	        	return obj  !== null;
	        });
	        
	        var uniqueProblems = [];
	        problems.forEach(problem => {
			  if (!uniqueProblems.some(p => p.problemId === problem.problemId)) {
				uniqueProblems.push({ ...problem })
			  }
			});
			
			problems = uniqueProblems;
			
	        this.setState({problems: problems});
		})
	}
	
	render(){
		return (
			<div className="App">
			<Form  getQuery={this.addQuery} />
			<br/>
			<Background problems={this.state.problems} query={this.state.query} />
			</div>
		)
	}
}

export default App;
