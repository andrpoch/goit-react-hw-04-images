import React, { Component } from 'react';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import Button from './Button/Button';

import fetchImages from '../services/api';

class App extends Component {
  state = {
    modalContent: "",
    searchQuery: "",
    page: 1,
    visibleImages: [],
    isLoading: false,
    openModal: false,
  };
  componentDidUpdate(prevProps, { searchQuery, page }) {
    if (searchQuery !== this.state.searchQuery || page !== this.state.page) {
      this.getData();
    }
    this.handleScroll();
  }
  toggleModal = () => {
    this.setState(({ openModal }) => ({ openModal: !openModal }));
  };
  toggleLoading = () => {
    this.setState(({ isLoading }) => ({ isLoading: !isLoading }));
  };
  handleChange = (query) => {
    this.setState({
      searchQuery: query,
      page: 1,
      visibleImages: [],
    });
  };
  handleNext = () => {
    this.setState(({ page }) => {
      return {
        page: page + 1,
      };
    })
  };
  handleScroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    })
  };
  modalContentSet = (itemId) => {
    const { visibleImages } = this.state;
    const element = visibleImages.find(({ id }) => id === itemId)
  this.setState({ modalContent: element.largeImageURL });
  };
  getData = () => {
    const { searchQuery, page } = this.state;
    this.toggleLoading();
    fetchImages(searchQuery, page)
      .then(({ hits }) => {
        this.setState(({ visibleImages }) => {
          return {
            visibleImages: [...visibleImages, ...hits]
          }
        });
      })
      .catch((error) => console.log(error.message))
      .finally(this.toggleLoading);
  };
  render() {
      const { visibleImages, openModal, modalContent, isLoading, page } =
        this.state;
      const notLastPage = visibleImages.length / page === 12;
      const btnEnable = visibleImages.length > 0 && !isLoading && notLastPage;
    return (
      <>
        <Searchbar onSubmit={this.handleChange} />
     
         <>
            <ImageGallery
              images={visibleImages}
              onClick={this.toggleModal}
              onImgClick={this.modalContentSet}
            />

              {openModal && (
                <Modal content={modalContent}
                onBackdrop={this.toggleModal}/>
              )}
              {isLoading && <Loader />}
              {btnEnable && (
                <Button name='Load more...' onPress={this.handleNext}/>
            )}
          </>
      </>
    );
  }
}
    
export default App;