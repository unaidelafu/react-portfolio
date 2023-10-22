import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import BlogItem from "../blog/blog-item";
import BlogModal from "../modals/blog-modal";
//import { faL } from "@fortawesome/free-solid-svg-icons";



class Blog extends Component {
    constructor(){
        super();
        //instanciar state
        this.state = {
            blogItems:[],
            totalCount: 0,
            currentPage: 0,
            isLoading: true,
            blogModalIsOpen: false
        };

        this.getBlogItems = this.getBlogItems.bind(this);
        this.onScroll = this.onScroll.bind(this);
        window.addEventListener("scroll",this.onScroll,false)
        this.handleNewBlogClick = this.handleNewBlogClick.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleSuccessfullNewBlogSubmission = this.handleSuccessfullNewBlogSubmission.bind(this);
    }

    handleSuccessfullNewBlogSubmission(blog){

        this.setState({
            blogModalIsOpen: false,
            blogItems: [blog].concat(this.state.blogItems)  //El clog creado, se le concatena los blogs ya existentes, para visualizar todo, el nuevo primero
        })
    }

    handleNewBlogClick(){
        this.setState({
            blogModalIsOpen: true
        });
    }

    handleModalClose(){
        this.setState({
            blogModalIsOpen: false
        });       
    }
    //infinite scroll
    onScroll(){
            //Evitar que vuelva a llamar la funcion cuando:
                //el usuario baja demasiado rapido y todavia está cargando la pagina
                //CUando ya no hay mas registros
            if(this.state.isLoading ||
                this.state.blogItems.length === this.state.totalCount){
                    return; //Salta del codigo.
            }
            /*
            console.log("window.innerHeight", window.innerHeight);  //cuanto de largo tiene la ventana en tu pantalla
            console.log(
              "document.documentElement.scrollTop", 
              Math.ceil(document.documentElement.scrollTop)
            );  //El numero de pixel en el que empieza la info de tu documento
            console.log(
              "document.documentElement.offsetHeight", 
              document.documentElement.offsetHeight
            );  //cuanto tiene de largo en total el documento
            */
            //if(window.innerHeight + Math.ceil(document.documentElement.scrollTop) === document.documentElement.offsetHeight){
            if(window.innerHeight + Math.ceil(document.documentElement.scrollTop) >= (document.documentElement.offsetHeight - 1)){
                //porque en pantalla completa se queda un 1 por ahi colgando.
                //console.log("Get more posts");
                this.getBlogItems();
            }

    }

    getBlogItems(){
        this.setState({
            currentPage: this.state.currentPage + 1
        });

        axios.get(`https://unaidelafuente.devcamp.space/portfolio/portfolio_blogs?page=${this.state.currentPage}`, 
        {withCredentials: true}
        ).then(response =>{
            console.log("getting ", response.data);
            this.setState({
                blogItems: this.state.blogItems.concat(response.data.portfolio_blogs),
                totalCount: response.data.meta.total_records,    //LA API devuelve el numero total de recors en este apartado "meta"
                isLoading: false
            })
        }).catch(error =>{
            console.log("Error: ", error);
        });

        };

//lifecycle functions
    componentWillMount(){
        this.getBlogItems();
    }
    componentWillUnmount (){
        window.removeEventListener("scroll",this.onScroll,false);
    }
    render(){
        const blogRecords = this.state.blogItems.map(blogItem =>{ //map returns an array
            return <BlogItem key={blogItem.id} blogItem={blogItem}/>;
        }); 
        return (
            <div className="blog-container">
                <BlogModal 
                //is not a function error. es una funcione pero el componente no lo reconoce, xq no se le pasa. aqui se pasan las func,
                handleSuccessfullNewBlogSubmission = {this.handleSuccessfullNewBlogSubmission}
                handleModalClose={this.handleModalClose}
                modalIsOpen = {this.state.blogModalIsOpen} />

                <div className="new-blog-link">
                    <a onClick={this.handleNewBlogClick}>Open Modal</a>
                </div>
                <div className="content-container">{blogRecords}</div>
                {this.state.isLoading ? 
                (<div className="content-loader">
                    <FontAwesomeIcon icon="spinner" spin/>
                </div>) : null
                }
            </div>
        )
    }
}
export default Blog;