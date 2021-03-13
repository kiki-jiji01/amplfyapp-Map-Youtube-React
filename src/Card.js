import React from 'react';
import './Card.css';
import {useHistory} from 'react-router-dom';
import {Button} from '@material-ui/core';

function Card ({src,city,prices}) {
  const history = useHistory();

  return (

    <div className="card">
      <img src={src}  alt=""/>
     <div className="card_info">
       <h2>{city}</h2>
       <h4>{prices}</h4>
     <Button
     onClick = {() => history.push(`/chat`)}>
     Chat
     </Button>
     </div>
    </div>

  )
}

export  default Card ;
