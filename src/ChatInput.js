import React,{useState,useEffect} from 'react';
import {db} from "./firebase";
import firebase from "firebase";
import { storage} from './firebase';

function ChatInput ({channelName,channelId}) {
const [image, setImage] = useState(null);
const [caption, setCaption] = useState('');

const sendMessage = (e) => {
   e.preventDefault();
   if (channelId) {
			db.collection("rooms").doc(channelId).collection("messages").add({
				caption: caption,
				timestamp: firebase.firestore.FieldValue.serverTimestamp(),

				image: image,
			})
		}
    setImage(null);
		setCaption("");
 }




  return (
    <div className="chatInput">
    <form>

      <input value={caption} onChange={(e) => setCaption(e.target.value)}/>
      <input value={image} type="file" onChange={(e) => setImage(e.target.value)}/>
      <button type="submit" onClick={sendMessage}>SEND</button>
     </form>
    </div>
  )
}

export default ChatInput;
