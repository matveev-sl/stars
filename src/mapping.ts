import { Api } from '@vitejs/plugin-vue';

const UNKNOWN_VALUE = '-- неизвестно --';

// Описание типа для apiCharacter
export interface ApiCharacter {
  name?: string; // Имя может быть неопределенным
  height: string; // Высота обязательно
  mass: string; // Масса может быть строкой или числом
  birth_year?: string; // Год рождения может быть неопределенным
  url: string; // URL обязательно
}

export type Character = {
  name: string;
  height: number;
  mass: number;
  id: number;
  age?: number; // Мы подчеркиваем, что в нашем дизайне что-то не так
}
const isObject = (value: unknown) => {
  return value !== null && typeof value === 'object';
};

const cleanServerData = (data: unknown): ApiCharacter => {
  if (!isObject(data)) {
    throw new Error('Server data not expected and cannot be restored');
  }
  let url = '';
  if ('url' in data) {
    if (typeof data.url === 'string') {
      url = data.url;
    }
  } else {
    throw new Error('Server data not expected and cannot be restored');
  }

  const apiCharacter: ApiCharacter = { url };

  if ('mass' in data) {
    if (typeof data.mass === 'string') {
      apiCharacter.mass = data.mass;
    }
  }
  if ('height' in data) {
    if (typeof data.height === 'string') {
      apiCharacter.height = data.height;
    }
  }
  if ('name' in data) {
    if (typeof data.name === 'string') {
      apiCharacter.name = data.name;
    }
  }
  if ('birth_year' in data) {
    if (typeof data.birth_year === 'string') {
      apiCharacter.birth_year = data.birth_year;
    }
  }
  return apiCharacter;
};

// Функция для преобразования apiCharacter в Character
export const characterMap = (data: unknown): Character => {
  const apiCharacter = cleanServerData(data);
  if (typeof apiCharacter.mass !== 'string' && typeof apiCharacter.mass !== 'number') {
    throw new Error('mass is not a string or number');
  }
  apiCharacter.mass.toLowerCase()
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

  const birthYear = apiCharacter?.birth_year && !isNaN(parseInt(apiCharacter.birth_year))
    ? parseInt(apiCharacter.birth_year)
    : undefined;

  return {
    name: apiCharacter.name ?? UNKNOWN_VALUE,
    height: height,
    mass: isNaN(Number(apiCharacter.mass)) ? undefined : Number(apiCharacter.mass),
    id: parseId(apiCharacter.url),
    age: birthYear
      ? birthYear + currentYear
      : undefined
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
