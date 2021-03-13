import React ,{useState,useEffect}from 'react';
import './Header.css';
import {Avatar} from '@material-ui/core';
import {Button,Input} from '@material-ui/core';
import { db ,auth} from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';



function getModalStyle() {
  const top = 50 ;
  const left = 50 ;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Header () {
  const classes = useStyles();
  const [open ,setOpen] = useState(false);
  const [modalStyle] = useState(getModalStyle);
  const [username ,setUsername] = useState('');
  const [password ,setPassword] = useState('');
  const [email ,setEmail] = useState('');
  const [user,setUser] = useState(null);
  const [openSignIn,setOpensignIn] = useState(false);


  useEffect(() => {
  const unscrible = auth.onAuthStateChanged((authUser) => {
    if(authUser) {
          /* user has logged in*/
　　　　　　console.log(authUser);
          setUser(authUser);
    } else {
          /* user has logged out*/
       setUser(null);
    }
  })

  return () => {
    unscrible();
  }
},[user, username]);





  const signup = (event) => {
     event.preventDefault();

     auth
     .createUserWithEmailAndPassword(email,password)
     .then((authUser) => {
      return authUser.user.updateProfile({
       displayName:username
     })
   })
     .catch((error) => alert(error.message));
     setOpen(false);
  }


 const signIn = (event) => {
   event.preventDefault();

   auth
   .signInWithEmailAndPassword(email, password)
   .catch((error) => alert('two weeks later we get to Gotland'));
   setOpensignIn(false);
 }


  return (

     <div className="header">


     <Modal
     open={open}
     onClose={() => setOpen(false)}
     >
     <div style={modalStyle} className={classes.paper}>
    <form className="app_signup">
     <Input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
       />
       <Input
        type="text"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
       />
       <Input
        type="text"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
       />
       <Button type="submit" onClick={signup}>signUp</Button>
     </form>
     </div>
     </Modal>





     <Modal
     open={openSignIn}
     onClose={() => setOpensignIn(false)}
     >
     <div style={modalStyle} className={classes.paper}>
    <form className="app_signup">
       <Input
        type="text"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
       />
       <Input
        type="text"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
       />
       <Button type="submit" onClick={signIn}>signIn</Button>
     </form>
     </div>
     </Modal>


     <img
      className="header_img"
      src=""
      alt=""
     />

     <div className="header_center">
      <p>Be Hiroyuki</p>
     </div>



     <div className="header_right">

 {user ? (
      <Button onClick={() => auth.signOut()}>Logout</Button>
  ) : (
    <div>
      <Button onClick={() => setOpensignIn(true)}>signin</Button>
      <Button onClick={() => setOpen(true)}>signup</Button>
    </div>
  )}



     </div>



     </div>
  )
}

export default Header;
