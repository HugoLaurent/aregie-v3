import React from 'react';
import './input.css';

/*
  Propriétés :
  - `value` (string) : La valeur actuelle du champ (ex. : "12:30:00").
  - `id` (string) : L'identifiant unique du champ.
  - `step` (number) : Le pas de l'input en secondes (ex. : 1).
  - `label` (string) : Le texte de l'étiquette associé au champ.
  - `onChange` (function) : Fonction appelée à chaque modification de la valeur du champ.

  Ce composant utilise le type `time` avec un pas d'une seconde (`step={1}`).
*/

export default function InputTime({ value, id, step, label, onChange }) {
  return (
    <div className='input-container'>
      <input
        type='time'
        step={step}
        className='input'
        value={value}
        id={id}
        onChange={onChange}
      />

      <label htmlFor={id} className='input-label'>
        {label}
      </label>
    </div>
  );
}
