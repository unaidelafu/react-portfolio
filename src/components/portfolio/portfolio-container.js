import React, { Component } from "react";
import axios from 'axios';

import PortfolioItem from "./portfolio-item";
//State
//Lifecycle hooks
//<comunicates APIs, etc
export default class PortfolioContainer extends Component{
    constructor(){
        super();
        //instancia
        console.log("Portfolio container has rendered");
        this.state = {
            pageTitle:"Welcome to my portfolio",
            isLoading : false,
            data: []
            /*
            data: [
                { title:"Quip", category: "eCommerce",slug: "quip" },
                { title:"Eventbrite", category: "Scheduling",slug: "eventbrite" },
                { title:"Ministry Safe", category: "Enterprise",slug: "ministry-safe" },
                { title:"SwingAway", category: "eCommerce",slug: "swingaway" }
            ]    
            */       
        };
        this.handleFilter = this.handleFilter.bind(this);
        
    }

    getPorfolioItems(){
        // Make a request for a user with a given ID
        axios.get('https://unaidelafuente.devcamp.space/portfolio/portfolio_items')
        .then(response => {
          // handle success
          console.log("Response data", response);
          
          this.setState({
            data: response.data.portfolio_items
          })
        })
        .catch(error => {
          // handle error
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
      }

    portfolioItems() {
        //a loop for the number of the items:
        return this.state.data.map(item => {
            console.log("Item data", item);
            //debugger;
            return <PortfolioItem key = {item.id} 
            item = {item}/>;
        })
    }
    handleFilter(filter){
        this.setState({
            data: this.state.data.filter(item =>{
                return item.category === filter;
            })
        })
    }
    
    //lifecycle hook. Cuando se han cargado los componentes
    componentDidMount(){
        this.getPorfolioItems();
    }

    render(){
        if(this.state.isLoading){
            return <div> Loading... </div>
        }
        
        return(
            <div>
                <h2>{this.state.pageTitle}</h2>
                {this.portfolioItems()}

                <hr/>
                {/*en la funcion, se pone () => porque sino se ejecutan todas al iniciarse la page y error!! */}
                <button onClick={() => this.handleFilter('eCommerce')}>eCommerce</button>
                <button onClick={() => this.handleFilter('Scheduling')}>Scheduling</button>
                <button onClick={() => this.handleFilter('Enterprise')}>Enterprise</button>
            </div>
        );
    }
}