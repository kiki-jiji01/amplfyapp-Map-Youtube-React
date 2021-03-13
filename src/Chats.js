import React from 'react';
import './Chats.css';


function Chats({caption,timestamp,user,image}) {
  return (
     <div className="chats">
      <div className="chats-header">
      <p>{user}</p>
      </div>
      <img
      className="chat-image"
      src={image} alt=""/>
      <div className="chat-caption">
      <p>{caption}</p>
      </div>
     </div>

  )
}

export default Chats;
