import React, {Component} from "react";
import { NavLink } from "react-router-dom";
export default class NavigationContainer extends Component{
    constructor(){
        super();
    }
    render(){
        return(
            <div className="nav-wrapper">
                <div className="left-side">
                {/*Con navLink, navega pero no recarga toda la pagina.
                Con <a href="/" recarga toda la pagina*/}
                {/*Al pulsar cada ruta, utiliza la class = active
                puede editarse y nombrar esa clase de activo: "unai-active"
                Interesante para cambiar los estilos del titulo.*/}
                <div className="nav-link-wrapper">
                    <NavLink exact to ="/" activeClassName="nav-link-active">
                        Home
                    </NavLink>
                </div>
                <div className="nav-link-wrapper">
                    <NavLink to ="/about-me" activeClassName="nav-link-active">
                        About
                    </NavLink>
                </div>
                    <div className="nav-link-wrapper">
                <NavLink to ="/contact" activeClassName="nav-link-active">
                    Contact
                </NavLink>
                </div>
                    <div className="nav-link-wrapper">
                <NavLink to ="/blog" activeClassName="nav-link-active">
                    Blog
                </NavLink>
                </div>
                {/*false ? <button>Add Blog</button>: null conditional if*/}
                </div>
                <div className="right-side">
                    UNAI DELAFU
                </div>
            </div>
        )
    }
}