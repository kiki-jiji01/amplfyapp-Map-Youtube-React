import React,{useEffect,useState} from 'react';
import {db} from './firebase';
import ChatHead from './ChatHead';
import './ChatHead.css';

function  Chatabove () {
  const[channels,setChannels] = useState([]);




  useEffect (() => {
     /*when the sidebar component loading*/
     db.collection("rooms").onSnapshot( (snapshot) => (
       setChannels(
         snapshot.docs.map((doc) => ({
           id: doc.id,
           name: doc.data().name,
         }))
       ))
     );
  },[])



  return (
    <div className="chat-header">


    　　　  <div className="header-left">
    　　　   <p>you can know about places more</p>
    　　　  </div>

    　　　  <div className="header-right" >
         {channels.map((channel) => (
          <ChatHead title={channel.name}  id={channel.id}/>
          ))}
       　  </div>

　　　　　</div>
  )
}
export default Chatabove;
