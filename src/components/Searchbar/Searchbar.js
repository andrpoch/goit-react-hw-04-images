import React, { useState } from 'react';
import PropTypes from 'prop-types';
import s from './Searchbar.module.css';

export default function Searchbar({onSubmit}) {
   const [searchQuery, setSearchQuery] = useState('');
   const handleChange = (e) => {
       switch (e.target.name) {
          case 'searchQuery':
             setSearchQuery(e.target.value);
             break;
          default:
             return;
       }
   };
   const handleSubmit = (e) => {
      e.preventDefault();
      if (searchQuery.trim() === "") {
         alert('Напиши шось!');
         return;
      }
      onSubmit(searchQuery);
   }
     return (
               <header className={s.searchbar}>
      <form className={s.form} onSubmit={handleSubmit}>
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
            onChange={handleChange}
            value={searchQuery}
         />
      </form>
      </header>
      );
};

Searchbar.propTypes = {
   onSubmit: PropTypes.func.isRequired,
}