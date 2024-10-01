import { API_CHARS_PER_PAGE, API_FIRST_PAGE } from './config';
export function correctPage(url: string | number): number {
  const pageNumber = parseInt(url.toString()); 
  if (isNaN(pageNumber)) {
    return API_FIRST_PAGE;
  }
  return pageNumber;
}
export function correctChar(url: string | number): number {
  const charCount = parseInt(url.toString()); 
  if (isNaN(charCount)) {
    return API_CHARS_PER_PAGE;
  }
  return charCount;
}
