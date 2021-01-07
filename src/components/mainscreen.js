import React, { Fragment } from 'react';
import { Redirect } from 'react-router';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

export class Mainscreen extends React.Component{
    //componentDidMount(){
    //    console.log(this.props.location.state)
   // }
    constructor(props){
        super(props);
        this.state = {
            username: '',
         };
    }

    componentDidMount(){
        const { state } = this.props.location;
        if(state){
            this.setState({
                username: state.username
            });
        }
    }
    
    render(){
        return(
            <>
            <Helmet><title>Quiz</title></Helmet>
            <div id="main">
            <section>
            <h1>Quiz</h1>
            <ul>
            <li><Link to={{pathname:'/categories'}} className="buttons">Play</Link></li>
            <li><Link to="/instructions" className="buttons">Instructions</Link></li>
            </ul>
            </section>
            </div>
            </>
        )
    }
}
