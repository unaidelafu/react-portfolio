import React from "react";
import { Link } from "react-router-dom";
//Only oass data

//Trabajando com proops tienes key par value
export default function(props) {
            //Data that we'll need:
        // - Background image: thumb_image_url
        // - Logo: logo_url
        // - Description: description
        // - Id: id
        //'id', 'name', 'description', 'url', 'category', 'position', 'thumb_image_url', 'banner_image_url', 'logo_url', 'column_names_merged_with_images'
        const {id, description,thumb_image_url, logo}  = props.item;
    return(
        <div>
            <img src={thumb_image_url}/>
            <img src={logo}/>
            <div>{description}</div>
            <Link to={`/portfolio/${id}`}>Link</Link>

        </div>
    );   
}