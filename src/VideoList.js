import React from 'react';
import {Grid} from '@material-ui/core';
import VideoItem from './Videoitem';

const VideoList = ({videos,onVideoSelect}) =>{
  const listOfvideos = videos.map((video,id) => <VideoItem onVideoSelect={onVideoSelect} key={id} video={video}/>)
  return (
  <Grid container spacing={6}>
    {listOfvideos}
  </Grid>

  )
}
export default VideoList ;
