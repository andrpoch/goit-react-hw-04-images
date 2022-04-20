import React from 'react';
import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({id, webformatURL,onImgClick}) {
  const modalContent = (id) => {
    onImgClick(id);
  };
      return (
      <img
        src={webformatURL}
        alt=""
        className={s.img}
        onClick={() => modalContent(id)}
      />
    );
};
ImageGalleryItem.propTypes = {
  onImgClick: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  webformatURL: PropTypes.string.isRequired,
};