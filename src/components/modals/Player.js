import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import Button from '../layout/Button';
import ReactPlayer from 'react-player'
import './Player.scss';

const Player = ({ data, showPlayer, isOpen }) => {
  return (
    <Modal 
      isOpen={isOpen}
      onRequestClose={showPlayer}
      ariaHideApp={false}
      className="modal-player"
      overlayClassName="modal-overlay"
    >
      <Button 
        onClick={showPlayer}
        label="x"
      />
      <ReactPlayer
        className="react-player"
        url={data.url}
        playing
        controls
        volume={1}
      />
    </Modal>
  )
}

Player.propTypes = {
  data: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  showPlayer: PropTypes.func.isRequired
}

export default Player