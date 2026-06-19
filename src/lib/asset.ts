export function catalogueAsset(file: string) {
  return `${import.meta.env.BASE_URL}assets/catalogue/${file}`;
}

export function mapAsset(file: string) {
  return `${import.meta.env.BASE_URL}assets/maps/${file}`;
}
