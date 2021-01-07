import React , {Fragment} from 'react';
import { Helmet } from 'react-helmet';
import CheckCircleOutlineIcon from 'mdi-react/CheckCircleOutlineIcon';
import {Link} from "react-router-dom";

export class Quizsummary extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            score: 0,
            percent: 0,
            numberOfQues: 15,
            numberOfAnswered: 0,
            correctAnswers: 0,
            wrongAnswers: 0
        };
    }

    componentDidMount(){
        const { state } = this.props.location;
        if(state){
            this.setState({
            score: state.score,
            percent: (state.score / state.numberOfQues)*100,
            //numberOfQues: state.numberOfQues,
            numberOfAnswered: state.numberOfAnswered,
            correctAnswers: state.correctAnswers,
            wrongAnswers: state.wrongAnswers
        });
    }}
    
    render(){
        const { state} = this.props.location;
        const {percent} = this.state;
        let stats,remark;

        if(percent <= 30){
            remark = 'You need more practice!';
        }
        else if(percent <=50){
            remark = 'Better luck next time!';
        }
        else if(percent <=70){
            remark = 'You can do better!';
        }
        else if(percent <=85){
            remark = 'You did great!';
        }
        else{
            remark = "You're a genius!";
        }


        if (state !== undefined){
           stats = (
            <Fragment>
            <div className="main-container">
               <div style={{ textAlign: 'center' }}>
                   <span className="success-icon"><CheckCircleOutlineIcon color='#00cc00' size={100}/></span>
               </div>
               <h1 id='h1'>Quiz Completed!</h1>
               <div className="container stats">
                   <h4>{remark}</h4>
                   <h2>Your Score: {this.state.percent.toFixed(0)}%</h2>

                   <span className="stat-left">Number of Attempted Questions</span>
                   <span className="stat-right">{this.state.numberOfAnswered}/{this.state.numberOfQues}</span>
                   <br/>

                   <span className="stat-left">Number of Correct Answers</span>
                   <span className="stat-right">{this.state.correctAnswers}</span>
                   <br/>

                   <span className="stat-left">Number of Wrong Answers</span>
                   <span className="stat-right">{this.state.wrongAnswers}</span>
                </div>
                <section>
                    <ul>
                    <li><Link to="/mainscreen">Home</Link></li>
                    <li><Link to="/categories">Play Again</Link></li>
                    </ul>
                </section>
            </div>
            </Fragment>
           )
        }

        else{
            stats = (
                <section>
                <h1 className="no-stats">No Stats Available</h1>
                <ul>
                <li><Link to="/mainscreen">Home</Link></li>
                <li><Link to="/mainscreen">Take Quiz</Link></li>
                </ul>
                </section>
            );
        }



        return(
        <Fragment>
            <Helmet><title>Summary</title></Helmet>
            <div className="quiz-summary">
            {stats}
            </div>
        </Fragment>
        );
    }
}