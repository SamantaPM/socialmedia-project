export const getAllPins = () => {
  return `*[_type=='pin']| order(_createdAt desc)
    { _id,
      title,
      category,
      about,
      destination,
      userId,
      image{asset->{url}},
      postedBy->{_id,username,image},
      save[]{
        _key,
        userId,
        postedBy->{
          _id,
          username,
          image
        },
      }
    }`;
};

export const getPinDetail = (pinId) => {
  return `*[_type == "pin" && _id == '${pinId}']{
    image{
      asset->{
        url
      }
    },
    _id,
    title, 
    about,
    category,
    destination,
    postedBy->{
      _id,
      username,
      image
    },
   save[]{
    userId,
      postedBy->{
        _id,
        username,
        image
      },
    },
    comments[]{
      comment,
      _key,
      postedBy->{
        _id,
        username,
        image
      },
    }
  }`;
};

export const getCategoryPins = (categoryId) => {
  return `*[_type == "pin" && category match '${categoryId}*']{
        image{
          asset->{
            url
          }
        },
            _id,
            destination,
            postedBy->{
              _id,
              username,
              image
            },
            save[]{
              _key,
              userId,
              postedBy->{
                _id,
                username,
                image
              },
            },
          }`;
};

export const getSearchPins = (searchTerm) => {
  const query = `*[_type == "pin" && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*']{
          image{
            asset->{
              url
            }
          },
              _id,
              destination,
              postedBy->{
                _id,
                username,
                image
              },
              save[]{
                _key,
                userId,
                postedBy->{
                  _id,
                  username,
                  image
                },
              },
            }`;
  return query;
};

export const getUserCreatedPins = (userId) => {
  const query = `*[ _type == 'pin' && userId == '${userId}'] | order(_createdAt desc){
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      username,
      image
    },
    save[]{
      userId,
      postedBy->{
        _id,
        username,
        image
      },
    },
  }`;
  return query;
};

export const getUserSavedPins = (userId) => {
  const query = `*[_type == 'pin' && '${userId}' in save[].userId ] | order(_createdAt desc) {
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      username,
      image
    },
    save[]{
      userId,
      postedBy->{
        _id,
        username,
        image
      },
    },
  }`;
  return query;
};
