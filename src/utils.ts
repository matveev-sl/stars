import { API_CHARS_PER_PAGE, API_FIRST_PAGE } from './config';

export function correctPage(url) {
  if (isNaN(parseInt(url))) {
    return API_FIRST_PAGE;
  }
  return parseInt(url);
}

export function correctChar(url) {
  if (isNaN(parseInt(url))) {
    return API_CHARS_PER_PAGE;
  }
  return parseInt(url);
}
