import React, { useState, useRef } from 'react';
import './input.css';

/*
  Ce composant est un champ de sélection de fichier qui permet aux utilisateurs de télécharger un fichier soit en le faisant glisser-déposer, soit en cliquant pour ouvrir le sélecteur de fichiers.
  Il gère également l'affichage d'une description de fichier et des indicateurs visuels pour le glissement-dépose et la sélection de fichier.

  Il accepte les propriétés suivantes :
  - `onFileInputChange` (function) : Fonction appelée lorsque le fichier est sélectionné ou déposé. Elle reçoit l'événement d'entrée de fichier comme argument.
  - `fileDescription` (string) : Texte descriptif affiché dans la zone de dépôt, indiquant ce qui est attendu ou le fichier actuellement sélectionné.
  - `inputRef` (ref) : Référence au champ de fichier caché pour gérer les interactions de fichier.
  - `className` (string) : Classes CSS supplémentaires à ajouter à la zone de dépôt.
  - `setMissingFile` (function) : Fonction pour mettre à jour le message affiché lorsqu'aucun fichier n'est sélectionné ou pour afficher le nom du fichier sélectionné.

  Le composant gère les événements de glissement-dépose :
  - `handleDragOver` : Gère l'événement lorsque le fichier est glissé au-dessus de la zone de dépôt. Active l'indicateur visuel de glissement.
  - `handleDragLeave` : Gère l'événement lorsque le fichier quitte la zone de dépôt. Désactive l'indicateur visuel de glissement.
  - `handleDrop` : Gère l'événement lorsque le fichier est déposé dans la zone de dépôt. Met à jour le champ de fichier caché et appelle `onFileInputChange`.

  Le composant gère également les événements de sélection de fichier :
  - `handleChange` : Gère l'événement lorsque l'utilisateur sélectionne un fichier via le sélecteur de fichiers. Met à jour l'état de sélection du fichier et appelle `onFileInputChange`.

  Le composant permet d'annuler la sélection ou le dépôt de fichier :
  - `handleCancel` : Réinitialise l'état du composant et le champ de fichier caché, met à jour le message d'absence de fichier, et appelle `onFileInputChange`.

  Le rendu du composant affiche un message descriptif et une icône pour interagir avec la sélection de fichier.
*/

const InputFile = ({
  onFileInputChange,
  fileDescription,
  inputRef,
  className,
  setMissingFile,
}) => {
  const [dragOver, setDragOver] = useState(false);
  const [isDragged, setIsDragged] = useState(false);
  const [isFileSelected, setIsFileSelected] = useState(false);

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragOver(false);
    setIsDragged(true);
    setIsFileSelected(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      setMissingFile(file.name);
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      inputRef.current.files = dataTransfer.files;
      onFileInputChange({ target: inputRef.current });
    }
  };

  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsFileSelected(true);
      setIsDragged(false);
      onFileInputChange(event);
      setMissingFile(file.name);
    }
  };

  const handleCancel = () => {
    setIsDragged(false);
    setIsFileSelected(false);
    setMissingFile('Choisissez ou faites glisser-déposer un fichier.');
    if (inputRef.current) {
      inputRef.current.value = null;
    }
    onFileInputChange({ target: inputRef.current });
  };

  return (
    <div className='form-group'>
      <input
        ref={inputRef}
        type='file'
        name='base64'
        style={{ display: 'none' }}
        id='base64'
        onChange={handleChange}
      />

      <div
        className={`dropzone ${
          isDragged || isFileSelected ? 'drag-over' : ''
        } ${className ? className : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current.click()}
      >
        <p>
          {fileDescription
            ? fileDescription
            : 'Glissez et déposez un fichier ou cliquez ici pour ajouter un fichier'}
        </p>
        {isDragged || isFileSelected ? (
          <i onClick={handleCancel} className='fa fa-trash'></i>
        ) : (
          <i className='fa fa-download'></i>
        )}
      </div>
    </div>
  );
};

export default InputFile;
