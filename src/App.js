import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { Categories } from './components/categories';
import { Home }   from './components/home';
import { Mainscreen } from './components/mainscreen';
import { Playquiz } from './components/playquiz';
import  Quizinstructions  from './components/quizinstructions';
import { Quizsummary } from './components/quizsummary';


function App() {
  return (
    <Router>
      <Route path="/" exact component={Home}/>
      <Route path="/mainscreen" exact component={Mainscreen}/>
      <Route path="/playquiz" exact component={Playquiz}/>
      <Route path="/categories" exact component={Categories}/>
      <Route path="/instructions" exact component={Quizinstructions}/>
      <Route path="/summary" exact component={Quizsummary}/>
    </Router>
  );
}

export default App;
