import React ,{Fragment} from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export class Categories extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            cat : '',
            cat_name : 'None'
          };
    }

    handleClick = (e,category) => {
        this.setState({
            cat: category,
            cat_name: e.target.innerHTML
          })
    }

    handlePlayClick = () => {
        if(this.state.cat === ''){
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
                        <h3>Please choose a category</h3>
                        <button style={buttonStyle} onClick={onClose}>Okay</button>
                        </div>
                    );
                }
              });
        }
        else{
            const cat_loc = {
                cat: this.state.cat
            };
            this.props.history.push('/playquiz',cat_loc);
        }
    }


    render(){
        return(
            <Fragment>
                <Helmet><title>Choose Category</title></Helmet>
                <div id="cat-main">
                <section className="options-container">
                    <h1> Choose a Category</h1>
                    <ul>
                        <div className="option-group">
                        <li><button id="gk" className="cat-button"onClick={(e) => this.handleClick(e,'gk')}>General Knowledge</button></li>
                        <li><button id="comp" className="cat-button" onClick={(e) => this.handleClick(e,'computers')}>Computers</button></li>
                        <li><button id="sport" className="cat-button" onClick={(e) => this.handleClick(e,'sports')}>Sports</button></li>
                        </div>
                        <div className="option-group">
                        <li><button id="movie" className="cat-button" onClick={(e) => this.handleClick(e,'movies')}>Movies</button></li>
                        <li><button id="hist" className="cat-button" onClick={(e) => this.handleClick(e,'history')}>History</button></li>
                        <li><button id="animal" className="cat-button" onClick={(e) => this.handleClick(e,'animals')}>Animals</button></li>
                        </div>
                    </ul>
                    </section>
                    <section >
                    <p className="play-button" onClick = {()=>this.handlePlayClick()} >Play</p>
                    </section>     
                </div>
            </Fragment>
        );
    }
}