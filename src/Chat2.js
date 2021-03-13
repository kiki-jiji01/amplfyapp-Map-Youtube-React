import React,{useState,useEffect} from 'react';
import {Button} from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Chats from './Chats';
import {db} from './firebase';
import ChatHead from './ChatHead';
import { useParams } from "react-router-dom";
import {useHistory} from 'react-router-dom';
import './Chat2.css';
import ChatInput from './ChatInput';


function Chat2 () {

  const { roomId } = useParams();
  const [roomDetails,setRoomDetails] = useState(null);
  const [roomMessages,setRoomMessages] = useState([]);



  useEffect(() => {
    if(roomId) {
      db.collection('rooms')
      .doc(roomId)
      .onSnapshot((snapshot) => setRoomDetails(snapshot.data()))
     }

     db.collection('rooms')
     .doc(roomId)
     .collection("messages")
     .orderBy("timestamp", "asc")
     .onSnapshot((snapshot) =>
      setRoomMessages(snapshot.docs.map((doc) => doc.data()))
    );
   },[roomId]);

   console.log(roomDetails);
   console.log("MESSAGE",roomMessages);


  return (
    <div className="chats-main">
    {roomMessages.map(({caption,timestamp,user,image}) => (
       <Chats
       caption={caption}
       timestamp={timestamp}
       user={user}
       image={image}
       />
     ))}

      <ChatInput channelName={roomDetails?.name} channelId={roomId} />
    </div>
  )
}

export default Chat2;
