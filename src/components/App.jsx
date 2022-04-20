import React, { useState,useEffect } from 'react';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import Button from './Button/Button';

import fetchImages from '../services/api';

export default function App() {
  const [modalContent, setModalContent] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [visibleImages, setVisibleImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    getData();
  }, [searchQuery, page]);
  useEffect(() => {
    handleScroll();
  });
  const toggleModal = () => {
    setIsOpenModal(!openModal);
  };
  const toggleLoading = () => {
    setIsLoading(!isLoading);
  };
  const handleChange = (query) => {
    setSearchQuery(query);
    setPage(1);
    setVisibleImages([]);
  };
  const getData = () => {
    if (searchQuery !== '' || page !== 1) {
      fetchImages(searchQuery, page)
        .then(({ hits }) => setVisibleImages([...visibleImages, ...hits]))
        .then(handleScroll)
        .catch((error) => console.log(error.message))
        .finally(() => {
        setIsLoading(false)
      })
    }
  };
  const handleNext = () => {
    toggleLoading()
    setPage((prevState) => prevState + 1);
  };
  const handleScroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    })
  };

    const modalContentSet = (itemId) => {
    const element = visibleImages.find(({ id }) => id === itemId);
    setModalContent(element.largeImageURL);
  };
  const isNotLastPage = visibleImages.length / page === 12;
  const btnEnable = visibleImages.length > 0 && !isLoading && isNotLastPage;
  return (
      <>
        <Searchbar onSubmit={handleChange} />
     
         <>
            <ImageGallery
              images={visibleImages}
              onClick={toggleModal}
              onImgClick={modalContentSet}
            />

              {openModal && (
                <Modal content={modalContent}
                onBackdrop={toggleModal}/>
              )}
              {isLoading && <Loader/>}
              {btnEnable && (
                <Button name='Load more...' onPress={handleNext}/>
            )}
          </>
      </>
    );
};
