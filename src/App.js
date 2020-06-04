import React, {Component} from 'react';
import Background from './Background';
import Form from './Form';
import { trackPromise } from 'react-promise-tracker';

class App extends Component {
 state ={
 		query:{
        	handle: '',
        	tag: '',
        	ratingLow: -1,
        	ratingHigh: 100000
        },
        problems: []
    }
	getHandleColor(HandleRank){
		if(HandleRank === undefined)
	  		return '#000000';
	  	if(HandleRank === 'newbie')
	  		return '#CCCCCC';
	  	if(HandleRank === 'pupil')
	  		return '#77FF77';
	  	if(HandleRank === 'specialist')
	  		return '#77DDBB';
	  	if(HandleRank === 'expert')
	  		return '#AAAAFF';
	  	if(HandleRank === 'candidate master')
	  		return '#FF88FF';
	  	if(HandleRank === 'master')
	  		return '#FFCC88';	
	  	if(HandleRank === 'international master')
	  		return '#FFBB55';
		if(HandleRank === 'grandmaster')
	  		return '#FF7777';
	  	if(HandleRank === 'international grandmaster')
	  		return '#FF3333';	
		if(HandleRank === 'legendary grandmaster')
	  		return '#AA0000';	
	}
    getUnique(inputProblems){
    	var result = [];
    	for(var i = 0; i < inputProblems.length; i++){
    		if(i === 0){
    			result.push(inputProblems[i]);
    		}
    		else if(inputProblems[i]['problemId'] !== inputProblems[i - 1]['problemId']){
    			result.push(inputProblems[i]);
    		}
    	}

    	return result;
    }
    addQuery = (e) =>{
    	this.setState({query: e, problems: []});
    	var handle = e.handle.toLowerCase();
    	e.tag = e.tag.toLowerCase();
    	var apiAddress = 'https://codeforces.com/api/user.status?handle=' + handle;

		var ratingLow = (e.ratingLow === '')? -1: Number(e.ratingLow); 
    	var ratingHigh = (e.ratingHigh === '')? 10000: Number(e.ratingHigh);
    	
    	e.ratingLow = ratingLow;
    	e.ratingHigh = ratingHigh;
    	
	  	fetch('https://codeforces.com/api/user.info?handles=' + handle)
		   .then(result =>{
		   		return result.json();
		   })
		   .then(result => {
		   		e.HandleColor = this.getHandleColor(result['result'][0]['rank']);
		   });
    	const t0 = performance.now();
		trackPromise(
			fetch(apiAddress)
			.then(results => {
				return results.json();
			}).then(data => {
				var problems = data.result.map((problem) => {
					var id = problem['id'];
					var contestId = problem['problem']['contestId'] !== undefined? problem['problem']['contestId'].toString(): 0
					var problemId = problem['problem']['contestId'] !== undefined? problem['problem']['contestId'].toString() + problem['problem']['index'].toString(): 0;
					var problemName = problem['problem']['name'];
					var problemIndex = problem['problem']['index'].toString();
					var problemRating = problem['problem']['rating'] !== undefined? problem['problem']['rating'].toString():"-1";
					var submissionUnixTime = problem['creationTimeSeconds'];
					var link = 'http://codeforces.com/problemset/problem/' + contestId + "/" + problemIndex;
					var problemTags = problem['problem']['tags'];
				   	if(problem['verdict'] === 'OK' && ('tags' in problem['problem']) && (problem['problem']['tags'].includes(e.tag)) && (Number(problemRating) === -1 || ((Number(problemRating) >= ratingLow) && (Number(problemRating) <= ratingHigh)))){
						return ({id: id, contestId: contestId, problemId : problemId, problemName: problemName, problemIndex: problemIndex, problemRating: problemRating, problemLink: link, submissionUnixTime: submissionUnixTime, problemTags: problemTags});
					}
					else return null;
				})

				//filter the null elements
			    problems = problems.filter( function (obj){
			    	return obj  !== null;
			    });
			    
			    problems = this.getUnique(problems);
				const t1 = performance.now();
				console.log("time taken :", t1 - t0 , "milieconds");
				this.setState({query: e});
				this.setState({problems: problems});
			})
		);

		
	}
	
	render(){
		return (
			<div className="App">
			<Form  getQuery={this.addQuery} />
			<Background query={this.state.query} problems={this.state.problems}/>
			<br/>
			
			</div>
		)
	}
}

export default App;
