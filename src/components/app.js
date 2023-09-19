import React, { Component } from 'react';
import moment from "moment";
import{
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import PortfolioContainer from './portfolio/portfolio-container';
import NavigationContainer from './navigation/navigation-container';
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import Blog from "./pages/blog";
import PortfolioDetail from "./portfolio/portfolio-detail";
import NoMatch from "./pages/no-match";

export default class App extends Component {

  render() {
    return (
      <div className='app'>   
           <h1>Unai delafu - DevCamp React Starter</h1>    
          <div>{moment().format("Do MMMM YYYY, h:mm:ss a")}</div>          
        <Router>
          <div>

            <NavigationContainer/>

            <Switch>
              <Route exact path="/" component = {Home} />
              <Route path="/about-me" component = {About} />
              <Route path="/contact" component = {Contact} />
              <Route path="/blog" component = {Blog} />
              <Route exact path="/portfolio/:slug" component = {PortfolioDetail} /*Exact para que no acepte url/xxx/xxx*//>
              <Route component = {NoMatch} /*Siempre al final, porque las pages funcionan como if else*//>
            </Switch>
          </div>
        </Router>
        
      </div>
    );
  }
}
