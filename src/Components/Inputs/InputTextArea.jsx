import React from 'react';
import './input.css';

/*
  Ce composant est un champ de texte multilignes (textarea) utilisé pour saisir des commentaires ou des textes longs.
  Il accepte les propriétés suivantes :
  - `value` (string) : La valeur actuelle du champ textarea.
  - `id` (string) : L'identifiant unique du champ textarea.
  - `label` (string) : Le texte de l'étiquette associé au champ textarea.
  - `onChange` (function) : La fonction appelée chaque fois que la valeur du champ textarea est modifiée.
  - `placeholder` (string) : Le texte indicatif affiché à l'intérieur du champ textarea avant la saisie.
  - `rows` (number) : Le nombre de lignes visibles dans le textarea.
  - `className` (string) : Classes CSS supplémentaires à ajouter au champ textarea.

  /!\ Le label est positionné en dessous du textarea pour permettre une animation lors du focus. /!\
*/

export default function InputTextArea({
  value,
  id,
  label,
  onChange,
  placeholder,
  rows,
  className,
}) {
  return (
    <div className='input-container'>
      <textarea
        className={`${className ? className : ''} input`}
        name={id}
        rows={rows}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      <label htmlFor={id} className='input-label'>
        {label}
      </label>
    </div>
  );
}
