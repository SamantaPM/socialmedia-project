import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import {
  getAllPins,
  getCategoryPins,
  getPinDetail,
  getSearchPins,
  getUserCreatedPins,
  getUserSavedPins,
  getUserData
} from './queries';
import { v4 as uuidv4 } from 'uuid';

export const client = createClient({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
  dataset: 'production',
  useCdn: false, // set to `false` to bypass the edge cache
  apiVersion: '2023-05-03', // use current date (YYYY-MM-DD) to target the latest API version
  token: process.env.REACT_APP_SANITY_TOKEN, // Only if you want to update content with the client
  ignoreBrowserTokenWarning: true
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);

export const uploadImage = (image) => {
  const acceptedImgs = ['image/tiff', 'image/jpeg', 'image/svg', 'image/png', 'image/gif'];
  if (!acceptedImgs.includes(image.type)) throw new Error('Wrong image type.');

  return client.assets.upload('image', image, { contentType: image.type, filename: image.name });
};

export const deleteImage = (imageId) => {
  return client.delete(imageId);
};

export const createPin = ({ title, about, destination, category, image, user }) => {
  const doc = {
    _type: 'pin',
    title,
    about,
    destination,
    category,
    userId: user?._id,
    postedBy: {
      _type: 'postedBy',
      _ref: user?._id
    },
    image: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: image?._id
      }
    }
  };

  return client.create(doc);
};

export const saveComment = ({ pinId, comment, userProfile }) => {
  return client
    .patch(pinId)
    .setIfMissing({ comments: [] })
    .insert('after', 'comments[-1]', [{ comment, _key: uuidv4(), postedBy: { _type: 'postedBy', _ref: userProfile._id } }])
    .commit();
};

export const savePin = (id, user, postedBy) => {
  return client.patch(id)
    .setIfMissing({ save: [] })
    .insert('after', 'save[-1]', [{
      _key: uuidv4(),
      userId: user?._id,
      postedBy: {
        _type: 'postedBy',
        _ref: postedBy?._id
      }
    }])
    .commit();
};

export const deletePin = (id) => {
  return client.delete(id);
};

export const fetchPins = (query = 'ALL', params) => {
  let fullQuery = '';
  switch (query) {
    case 'PIN':
      fullQuery = getPinDetail(params);
      break;
    case 'SEARCH':
      fullQuery = getSearchPins(params);
      break;
    case 'CATEGORY':
      fullQuery = getCategoryPins(params);
      break;
    case 'CREATED_PINS':
      fullQuery = getUserCreatedPins(params);
      break;
    case 'SAVED_PINS':
      fullQuery = getUserSavedPins(params);
      break;
    default:
      fullQuery = getAllPins();
  }

  return client.fetch(fullQuery);
};

export const fetchUser = (userId) => {
  const query = getUserData(userId);
  return client.fetch(query);
};
