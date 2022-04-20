import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './Searchbar.module.css';

class Searchbar extends Component {
   state = {
      searchQuery: '',
   };
   static propTypes = {
      onSubmit: PropTypes.func.isRequired,
   };
   handleSubmit = (e) => {
      e.preventDefault();
      const { searchQuery } = this.state;
      this.props.onSubmit( searchQuery );
      this.setState({ searchQuery: '' });
   };
   handleChange = (e) => {
      const { name, value } = e.currentTarget;
      this.setState({ [name]: value });
   }
   render() {
      const { searchQuery } = this.state;
      return (
         <header className={s.searchbar}>
  <form className={s.form} onSubmit={this.handleSubmit}>
    <button type="submit" className={s.button}>
      <span className={s.label}>Search</span>
    </button>

    <input
      className={s.input}
      type="text"
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
      name='searchQuery'
      onChange={this.handleChange}
      value={searchQuery}
    />
  </form>
</header>
      );
   }
}

export default Searchbar;

