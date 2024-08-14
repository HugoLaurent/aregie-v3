import React from 'react';
import './button-list-style.css';

export default function ButtonList({ onClick, icon, alt, text }) {
  return (
    <button onClick={onClick} className='button-list-container'>
      <img src={icon} alt={alt} className='icon' />
      <span>{text}</span>
    </button>
  );
}
