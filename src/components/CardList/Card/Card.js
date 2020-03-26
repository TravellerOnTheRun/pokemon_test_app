import React from 'react';
import './Card.css';

import { Button } from 'antd';
import icon from './../../../images/emptystar.png';

export default props => {
    console.log(props);
    return (
        <div className='layer'>
            <div className='card-component_closed-mobile card-component_opened-mobile'>
                <img className='pokemon_picture' src={props.image} alt='pokemon_picture'/>
               <ul className='card-container'>
                  <li>{props.name}</li>
                  <li>{props.types}</li>
                  {/* <li>Abilities</li>
                  <li>Gender Ratio</li>
                  <li>Catch Rate</li>
                  <li>Shape</li> */}
              </ul>
                <Button className='add-to-fav_btn' type="primary">
                    <img className='add-to-fav' src={icon} alt='pokemon_picture'/>
                </Button>
            </div>
        </div>
    );
};