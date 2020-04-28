import React, { Component } from 'react';

class Background extends Component{
constructor(){
    super();
    this.state = {
        problems: [],
    };
}


componentDidUpdate(prevProps){
    var handle = this.props.queri.handle;
    var tag = this.props.queri.tag;

    var apiAddress = 'https://codeforces.com/api/user.status?handle=' + handle; 
	
    fetch(apiAddress)
    .then(results => {
        return results.json();
    }).then(data => {
        // console.log(data.result);
        let problems = data.result.map((problem) => {
            var problemId = problem['problem']['contestId'] !== undefined? problem['problem']['contestId'].toString(): 0;
            var problemName = problem['problem']['name'];
            var problemIndex = problem['problem']['index'].toString();
            var problemRating = problem['problem']['rating'] !== undefined? problem['problem']['rating'].toString(): -1;

            var link = 'http://codeforces.com/problemset/problem/' + problemId + "/" + problemIndex;
            if(problem['verdict'] === 'OK' && ('tags' in problem['problem']) && (problem['problem']['tags'].includes(tag)))
            return(
                <div key = {problem.id}>
                    <a href = {link}>{problemName} </a>
                    <div> {problemRating} {problemId}</div>
                </div>
            )
            else return null;
        })
        
        //filter the null elements
        problems = problems.filter( function (obj){
        	return obj  !== null;
        });
        
        //if the query change, we update current state
        if(prevProps.queri !== this.props.queri)
        this.setState({problems: problems});
    })
}

render() {
    return (
        <div className="container2">
            <div className="container1">
                {this.state.problems}
            </div>
        </div>
    )
}
}
export default Background;

