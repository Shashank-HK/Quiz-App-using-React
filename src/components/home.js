import React, { Fragment } from 'react';
import { Redirect } from 'react-router';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
//<input value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)} placeholder="Enter Name"/>
//<button type="button" onClick={this.handleSubmit}>Start</button>
//<Link to={{pathname:'/mainscreen',state:{name:this.state.inputValue}}}>Play</Link>
import WebpackIcon from 'mdi-react/WebpackIcon';
export class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            inputValue: '',
            error: ''
          };
    }
    updateInputValue = (evt) => {
        this.setState({
          inputValue: evt.target.value
        })
    }

    handleSubmitEvent = evt => {
        if(this.state.inputValue !==''){
            return (
            <Redirect
              to={{
                pathname: `/mainscreen`,
                state: { name: this.state.inputValue },
              }}
            />)
          }
        else {
            this.setState({
                error: 'Please Enter Name'
            })

        }
    }
          

    render(){
    return(
        <Fragment>
            <Helmet><title>Home</title></Helmet>
        <div id='home'>
        <section>
            <div className="icon">
            <WebpackIcon color="#ff9933" size={100}/>
            </div>
            <h1>Welcome to Quiz</h1>
            <div style={{textAlign:'center'}} >
            <input className="username" value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)} 
            placeholder="Enter Name"/>
            </div>
            <div className="next-button-container">
            <Link className='next-button' to={{pathname:'/mainscreen',state:{username:this.state.inputValue}}}>Next</Link>
            </div>
            
        </section>
        </div>
        </Fragment>
    );
    }
}
