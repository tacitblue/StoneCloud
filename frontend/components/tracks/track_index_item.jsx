import React, { Component } from 'react';
import { Link } from 'react-router';
import { playTrack } from '../../actions/play_actions';
import { indexStart, indexPlay, indexPause } from '../../util/play_functions';

class TrackIndexItem extends Component {
  constructor(props) {
    super(props);
    this.togglePlay = this.togglePlay.bind(this);
  }

  componentDidMount() {
    if($('#fa-' + this.props.track.id)[0].className === "fa fa-pause") {
      $('#fa-' + this.props.track.id)[0].style.fontSize = "0.9em";
      $('#fa-' + this.props.track.id)[0].style.margin = "6px 6px";
    }
  }

  togglePlay(e) {
    e.preventDefault();

    const id = this.props.track.id;
    const playbar = $('#playbar')[0];
    const song = $('#song')[0];
    const buttonImage = $('#fa-' + id)[0];
    const prevButton = $('#fa-' + store.getState().nowPlaying.id)[0];
    const playButtonImage = $('#playbar-button-img')[0];

    if(song.src != this.props.track.song_url) {
      indexStart(playbar, playButtonImage, buttonImage, prevButton);
      store.dispatch(playTrack(this.props.track));
    } else if(song.paused) {
      indexPlay(buttonImage, playButtonImage);
      song.play();
    } else {
      indexPause(buttonImage, playButtonImage);
      song.pause();
    }
  }

  render() {
    const initialState = this.props.track && this.props.track.song_url === store.getState().nowPlaying.song_url ? "fa fa-pause" : "fa fa-play";

    return(
      <li>
        <section className="track-index-item">
          <img src={this.props.track.image_url}/>
          <a href="#" className="track-play-button" onClick={this.togglePlay}>
            <i id={"fa-" + this.props.track.id} className={initialState} aria-hidden="true"></i>
          </a>

          <div className="track-item-info">
            <p>{this.props.track.poster}</p>
            <Link to={`/tracks/${this.props.track.id}`} id="title-link">
              {this.props.track.artist} - {this.props.track.title}
            </Link>
          </div>
        </section>
      </li>
    );
  }
}

export default TrackIndexItem;
