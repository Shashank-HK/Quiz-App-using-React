import React ,{Fragment} from 'react';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Helmet } from 'react-helmet';
//import Popup from "reactjs-popup";
//import { isCompositeComponentWithType } from 'react-dom/test-utils';
//import questions from '../constants/sports.json';
import isEmpty from '../utils/is-empty'

export class Playquiz extends React.Component{
    constructor(props){
        super(props);
        const category = this.props.location.state.cat;
        const questions_json = require('../constants/'+category+'.json')
        const selected_questions = this.setQuestions(questions_json)
        this.state = {
            questions: selected_questions,
            currentQuestion: {},
            prevQuestion: {},
            nextQuestion:{},
            answer:'',
            options: [],
            numberOfQues:0,
            numberOfAnswered:0,
            currentQuestionIndex:0,
            score:0,
            correctAnswers:0,
            wrongAnswers:0,
            time:{}

        };
    }

    shuffleArray(array) {
        let i = array.length - 1;
        for (; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          const temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }
        return array;
    }

    setQuestions(ques){
        let arr = [];
        let que = [];
        while(arr.length < 15){
        let r = Math.floor(Math.random() * 30);
        if(arr.indexOf(r) === -1) {
            arr.push(r);
            que.push(ques[r])
        }
        }
        return que

    }


      
    displayQuestions=(questions,currentQuestion,nextQuestion,prevQuestion)=>{
        let { currentQuestionIndex }=this.state;
        if(!isEmpty(questions)){
            questions = this.state.questions;
            currentQuestion = questions[currentQuestionIndex];
            nextQuestion = questions[currentQuestionIndex+1];
            prevQuestion =  questions[currentQuestionIndex-1];
            const answer = currentQuestion.correct_answer;
            const options = this.shuffleArray([currentQuestion.options_1,currentQuestion.options_2,currentQuestion.options_3,currentQuestion.options_4]);
            this.setState({
                currentQuestion,
                nextQuestion,
                prevQuestion,
                answer,
                options
            })

        }
    };

    componentDidMount (){
        let { questions, currentQuestion, nextQuestion, prevQuestion} = this.state;
        this.displayQuestions(questions,currentQuestion,nextQuestion,prevQuestion);
    }

    handleOptionClick = (e) =>{
        if ( e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()){
            e.target.style.backgroundColor = 'green';
            this.correctAnswer(e);
        }
        else{
            e.target.style.backgroundColor = '#BA1717';
            this.wrongAnswer(e);
        }


    }

    handleNextButtonClick = () => {
        if (this.state.nextQuestion != undefined){
            this.setState(prevState => ({
                currentQuestionIndex: prevState.currentQuestionIndex + 1,
                numberOfQues: prevState.numberOfQues + 1
            }), () => {
                this.displayQuestions(this.state.questions,this.state.currentQuestion,this.state.nextQuestion,this.state.prevQuestion);
            })
        }
        else{
            this.endGame();
        }
    }

    handleQuitButtonClick = () => {
       confirmAlert({
        customUI: ({ onClose }) => {
            const divStyle={
                textAlign:"center"
            }
            const buttonStyle={
                display: "inline-block",
                padding: "0.3em 1em",
                color: "#67c5ff",
                fontSize:"25px",
                marginLeft: "1rem",
                marginRight: "2rem",
                cursor:"pointer",
                textDecoration: "none",
                border: "solid 2px #67c5ff",
                borderRadius: "3px",
                transition: ".4s",
            }
          return (
            <div style={{textAlign:"center"}}className='custom-ui'>
              <h3>Are you sure you want to quit?</h3>
              <button style={buttonStyle} onClick={() => {
                  this.props.history.push('/mainscreen')
                  onClose();
                }}
              >Yes</button>
              <button style={buttonStyle} onClick={onClose}>No</button>
            </div>
          );
        }
      });
        //if(window.confirm('Are you sure you want to quit?')){
           //this.props.history.push('/mainscreen')
    }

    correctAnswer = (e) => {
        setTimeout(() => {
        e.target.style.backgroundColor = '';
        this.setState(prevState => ({
            score: prevState.score + 1,
            correctAnswers: prevState.correctAnswers + 1,
            currentQuestionIndex: prevState.currentQuestionIndex + 1,
            numberOfAnswered: prevState.numberOfAnswered + 1,
            numberOfQues: prevState.numberOfQues + 1
        }),() => {
            if(this.state.nextQuestion === undefined){
                this.endGame();
            }
            else{
                this.displayQuestions(this.state.questions,this.state.currentQuestion,this.state.nextQuestion,this.state.prevQuestion);
            }
        });
        },2000);
    }


    wrongAnswer = (e) => {
        setTimeout(() => {
        e.target.style.backgroundColor = '';
        this.setState(prevState => ({
            wrongAnswers: prevState.wrongAnswers + 1,
            currentQuestionIndex: prevState.currentQuestionIndex + 1,
            numberOfQues: prevState.numberOfQues + 1,
            numberOfAnswered: prevState.numberOfAnswered + 1
        }), () => {
            if(this.state.nextQuestion === undefined){
                this.endGame();
            }
            else{
                this.displayQuestions(this.state.questions,this.state.currentQuestion,this.state.nextQuestion,this.state.prevQuestion);
            }
            
        });
        },2000);
    }

    endGame = () => {
        confirmAlert({
            customUI: ({ onClose }) => {
                const buttonStyle={
                    display: "inline-block",
                    padding: "0.3em 1em",
                    color: "#67c5ff",
                    fontSize:"25px",
                    marginLeft: "1rem",
                    marginRight: "2rem",
                    cursor:"pointer",
                    textDecoration: "none",
                    border: "solid 2px #67c5ff",
                    borderRadius: "3px",
                    transition: ".4s",
                }
                return (
                    <div style={{textAlign:"center"}}>
                    <h3>Quiz has ended!</h3>
                    <button style={buttonStyle} onClick={onClose}>Okay</button>
                    </div>
                );
            }
          });
        const{ state } = this;
        const playerStats = {
            score: state.score,
            numberOfQues: state.numberOfQues,
            numberOfAnswered: state.numberOfAnswered,
            correctAnswers: state.correctAnswers,
            wrongAnswers: state.wrongAnswers,
        };
        console.log(playerStats);
        setTimeout(() => {
            this.props.history.push('/summary',playerStats);
        }, 1000);
    }


    render(){
        const {currentQuestion, options, numberOfQues} = this.state;
        return(
            <Fragment>
                <Helmet><title>Play Quiz</title></Helmet>
                <div id="play-main">
                <div className="questions-container">
                    <div>
                        <p>
                            <span>{numberOfQues+1} of 15</span>
                        </p>
                    </div>
                    <h5>{currentQuestion.question}</h5>
                    <div className="options-container">
                        <p onClick={this.handleOptionClick} className="option">{options[0]}</p>
                        <p onClick={this.handleOptionClick} className="option">{options[1]}</p>
                    </div>
                    <div className="options-container">
                        <p onClick={this.handleOptionClick} className="option">{options[2]}</p>
                        <p onClick={this.handleOptionClick} className="option">{options[3]}</p>
                    </div>
                    <div className="button-container">
                        <button id="next-btn" onClick={this.handleNextButtonClick}>Skip</button>
                        <button id="quit-btn" onClick={this.handleQuitButtonClick}>Quit</button>
                    </div>
                </div>
            </div>
            </Fragment>
        );
    }
}