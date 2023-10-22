import React, { Component } from 'react';
import{
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import axios from 'axios';

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//Todos los iconos que vayas a utilizar en toda la aplicacion
import { faTrash, faSignOutAlt, faEdit, faSpinner } from "@fortawesome/free-solid-svg-icons";

//import PortfolioContainer from './portfolio/portfolio-container';
import NavigationContainer from './navigation/navigation-container';
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import Blog from "./pages/blog";
import BlogDetail from "./pages/blog-detail";
import PortfolioDetail from "./portfolio/portfolio-detail";
import PortfolioManager from './pages/portfolio-manager';
import Auth from "./pages/auth";
import NoMatch from "./pages/no-match";
//import { response } from 'express';

library.add(faTrash, faSignOutAlt, faEdit, faSpinner); //Añadir TODOS los iconos que se usa de fontAwesome

export default class App extends Component {
  constructor(props){
    super(props);
    this.state={
      loggedInStatus: "NOT_LOGGED_IN"
    }
    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
    this.handleUnsuccessfulLogin = this.handleUnsuccessfulLogin.bind(this);
    this.handleSuccessfulLogout = this.handleSuccessfulLogout.bind(this);
    //this.checkLoginStatus = this.checkLoginStatus.bind(this);
  }
  handleSuccessfulLogin(){
    this.setState({
      loggedInStatus: "LOGGED_IN"
    })
  }
  handleUnsuccessfulLogin(){
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    })
  }  

  handleSuccessfulLogout(){
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    })
  }  
  
  checkLoginStatus(){
    return axios.get("https://api.devcamp.space/logged_in", 
    {withCredentials: true }
    ).then(response => {
      console.log("Logged_in return:", response)
      const loggedIn= response.data.logged_in;
      const loggedInStatus= this.state.loggedInStatus;
      // if loggedIn and status LOGGED_IN => return data, no updates
      
      
      if(loggedIn && loggedInStatus ==="LOGGED_IN"){
        return loggedIn;
      }else if (loggedIn && loggedInStatus === "NOT_LOGGED_IN"){// if loggedIn status NOT_LOGGED_IN => update state
        this.setState({
          loggedInStatus: "LOGGED_IN"
        });
      }else if (!loggedIn && loggedInStatus === "LOGGED_IN"){ // if not loggedIn and status LOGGED_IN => update state
        this.setState({
          loggedInStatus: "NOT_LOGGED_IN"
        });
      }
    }).catch(error =>{
      console.log("Error", error);
    });
  }
  
 
  componentDidMount(){
    this.checkLoginStatus();
  }

  authorizedPages(){
    return [<Route key="portfolio-manager" path="/portfolio-manager" component={PortfolioManager} />
    ];
  }

  render() {
    return (
      <div className='container'>         
        <Router>
          <div>
            <NavigationContainer 
            loggedInStatus = {this.state.loggedInStatus}
            handleSuccessfulLogout = {this.handleSuccessfulLogout}
            />
            <Switch>
              <Route exact path="/" component = {Home} />
              <Route 
                path="/auth" 
                render={props => (
                  <Auth
                    {...props}
                    handleSuccessfulLogin = {this.handleSuccessfulLogin}
                    handleUnsuccessfulLogin = {this.handleUnsuccessfulLogin}
                  />
                )}
              />
              <Route path="/about-me" component = {About} />
              <Route path="/contact" component = {Contact} />
              <Route path="/blog" component = {Blog} />
              <Route path="/b/:slug" component = {BlogDetail} />
              {this.state.loggedInStatus === "LOGGED_IN" ? this.authorizedPages(): null}
    
              <Route exact path="/portfolio/:slug" component = {PortfolioDetail} /*Exact para que no acepte url/xxx/xxx*//>
              <Route component = {NoMatch} /*Siempre al final, porque las pages funcionan como if else*//>
            </Switch>
          </div>
        </Router>
        
      </div>
    );
  }
}
