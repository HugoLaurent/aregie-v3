import React from 'react';
import './input.css';

/*
  Ce composant est un champ de saisie de date (`input` de type `date`) qui peut être utilisé dans divers formulaires pour sélectionner une date.
  Il accepte les propriétés suivantes :
  - `onChange` (function) : Fonction appelée chaque fois que la valeur du champ est modifiée. Cette fonction reçoit l'événement de changement comme argument.
  - `value` (string) : La valeur actuelle du champ, au format de date ISO (YYYY-MM-DD).
  - `id` (string) : Identifiant unique du champ de saisie, utilisé pour associer l'étiquette au champ.
  - `label` (string) : Texte de l'étiquette affichée au-dessus du champ de saisie.

  /!\ Le label est positionné en dessous de l'input pour permettre une animation lorsque l'input est en focus. /!\
  /!\ Il est important que `id` soit unique pour chaque instance du composant afin d'assurer l'accessibilité correcte. /!\
*/

export default function InputDate({ onChange, value, id, label, className }) {
  return (
    <div className='input-container'>
      <input
        className={`${className ? className : ''} input`}
        type='date'
        onChange={onChange}
        value={value}
        id={id}
      />
      <label className='input-label' htmlFor={id}>
        {label}
      </label>
    </div>
  );
}
