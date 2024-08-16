import React from 'react';
import './input.css';

/*
  Ce composant est une case à cocher (`input` de type `checkbox`) utilisée dans les formulaires pour représenter une option binaire (cochée ou non cochée).
  Il accepte les propriétés suivantes :
  - `type` (string) : Le type de l'input, généralement "checkbox" pour ce composant. Par défaut, cette valeur est "checkbox" mais peut être personnalisée si nécessaire.
  - `onChange` (function) : Fonction appelée chaque fois que l'état de la case à cocher change. Elle reçoit l'événement de changement comme argument.
  - `value` (string) : La valeur associée à la case à cocher. Cette valeur est envoyée lors de l'envoi du formulaire.
  - `id` (string) : Identifiant unique de la case à cocher, utilisé pour associer l'étiquette au champ.
  - `label` (string) : Texte de l'étiquette affiché à côté de la case à cocher.
  - `checked` (boolean) : Booléen indiquant si la case est cochée (`true`) ou non (`false`).

  /!\ Le label est affiché au-dessus de la case à cocher pour assurer la lisibilité et l'accessibilité. /!\
*/

export default function InputCheckBox({
  type = 'checkbox',
  onChange,
  value,
  id,
  label,
  checked,
}) {
  return (
    <div className='checkbox-container'>
      <label className='checkbox-label' htmlFor={id}>
        {label}
      </label>
      <input
        className='checkbox'
        type={type}
        onChange={onChange}
        value={value}
        id={id}
        checked={checked}
      />
    </div>
  );
}
