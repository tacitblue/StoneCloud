import { connect } from 'react-redux';
import Playbar from './playbar';
import { playTrack, clearTrack } from '../../actions/play_actions';
import {
  showStart,
  showPlay,
  showPause,
  indexStart,
  indexPlay,
  indexPause
} from '../../util/play_functions';

const mapStateToProps = (state, ownProps) => {
  return {
    nowPlaying: state.nowPlaying,
    barStart: $('#fa-' + state.nowPlaying.id)[0] ? indexStart : showStart,
    barPlay: $('#fa-' + state.nowPlaying.id)[0] ? indexPlay : showPlay,
    barPause: $('#fa-' + state.nowPlaying.id)[0] ? indexPause : showPause
  }
};

const mapDispatchToProps = dispatch => ({
  playTrack: (track) => dispatch(playTrack(track)),
  clearTrack: () => dispatch(clearTrack())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Playbar);
