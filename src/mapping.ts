const UNKNOWN_VALUE = '-- неизвестно --';

// Описание типа для apiCharacter
export interface ApiCharacter {
  name?: string; // Имя может быть неопределенным
  height: string; // Высота обязательно
  mass: string | number; // Масса может быть строкой или числом
  birth_year?: string; // Год рождения может быть неопределенным
  url: string; // URL обязательно
}

export type Character = {
  name: string;
  height: string;
  mass: string | number;
  id: number;
  age: number | string; // Мы подчеркиваем, что в нашем дизайне что-то не так
}
const isObject = (value: unknown) => {
  return value !== null && typeof value === 'object';
};

// Функция для преобразования apiCharacter в Character
export const characterMap = (apiCharacter: unknown): Character => {
  if (!isObject(apiCharacter)) {
    throw new Error('apiCharacter is not an object');
  }

  if (!('mass' in apiCharacter)) {
    throw new Error('mass is missing');
  }
  if (typeof apiCharacter.mass !== 'string' && typeof apiCharacter.mass !== 'number') {
    throw new Error('mass is not a string or number');
  }
  if (!('height' in apiCharacter)) {
    throw new Error('height is missing');
  }
  if (typeof apiCharacter.height !== 'string') {
    throw new Error('height is not a string');
  }
  if ('name' in apiCharacter && typeof apiCharacter.name !== 'string') {
    throw new Error('name is not a string');
  }

  if ('birth_year' in apiCharacter && typeof apiCharacter.birth_year !== 'string') {
    throw new Error('birth_year is not a string');
  }

  if (!('url' in apiCharacter)) {
    throw new Error('url is missing');
  }
  if (typeof apiCharacter.url !== 'string') {
    throw new Error('url is not a string');
  }

  const height = isNaN(parseFloat(apiCharacter.height)) ? UNKNOWN_VALUE : apiCharacter.height;
  const currentYear = new Date().getFullYear();

  return {
    name: apiCharacter.name ?? UNKNOWN_VALUE,
    height: height,
    mass: isNaN(Number(apiCharacter.mass)) ? UNKNOWN_VALUE : Number(apiCharacter.mass),
    id: parseId(apiCharacter.url),
    age: isNaN(parseInt(apiCharacter.birth_year) + currentYear)
      ? UNKNOWN_VALUE
      : parseInt(apiCharacter.birth_year) + currentYear
  };
};


// Функция для извлечения id из URL
export const parseId = (url: string): number => {
  // Ожидаемый URL: 'https://swapi.dev/api/people/2/'
  const idRegex = /.*people\/(\d+)/;
  const match = url.match(idRegex);
  if (match && match.length === 2) {
    return parseInt(match[1]);
  }
  throw new Error('Id was not parsed');
};
