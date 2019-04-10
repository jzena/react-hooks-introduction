import React, { Fragment } from 'react';
import { useHttp } from '../hooks/http';

import './CharPicker.css';

const CharPicker = props => {
  const [isLoading, fetchedData] = useHttp('https://swapi.co/api/people', []);
  let selectedCharacters = [];
  
  if (fetchedData) {  
    selectedCharacters = fetchedData.results.slice(0, 5).map((char, index) => ({
      name: char.name,
      id: index + 1
    }));
  }

  let content = <p>Loading characters...</p>;

  if (
    !isLoading &&
    selectedCharacters &&
    selectedCharacters.length > 0
  ) {
    content = (
      <Fragment>
        <div>Select a charecter:</div>
        <select
          onChange={ props.onCharSelect }
          value={ props.selectedChar }
          className={ props.side }
        >
          { selectedCharacters.map(char => (
            <option key={ char.id } value={ char.id }>
              { char.name }
            </option>
          )) }
        </select>
      </Fragment>
    );
  } else if (
    !isLoading &&
    (!selectedCharacters || selectedCharacters.length === 0)
  ) {
    content = <p>Could not fetch any data.</p>;
  }
  return content;
}

export default CharPicker;
