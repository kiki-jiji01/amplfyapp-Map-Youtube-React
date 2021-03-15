
import './App.css';
import React,{useState,useEffect} from 'react';
import {
  InfoWindow,
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import Geocode from "react-geocode";
import { Descriptions, Badge } from 'antd';
import 'antd/dist/antd.css';
import AutoComplete from 'react-google-autocomplete';
import youtube from './youtube';
import SearchBar from './SearchBar';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';
import { Grid } from '@material-ui/core';
import Header from './Header';
import Bannar from './Bannar';
import Card from './Card';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Chat from './Chat';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';



Geocode.setApiKey("AIzaSyC8TObc-42ezqT3q6fb2qPDBnxjltnay6A")




class App extends React.Component{



  state = {


    videos:[],
    selectedVideo: null,

    address :"",
    city :"",
    area :"",
    state :"",
    zoom :"15",
    height :"400",
    mapPosition : {
      lat:0,
      lng:0,
    },
    markerPosition :{
      lat:0,
      lng:0,
    },
  }


  componentDidMount() {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition( position => {
        this.setState({
          mapPosition :{
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          markerPosition: {
            lat:position.coords.latitude,
            lng:position.coords.longitude,
          }
        },() => {
          Geocode.fromLatLng(position.coords.latitude,position.coords.longitude)
          .then(response => {

           const address = response.results[0].formatted_address,
                 addressArray = response.results[0].address_components,
                 city = this.getCity(addressArray),
                 area = this.getArea(addressArray),
                 state = this.getState(addressArray);

             this.setState({
               address : (address) ? address : "",
               city : (city) ? city: "",
               area : (area) ? area: "",
               state: (state)? state: "",
        })
      })
    })
  })
 }
}



  getCity = (addressArray) => {
    let city = '';
    for(let index=0; index<addressArray.length; index++) {
      if(addressArray[index].types[0]&&'administrative_area_level_2' === addressArray[index].types[0]) {
       city=addressArray[index].long_name;
       return city;
      }
    }
  }

getArea=(addressArray) => {
  let area = '';
  for(let index=0; index<addressArray.length; index++) {
    if(addressArray[index].types[0]){
      for(let j =0; j<addressArray.length; j++) {
        if('sublocalty_level_1' === addressArray[index].types[j] || 'localty' ===addressArray[index].types[j]) {
      area = addressArray[index].long_name;
      return area;
      }
     }
    }
   }
  }

getState =(addressArray) => {
  let state = '';
  for(let index=0; index<addressArray.length; index++) {
    for(let index=0; index<addressArray.length; index++) {
      if(addressArray[index].types[0] && 'administrative_area_level_1' ===addressArray[index].types[0]) {
        state = addressArray[index].long_name;
        return state;
      }
    }
  }
}


  onMarkerDragEnd= (event) => {
     let newLat = event.latLng.lat();
     let newLng = event.latLng.lng();


     Geocode.fromLatLng(newLat,newLng)
     .then(response => {

      const address = response.results[0].formatted_address,
            addressArray = response.results[0].address_components,
            city = this.getCity(addressArray),
            area = this.getArea(addressArray),
            state = this.getState(addressArray);

        this.setState({
          address : (address) ? address : "",
          city : (city) ? city: "",
          area : (area) ? area: "",
          state: (state)? state: "",
          markerPosition: {
            lat:newLat,
            lng:newLng
          },
          mapPosition: {
            lat:newLat,
            lng:newLng
          }
        })
     })
  }


  onVideoSelect = (video) => {
    this.setState({ selectedVideo: video });
  }





  onPlaceSelected = (place) => {
    const address = place.formatted_address,
          addressArray = place.address_components,
          dhksc = place.address_components[0].long_name,
          city = this.getCity(addressArray),
          area = this.getArea(addressArray),
          state = this.getState(addressArray),
          newLat = place.geometry.location.lat(),
          newLng = place.geometry.location.lng();


    const   handleSubmit = async (searchTerm) => {
            const response = await youtube.get('search',{
              params:{
                q:searchTerm
               }
              });
            this.setState({videos: response.data.items, selectedVideo:response.data.items[0] });

            return console.log(response)
          }
      // Set these values in the state.
      this.setState({
        address: (address) ? address : '',
        area: (area) ? area : '',
        city: (city) ? city : '',
        state: (state) ? state : '',
          markerPosition: {
              lat: newLat,
              lng: newLng
          },
          mapPosition: {
              lat: newLat,
              lng: newLng
          },
      })
      handleSubmit(dhksc);

      return console.log({place})
   }




 render() {



   const MapWithAMarker = withScriptjs(withGoogleMap(props =>

    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: this.state.mapPosition.lat , lng: this.state.mapPosition.lng }}
      mapTypeId = 'satellite'
    >

    <AutoComplete
      types={['(regions)']}
      onPlaceSelected= {this.onPlaceSelected}
      className="auto"
     />
      <Marker
        draggable={true}
        onDragEnd={this.onMarkerDragEnd}
        position={{ lat: this.state.markerPosition.lat , lng: this.state.markerPosition.lng}}
      >

       <InfoWindow>
        <div>
         {this.state.address}
        </div>
       </InfoWindow>


      </Marker>
    </GoogleMap>
  ));

   const {videos, selectedVideo} = this.state;




   return (

   
      


<Router>
<Switch>

<Route path="/chat">
      <Chat/>
    </Route>

<Route path="/">
   <div className="main">


   <div className="App">
      <header>
        <h1>We now have Auth!</h1>
      </header>
      <AmplifySignOut />
    </div>





     <div className="header">
      <Header/>
     </div>

     <div className="bannar">
      <Bannar/>
     </div>

   </div>

   <div className="GoogleMap_main">
     <MapWithAMarker
       googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC8TObc-42ezqT3q6fb2qPDBnxjltnay6A&v=3.exp&libraries=geometry,drawing,places"
       loadingElement={<div style={{ height: `100%` }} />}
       containerElement={<div style={{ height: `70vh` }} />}
       mapElement={<div style={{ height: `100%` }} />}
     />
    </div>

    <div className="grid">
     <Grid justify="center"  container spacing={10} className="grid">
      <Grid item xs={12}>
       <Grid  container spacing={10}>

        <Grid item xs={8}>
          <VideoDetail video={selectedVideo}/>
        </Grid>

        <Grid item xs={4}>
           <VideoList videos={videos} onVideoSelect={this.onVideoSelect}/>
        </Grid>

       </Grid>
      </Grid>
     </Grid>
    </div>

  <div className="house">
   <Card
   city="London"
   prices="Macdonalds 3$"
   src="https://images.unsplash.com/photo-1516382772789-f9bfd7cb7532?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8c3RvY2tob2xtfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=60"/>
   <Card
   city="Stockholm"
   prices="Macdonalds 3$"
   src="https://images.unsplash.com/photo-1497217968520-7d8d60b7bc25?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8c3RvY2tob2xtfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=60"/>
   <Card
   city="Paris"
   prices="Macdonalds 3$"
   src="https://images.unsplash.com/photo-1580339841933-f06ca55842d0?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8c3RvY2tob2xtfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=60"/>
  </div>

  <div className="house">
   <Card
   city="Gotland"
   prices="Macdonalds 3$"
   src="https://images.unsplash.com/photo-1464724680407-16b588cd4ccc?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NjN8fGZyYW5jZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"/>
   <Card
   city="Paris"
   prices="Macdonalds 3$"
   src="https://images.unsplash.com/photo-1551258914-1d1068e30331?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Nnx8c2FuZnJhbmNpc2NvfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"/>
   <Card
   city="Iceland"
   prices="Macdonalds 3$"
   src="https://images.unsplash.com/photo-1501952476817-d7ae22e8ee4e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Nnx8Z2VybWFueXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"/>
  </div>

</Route>
</Switch>
</Router>




   );
 }
}


export default App;
