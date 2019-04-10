import React, { useState, useEffect } from 'react';

import Summary from './Summary';

const Character = props => {
  const [loadedCharacter, setLoadedCharacter] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = () => {
    console.log(
      'Sending Http request for new character with id ' +
      props.selectedChar
    );
    setIsLoading(true);
    fetch('https://swapi.co/api/people/' + props.selectedChar)
      .then(response => {
        if (!response.ok) {
          throw new Error('Could not fetch person!');
        }
        return response.json();
      })
      .then(charData => {
        const loadedCharacter = {
          id: props.selectedChar,
          name: charData.name,
          height: charData.height,
          colors: {
            hair: charData.hair_color,
            skin: charData.skin_color
          },
          gender: charData.gender,
          movieCount: charData.films.length
        };
        setIsLoading(false);
        setLoadedCharacter(loadedCharacter);
      })
      .catch(err => {
        setIsLoading(false);
        console.log(err);
      });
  };

  console.log('rendering...');

  // 1.componentDidMount []
  // 2.componentDidUpdate [props.selectedChar]: if (prevProps.selectedChar !== this.props.selectedChar) {
  // 3.componentWillUnmount or rerendering: return console.log('Cleaning up...');
  useEffect(() => {
    fetchData();

    return () => {
      console.log('Cleaning up...');
    }
  }, [props.selectedChar]);

  // 1.componentDidUnmount: return console.log('component did unmount');
  useEffect(() => {
    return () => {
      console.log('component did unmount');
    };
  }, []);

  let content = <p>Loading Character...</p>;

  if (!isLoading && loadedCharacter.id) {
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
  } else if (!isLoading && !loadedCharacter.id) {
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
