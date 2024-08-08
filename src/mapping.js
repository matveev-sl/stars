export const characterMap = (apiCharacter) => {
  const height = isNaN(apiCharacter.height) ? '-- высота неизвестна --' : apiCharacter.height
  return {
    name: apiCharacter.name ?? '-- неизвестно --',
    height: height,
    mass: isNaN(apiCharacter.mass) ? '-- неизвестно --' : Number(apiCharacter.mass),
    isLiked: false
  }
}
