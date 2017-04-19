import React, { Component } from 'react';

class TrackShow extends Component {
  componentDidMount() {
    this.props.fetchTrack(this.props.params.trackId);
  }

  componentDidUpdate() {
    this.props.fetchTrack(this.props.params.trackId);
  }

  render() {
    if(this.props.track) {
      return(
        <div className="track-show">
          <img src={this.props.track.image_url}/>
          <h2>{this.props.track.title}</h2>
          <p>{this.props.track.poster}</p>
          <audio src={this.props.track.song_url} autoPlay="true"/>
        </div>
      );
    } else {
      return(<div/>)
    }
  }
}

export default TrackShow;
