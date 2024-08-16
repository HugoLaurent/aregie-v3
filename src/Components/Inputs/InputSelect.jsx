import React from 'react';
import './input.css';

/*
  Ce composant est un menu déroulant (dropdown) personnalisable utilisé pour sélectionner une option parmi plusieurs.
  Il accepte les propriétés suivantes :
  - `options` (array) : Un tableau d'objets représentant les options disponibles. Chaque objet doit avoir des clés correspondant à `optionKey` et `optionLabel`.
  - `selectedValue` (string) : La valeur actuellement sélectionnée dans le menu déroulant.
  - `onChange` (function) : La fonction appelée chaque fois que la valeur sélectionnée change.
  - `id` (string) : L'identifiant unique du menu déroulant.
  - `label` (string) : Le texte de l'étiquette associé au menu déroulant.
  - `defaultOption` (string) : Une option par défaut avec une valeur vide ou un message indicatif affiché en premier dans le menu déroulant.
  - `includeAllOption` (boolean) : Booléen pour inclure une option "Tous les timers" dans le menu déroulant.
  - `optionKey` (string) : Clé pour l'identifiant unique de chaque option dans le tableau d'options (par défaut : 'Code').
  - `optionLabel` (string) : Clé pour le label affiché pour chaque option dans le tableau d'options (par défaut : 'Nom').
  - `className` (string) : Classes CSS supplémentaires à ajouter au menu déroulant.

  /!\ Si `label` est fourni, il sera affiché au-dessus du menu déroulant. /!\
*/

export default function SelectDropdown({
  options,
  selectedValue,
  onChange,
  id,
  label,
  defaultOption,
  includeAllOption,
  optionKey = 'Code',
  optionLabel = 'Nom',
  className,
}) {
  return (
    <div className='dropdown-container'>
      {label && (
        <label
          htmlFor={id}
          className='dropdown-label'
          style={{ top: 0, textAlign: 'left', marginBottom: '0' }}
        >
          {label}
        </label>
      )}
      <select
        onChange={onChange}
        className={`${className ? className : ''} dropdown-select`}
        id={id}
        value={selectedValue}
      >
        {defaultOption && <option value=''>{defaultOption}</option>}
        {includeAllOption && <option value='tous'>Tous les timers</option>}
        {options.map((option) => (
          <option key={option[optionKey]} value={option[optionKey]}>
            {option[optionLabel]}
          </option>
        ))}
      </select>
    </div>
  );
}
