import React, {Component} from "react";
import { NavLink } from "react-router-dom";
export default class NavigationContainer extends Component{
    constructor(){
        super();
    }
    render(){
        return(
            <div>
                {/*Con navLink, navega pero no recarga toda la pagina.
                Con <a href="/" recarga toda la pagina*/}
                {/*Al pulsar cada ruta, utiliza la class = active
                puede editarse y nombrar esa clase de activo: "unai-active"
                Interesante para cambiar los estilos del titulo.*/}
                <NavLink exact to ="/" activeClassName="unai-active">
                    Home
                </NavLink>
                <NavLink to ="/about-me">About</NavLink>
                <NavLink to ="/contact">Contact</NavLink>
                <NavLink to ="/blog">Blog</NavLink>
                {/*false ? <button>Add Blog</button>: null conditional if*/}
            </div>
        )
    }
}