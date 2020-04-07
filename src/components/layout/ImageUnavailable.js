import React from 'react';
import { FaRegImage } from 'react-icons/fa';
import './ImageUnavailable.scss';

const ImageUnavailable = () => {
  return (
    <div className="no-image">
      <FaRegImage/>
    </div>
  )
}

export default ImageUnavailable