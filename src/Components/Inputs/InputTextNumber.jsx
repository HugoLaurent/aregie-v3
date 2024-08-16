import React from 'react';
import './input.css';

/*
  Ce composant est un champ de saisie générique qui peut être utilisé dans divers formulaires.
  Il accepte les propriétés suivantes :
  - `type` (string) : Le type du champ (ex. : "text", "number", etc.).
  - `placeholder` (string) : Le texte indicatif affiché à l'intérieur du champ avant que l'utilisateur ne saisisse une valeur.
  - `onChange` (function) : La fonction appelée chaque fois que la valeur du champ est modifiée.
  - `value` (string | number) : La valeur actuelle du champ.
  - `id` (string) : L'identifiant unique du champ.
  - `name` (string) : Le nom du champ (utile pour les formulaires).
  - `label` (string) : Le texte de l'étiquette associé au champ.

  /!\ Le label est positionné en dessous du champ de saisie pour permettre une animation lors du focus de l'input. /!\
*/

export default function InputTextNumber({
  type,
  placeholder,
  className,
  onChange,
  name,
  value,
  id,
  label,
}) {
  return (
    <div className='input-container'>
      <input
        className={`${className ? className : ''} input`}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        id={id}
        name={name}
      />
      <label htmlFor={id} className='input-label'>
        {label}
      </label>
    </div>
  );
}
