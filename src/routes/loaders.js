import { fetchPins } from '../sanity/client';
import { defer } from 'react-router-dom';

export const loaderFeed = () => {
  const pins = fetchPins();

  return defer({ pins });
};

export const loaderSearch = ({ request }) => {
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get('q');
  const pins = (!searchTerm) ? fetchPins() : fetchPins('SEARCH', searchTerm);
  const notFound = (!searchTerm);

  return defer({ searchTerm, pins, notFound });
};

export const loaderCategory = ({ params }) => {
  const pins = fetchPins('CATEGORY', params.categoryId);

  return defer({ pins });
};

export const loaderPin = ({ params }) => {
  const pin = fetchPins('PIN', params.pinId);

  return defer({ pin });
};

export const loaderProfileFeed = async ({ params }) => {
  const created = await fetchPins('CREATED_PINS', params.userId);
  const saved = await fetchPins('SAVED_PINS', params.userId);

  return ({ created, saved });
};
