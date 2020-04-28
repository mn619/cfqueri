import React, { Component } from 'react';

class Background extends Component{
constructor(){
    super();
    this.state = {
        query: [],
        problems: [],
    };
}


componentDidUpdate(prevProps){
    var handle = this.props.query.handle;
    var tag = this.props.query.tag;

    var apiAddress = 'https://codeforces.com/api/user.status?handle=' + handle; 
	
    fetch(apiAddress)
    .then(results => {
        return results.json();
    }).then(data => {
        // console.log(data.result);
        let problems = data.result.map((problem) => {
            var contestId = problem['problem']['contestId'] !== undefined? problem['problem']['contestId'].toString(): 0
            var problemId = problem['problem']['contestId'] !== undefined? problem['problem']['contestId'].toString() + problem['problem']['index'].toString(): 0;
            var problemName = problem['problem']['name'];
            var problemIndex = problem['problem']['index'].toString();
            var problemRating = problem['problem']['rating'] !== undefined? problem['problem']['rating'].toString(): -1;

            var link = 'http://codeforces.com/problemset/problem/' + contestId + "/" + problemIndex;
            if(problem['verdict'] === 'OK' && ('tags' in problem['problem']) && (problem['problem']['tags'].includes(tag)))
            return(
                <div key = {problem.id} className = "list-group">
                    <ul className ="list-group list-group-horizontal">
                      <a href = {link}  style={{width:"50%"}}>
                          <li className ="list-group-item">
                            {problemId} {problemName}
                          </li>
                      </a>
                      <li className ="list-group-item" style={{width:"80px"}}>
                        {problemRating}
                      </li>
                    </ul>
                </div>
            )
            else return null;
        })
        
        //filter the null elements
        problems = problems.filter( function (obj){
        	return obj  !== null;
        });
        
        //if the query change, we update current state
        if(prevProps.query !== this.props.query)
        this.setState({query: this.props.query})
        this.setState({problems: problems});
    })
}

render() {
    return (
        <div className="container1">
            <div class="alert alert-dark" role="alert">
              Handle : {this.state.query.handle} ProblemTag : {this.state.query.tag}
            </div>
            <div className="container3">
                {this.state.problems}
            </div>
        </div>
    )
}
}
export default Background;