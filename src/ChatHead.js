import React from 'react';
import {Button} from '@material-ui/core';
import {useHistory} from 'react-router-dom';


function ChatHead ({title,id}) {
  const history = useHistory();

  const selectChannel = () => {
      if(id) {
        history.push(`/chat/${id}`);
      } else {
        history.push(title);
      }
    };

  return (
    <div>
     <Button onClick={selectChannel}>{title}</Button>
    </div>
  )
}

export default ChatHead;
