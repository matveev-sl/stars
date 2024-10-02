import { API_CHARS_PER_PAGE, API_FIRST_PAGE } from './config';
export function getPage(url: string | undefined): number {
  if (!url) return API_FIRST_PAGE 
  const pageNumber = parseInt(url); 
  if (isNaN(pageNumber)) {
    return API_FIRST_PAGE;
  }
  return pageNumber;
}
export function getCharLimit(queryParam?: string ): number {
  if (!queryParam) return API_CHARS_PER_PAGE
  const charCount = parseInt(queryParam); 
  if (isNaN(charCount)) {
    return API_CHARS_PER_PAGE;
  }
  return charCount;
}
