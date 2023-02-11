import React, { Component } from "react";
import NavBar from "./components/NavBar/NavBar";
import News from "./components/News/News";
import About from "./components/About/About";

import "./App.css";

// ! Adding top loader in App...
import LoadingBar from "react-top-loading-bar";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default class App extends Component {

  pageSize = 5;

  // - some function for top loading bar...
  state ={progress: 0}
  // - passed this function to news components for used top loading bar...
  setProgress = (progress)=>{
    this.setState({progress:progress});
  }

  render() {
    return (
      <div>
        <Router>
          <NavBar />

  {/* // - There is top loading bar... */}

          <LoadingBar
            color="#f11946"
            progress={this.state.progress}
          />

          <Switch>
            <Route exect path="/about">
              <About />
            </Route>
            <Route exect path="/sports">
              <News setProgress={this.setProgress} 
                key="sports"
                pageSize={this.pageSize}
                country={"in"}
                category={"sports"}
              />
            </Route>
            <Route exect path="/technology">
              <News setProgress={this.setProgress} 
                key="technology"
                pageSize={this.pageSize}
                country={"in"}
                category={"technology"}
              />
            </Route>
            <Route exect path="/science">
              <News setProgress={this.setProgress} 
                key="science"
                pageSize={this.pageSize}
                country={"in"}
                category={"science"}
              />
            </Route>
            <Route exect path="/health">
              <News setProgress={this.setProgress} 
                key="health"
                pageSize={this.pageSize}
                country={"in"}
                category={"health"}
              />
            </Route>
            <Route exect path="/entertainment">
              <News setProgress={this.setProgress} 
                key="entertainment"
                pageSize={this.pageSize}
                country={"in"}
                category={"entertainment"}
              />
            </Route>
            <Route exect path="/business">
              <News setProgress={this.setProgress} 
                key="business"
                pageSize={this.pageSize}
                country={"in"}
                category={"business"}
              />
            </Route>
            <Route exect path="/">
              <News setProgress={this.setProgress} 
                key="general"
                pageSize={this.pageSize}
                country={"in"}
                category={"general"}
              />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
