import React, { useState, useEffect, Fragment } from 'react';

import './CharPicker.css';

const CharPicker = props => {
  const [loadedChars, setLoadedChars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // execute after component render 
    // when you set second argument lik an empty [] = like componentDidMount
    console.log('useEffect runs');
    setIsLoading(true);
    fetch('https://swapi.co/api/people')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch.');
        }
        return response.json();
      })
      .then(charData => {
        const selectedCharacters = charData.results.slice(0, 5);
        const listOfChars = selectedCharacters.map((char, index) => ({
          name: char.name,
          id: index + 1
        }));
        setIsLoading(false);
        setLoadedChars(listOfChars);
      })
      .catch(err => {
        setIsLoading(false);
        console.log(err);
      });
  }, []);

  let content = <p>Loading characters...</p>;

  if (
    !isLoading &&
    loadedChars &&
    loadedChars.length > 0
  ) {
    content = (
      <Fragment>
        <div>Select a charecter:</div>
        <select
          onChange={ props.onCharSelect }
          value={ props.selectedChar }
          className={ props.side }
        >
          { loadedChars.map(char => (
            <option key={ char.id } value={ char.id }>
              { char.name }
            </option>
          )) }
        </select>
      </Fragment>
    );
  } else if (
    !isLoading &&
    (!loadedChars || loadedChars.length === 0)
  ) {
    content = <p>Could not fetch any data.</p>;
  }
  return content;
}

export default CharPicker;
