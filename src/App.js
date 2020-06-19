import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import './design/App.css';
import Login from './pages/login';
import SignUp from './pages/signup';
import Archive from './pages/archive';
import Navbar from './components/navbar';

class App extends Component{
  render(){
    return(
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Archive} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
