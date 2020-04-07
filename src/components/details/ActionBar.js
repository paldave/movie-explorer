import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FaStar } from 'react-icons/fa';
import Button from '../layout/Button';
import Player from '../modals/Player';
import './ActionBar.scss';

export default class ActionBar extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  }

  state = {
    playerActive: false,
  }

  showPlayer = () => (
    this.setState((state) => ({
      playerActive: !state.playerActive
    }))
  )

  renderTrailer() {
    const { videos } = this.props.data;

    if (videos.length === 0) {
      return (
        <p className="trailer">
          <Button label="Trailer unavailable" disabled={true}/>  
        </p>
      )
    }

    return (
      <p className="trailer">
        <Button label="Play trailer" onClick={this.showPlayer}/>
        <Player 
          data={videos[0]} 
          isOpen={this.state.playerActive} 
          showPlayer={this.showPlayer} 
        />
      </p>
    );
  }

  render() {
    const { data } = this.props;

    return (
      <section className="action-bar">
        <div className="rating">
          User rating: <span className="vote-number">{data.vote_average || '-'}</span>
          <span><FaStar/></span>
        </div>
        {this.renderTrailer()}
      </section>
    )
  }
}