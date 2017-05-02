import React, { Component } from 'react';
import { Link } from 'react-router';
import { startSong, playSong, pauseSong } from '../../util/play_functions';

class TrackIndexItem extends Component {
  constructor(props) {
    super(props);
    this.togglePlay = this.togglePlay.bind(this);
    this.addToUpNext = this.addToUpNext.bind(this);
  }

  addToUpNext(e) {
    e.preventDefault();
    if(!Object.values(this.props.playlist).map(song => song.id).includes(this.props.track.id)) {
      this.props.addSong(this.props.track);
    }
  }

  togglePlay(e) {
    e.preventDefault();

    const id = this.props.track.id;
    const playbar = $('#playbar')[0];
    const song = $('#song')[0];
    const buttonImage = $('#fa-' + id)[0];
    const prevButton = $('#fa-' + this.props.nowPlaying.id)[0];
    const playButtonImage = $('#playbar-button-img')[0];

    if(song.src != this.props.track.song_url) {
      startSong(playbar, playButtonImage, buttonImage, prevButton);
      this.props.clearList();
      this.props.playTrack(this.props.track, 0);
      this.props.addSong(this.props.track);
    } else if(song.paused) {
      playSong(buttonImage, playButtonImage);
      song.play();
    } else {
      pauseSong(buttonImage, playButtonImage);
      song.pause();
    }
  }

  render() {
    const initialState = this.props.track && this.props.track.song_url === this.props.nowPlaying.song_url && !$('#song')[0].paused ? "fa fa-pause" : "fa fa-play";

    return(
      <li>
        <section className="track-index-item">
          <img src={this.props.track.image_url}/>
          <a href="#" className="track-play-button" onClick={this.togglePlay}>
            <i id={"fa-" + this.props.track.id} className={initialState} aria-hidden="true"></i>
          </a>

          <div className="track-item-info">
            <Link to={`/users/${this.props.track.user_id}`}><p>{this.props.track.poster}</p></Link>
            <Link to={`/tracks/${this.props.track.id}`} id="title-link">
              {this.props.track.artist} - {this.props.track.title}
            </Link>
          </div>
        </section>
        <button className="next-button" onClick={this.addToUpNext}>Add to Up Next</button>
      </li>
    );
  }
}

export default TrackIndexItem;
