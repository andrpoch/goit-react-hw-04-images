import React from 'react';
import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

export default function ImageGallery({images,onImgClick, onClick}) {
  const handleOpenModal = (e) => {
    if (e.target !== e.currentTarget) {
      onClick();
    }
  };
  return (
      <ul className={s.list} onClick={handleOpenModal}>
        {images &&
          images.map((image) => (
            <li key={image.id} className={s.item}>
              <ImageGalleryItem {...image} onImgClick={onImgClick} />
            </li>
          ))}
      </ul>
    );
};
ImageGallery.propTypes = {
  onClick: PropTypes.func.isRequired,
  onImgClick: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
};
