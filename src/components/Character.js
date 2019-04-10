import React, { useEffect } from 'react';

import Summary from './Summary';
import { useHttp } from '../hooks/http';

const Character = props => {
  const url = 'https://swapi.co/api/people/' + props.selectedChar;
  const [isLoading, fetchedData] = useHttp(url, [props.selectedChar]);
  let loadedCharacter = null;

  if (fetchedData) {    
    loadedCharacter = {
      id: props.selectedChar,
      name: fetchedData.name,
      height: fetchedData.height,
      colors: {
        hair: fetchedData.hair_color,
        skin: fetchedData.skin_color
      },
      gender: fetchedData.gender,
      movieCount: fetchedData.films.length
    };
  }
  // 1.componentDidUnmount: return console.log('component did unmount');
  useEffect(() => {
    return () => {
      console.log('component did unmount');
    };
  }, []);

  let content = <p>Loading Character...</p>;

  if (!isLoading && loadedCharacter) {
    content = (
      <Summary
        name={ loadedCharacter.name }
        gender={ loadedCharacter.gender }
        height={ loadedCharacter.height }
        hairColor={ loadedCharacter.colors.hair }
        skinColor={ loadedCharacter.colors.skin }
        movieCount={ loadedCharacter.movieCount }
      />
    );
  } else if (!isLoading && !loadedCharacter) {
    content = <p>Failed to fetch character.</p>;
  }
  return content;

}

// 1. oposite to shouldComponentUpdate: return nextProps.selectedChar === prevProps.selectedChar;
//  - true : no render
//  - false: render
// 2.React.memo(Character): like pure component
export default React.memo(Character, (prevProps, nextProps) => {
  return nextProps.selectedChar === prevProps.selectedChar;
});
