import React, { Component } from "react";
import axios from "axios";

import PortfolioSidebarList from "../portfolio/portfolio-sidebar-list";
import PortfolioForm from "../portfolio/portfolio-form";

export default class PortfolioManager extends Component{
    constructor(){
        super();
        this.state={
            portfolioItems:[],
            portfolioToEdit:{}
        };

        this.handleNewFormSubmission = this.handleNewFormSubmission.bind(this);
        this.handleEditFormSubmission = this.handleEditFormSubmission.bind(this);
        this.handleFormSubmissionError = this.handleFormSubmissionError.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.clearPortfolioToEdit = this.clearPortfolioToEdit.bind(this);
    };
    clearPortfolioToEdit(){
        this.setState({
            portfolioToEdit:{}
        })
    }

    handleEditClick(portfolioItem){
        this.setState({
            portfolioToEdit: portfolioItem
        })
    }
    handleDeleteClick(portfolioItem){
        axios.delete(`https://unaidelafuente.devcamp.space/portfolio/portfolio_items/${portfolioItem.id}`, {
            withCredentials: true
        }).then(response =>{
            //console.log("Response from delete", response);          
            this.setState({
                portfolioItems: this.state.portfolioItems.filter(item =>{
                    return item.id !== portfolioItem.id;
                })// itera y cada uno y filtra. si coincide con el que hemos borrado, no return
            });
            return response.data;
            
        }).catch(error=>{
            console.log("Error from delete", error);
        })     
    }
    handleEditFormSubmission(){
        this.getPortfolioItems();
    }
    handleNewFormSubmission(portfolioItem){
        this.setState({
            //al ponerlo en [] lo convertimos en un array de un item.
            //Luego se concatena el array ya existente, detras, así tenemos el valor introducido primero
            //Se actualiza el state, visualizandose así en la page
            portfolioItems: [portfolioItem].concat(this.state.portfolioItems)
        });

    }
    handleFormSubmissionError(error){
        console.log("handleFormSubmissionError error", error);
    }
    
    getPortfolioItems(){
        axios.get("https://unaidelafuente.devcamp.space/portfolio/portfolio_items?order_by=created_at&direction=desc", {
            withCredentials: true
        }).then(response =>{
            this.setState({
                portfolioItems: [...response.data.portfolio_items]
            })
        }).catch(error=>{
            console.log("Error in getPortfolio items", error);
        })
    }
    
   
    //lifecycle hook
    componentDidMount(){
        this.getPortfolioItems();
    }
    
    render(){
        return(
            <div className="portfolio-manager-wrapper">
                <div className="left-column">
                    <PortfolioForm
                    handleNewFormSubmission = {this.handleNewFormSubmission}
                    handleEditFormSubmission = {this.handleEditFormSubmission}
                    handleFormSubmissionError = {this.handleFormSubmissionError}
                    clearPortfolioToEdit = {this.clearPortfolioToEdit}
                    portfolioToEdit = {this.state.portfolioToEdit}
                    />
                </div>
                <div className="right-column">
                    <PortfolioSidebarList 
                    handleDeleteClick = {this.handleDeleteClick}
                    data={this.state.portfolioItems}         
                    handleEditClick={this.handleEditClick}        
                    />
                </div>                               
            </div>
        );
    }
}