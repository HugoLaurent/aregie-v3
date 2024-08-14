import React from 'react';

import './button-text-icon-style.css';

export default function ButtonIconText({ onClick, icon, alt, text }) {
  return (
    <button onClick={onClick} className='button-icon-text-container'>
      <img src={icon} alt={alt} className='icon' />
      <span>{text}</span>
    </button>
  );
}
