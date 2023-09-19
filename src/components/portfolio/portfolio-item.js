import React, {Component} from "react";
import { Link } from "react-router-dom";
//Only oass data

//Trabajando com proops tienes key par value
export default class PortfolioItem extends Component {
    constructor(props){
        super(props);
        this.state={
            portfolioItemClass:""
        };
    }
    handleMouseEnter(){
        this.setState({portfolioItemClass: "image-blur"});
    }
    handleMouseLeave(){
        this.setState({portfolioItemClass: ""});
    }
    render(){
            //Data that we'll need:
        // - Background image: thumb_image_url
        // - Logo: logo_url
        // - Description: description
        // - Id: id
        //'id', 'name', 'description', 'url', 'category', 'position', 'thumb_image_url', 'banner_image_url', 'logo_url', 'column_names_merged_with_images'
        const {id, description,thumb_image_url, logo_url}  = this.props.item;
        return(
            <div className="portfolio-item-wrapper"
            onMouseEnter={()=>this.handleMouseEnter()}
            onMouseLeave={()=>this.handleMouseLeave()}
            >
                <div className={"portfolio-img-background " + this.state.portfolioItemClass}
                style={{
                    backgroundImage: "url(" + thumb_image_url + ")"
                }}
                />
                <div className="img-text-wrapper">
                    <div className="logo-wrapper">
                        <img src={logo_url}/>
                    </div>
                    <div className="subtitle">
                        <div>{description}</div>
                    </div>
                </div>
                
                <Link to={`/portfolio/${id}`}>Link</Link>

            </div>
        );   
    }
}