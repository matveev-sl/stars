const UNKNOWN_VALUE = '-- неизвестно --';

export const characterMap = (apiCharacter) => {
  const height = isNaN(apiCharacter.height) ? UNKNOWN_VALUE : apiCharacter.height;
  const currentYear = new Date().getFullYear();
  return {
    name: apiCharacter.name ?? UNKNOWN_VALUE,
    height: height,
    mass: isNaN(apiCharacter.mass) ? UNKNOWN_VALUE : Number(apiCharacter.mass),
    isLiked: false,
    id: parseId(apiCharacter.url),
    age: isNaN(parseInt(apiCharacter.birth_year) + currentYear)
      ? UNKNOWN_VALUE
      : parseInt(apiCharacter.birth_year) + currentYear
  };
};

export const parseId = (url) => {
  // expected url: 'https://swapi.dev/api/people/2/'
  const idRegex = /.*people\/(\d+)/;
  const match = url.match(idRegex);
  if (match && match.length === 2) {
    return parseInt(match[1]);
  }
  throw new Error('Id was not parsed');
};