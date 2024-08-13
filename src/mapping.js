export const characterMap = (apiCharacter) => {
  const height = isNaN(apiCharacter.height) ? '-- высота неизвестна --' : apiCharacter.height;
  const currentYear = new Date().getFullYear()
  return {
    name: apiCharacter.name ?? '-- неизвестно --',
    height: height,
    mass: isNaN(apiCharacter.mass) ? '-- неизвестно --' : Number(apiCharacter.mass),
    isLiked: false,
    id: Number(apiCharacter.url.split('/')[5]) ?? '--id недоступно',
    age: isNaN(parseInt(apiCharacter.birth_year) + currentYear) ? '-- неизвестно --' : parseInt(apiCharacter.birth_year) + currentYear
  }
}
