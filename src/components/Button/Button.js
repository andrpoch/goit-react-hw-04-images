import React from 'react';
import PropTypes from 'prop-types';
import s from './Button.module.css';

export default function Button({ onPress }) {
   return (
      <div className={s.wrapper}>
      <button type='button' onClick={onPress} className={s.button}>
         Load more...
         </button>
      </div>
   );
};

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
}


