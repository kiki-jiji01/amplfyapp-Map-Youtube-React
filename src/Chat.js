import React,{useState,useEffect} from 'react';
import {Button} from '@material-ui/core';
import './Chat.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Chats from './Chats';

import ChatHead from './ChatHead';

import Chatabove from './Chatabove';
import Chat2 from './Chat2';



function Chat() {




  return (
    <div className="chat">
     <Router>

          <Chatabove />

       <Switch>
         <Route path="/chat/:roomId">
         <Chat2 />
         </Route>
         <Route path="/chat">
          <h1></h1>
         </Route>
      </Switch>

    </Router>
　  </div>
  )
}
export default Chat;
