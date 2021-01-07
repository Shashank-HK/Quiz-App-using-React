import React ,{Fragment} from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Quizinstructions = () => (
    <Fragment>
        <Helmet><title>Instructions</title></Helmet>
        <div id="inst-main">
        <div className="instructions-container">
            <h1>How to Play</h1>
            <ul id="main-list" className="browser-default">
                <li>Each game consists of 15 questions.</li>
                <li>Every question has 4 options.</li>
                <li>Select the option which you think is suitable, by clicking on it.</li>
                <li>After selecting, the option will change colour. If your answer is correct, it will turn green, else red.</li>
                <li>You can also choose to skip the question by clicking the 'Skip' button.</li>
                <li>Once you skip, you cannot return back to the question, so think before you skip!</li>
            </ul>
        <div>
            <span ><Link className='back' to="/mainscreen" >Home</Link></span>
        </div>
        </div>
        </div>
    </Fragment>

);

export default Quizinstructions;