import React, { useState } from 'react';
import { AiTwotoneDelete } from 'react-icons/ai';
import { MdDownloadForOffline } from 'react-icons/md';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';
import { savePin, deletePin } from '../sanity/client';
import { Link, useNavigate, useRevalidator } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const Pin = ({ pin }) => {
  const navigate = useNavigate();
  const { userProfile } = useAuthStore();
  const revalidator = useRevalidator();
  const { postedBy, image, _id, destination } = pin;
  const [postHovered, setPostHovered] = useState(false);
  const [savingPost, setSavingPost] = useState(false);
  const [deleting, setDeleting] = useState(false);

  let isSaved = false;
  const saved = pin.save?.filter((item) => item.userId === userProfile?._id);
  if (saved?.length > 0) isSaved = true;

  const [alreadySaved, setAlreadySaved] = useState(isSaved);

  const savePost = (id, postedBy) => {
    if (alreadySaved) return;

    setSavingPost(true);
    savePin(id, userProfile, postedBy).then((updated) => {
      setAlreadySaved(true);
    });
  };
  const handleDeletePin = (e) => {
    e.stopPropagation();
    setDeleting(true);
    deletePin(_id).then(() => {
      revalidator.revalidate();
      setDeleting(false);
    });
  };

  const cleanLink = (link) => link?.replace('https://', '').replace('http://', '').replace('www.', '').slice(0, 13);

  return (
    <div >
      <div className='flex flex-col gap-2 m-2'
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin-detail/${_id}`)}>
        <div className='relative'>
        {image && <img src={image.asset.url} className='rounded-lg w-ful cursor-zoom-in'/>}
        {postHovered && (
          <div className='absolute top-2 w-full h-full  flex flex-col justify-between px-2 z-50'>
            <div className='flex flex-row justify-between'>
              <a href={`${image.asset.url}?dl=`} download onClick={(e) => e.stopPropagation() } className='bg-white w-9 h-9 p-2 rounded-full flex flex-initial items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none'
              >
                <MdDownloadForOffline />
              </a>
              <button className='bg-red-500 rounded-full text-white font-bold px-3 p-1'
                onClick={(e) => {
                  e.stopPropagation();
                  savePost(_id, postedBy);
                }}
              >
                {alreadySaved ? 'Saved' : (savingPost) ? 'Saving' : 'Save'}
              </button>

            </div>
            <div className='flex flex-row justify-between items-center mb-4'>
              {destination?.slice(8).length > 0
                ? (
                  <div className='w-2/3'>
                    <a
                      href={destination}
                      target="_blank"
                      className="bg-white flex items-center gap-2 text-black text-sm font-semibold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md"
                      rel="noreferrer"
                    >
                      <BsFillArrowUpRightCircleFill fontSize={16}/>
                      {cleanLink(destination)}...
                    </a>
                  </div>
                  )
                : undefined}
              {
                (postedBy?._id === userProfile?._id && !deleting) && (
                <button
                  type="button"
                  onClick={handleDeletePin}
                  className="bg-white p-2 rounded-full w-10 h-10 flex items-center justify-center text-dark hover:shadow-sm opacity-75 hover:opacity-100 outline-none "
                >
                  <AiTwotoneDelete />
                </button>
                )
              }
              { deleting && (
                <div className="flex items-center justify-center space-x-1 bg-white p-2 rounded-full w-10 h-10 ">
                    <div className="w-1 h-1 bg-black rounded-full animate-pulse"></div>
                    <div className="w-1 h-1 bg-black rounded-full animate-pulse"></div>
                    <div className="w-1 h-1 bg-black rounded-full animate-pulse"></div>
                </div>
              )}
            </div>
          </div>
        ) }
        </div>

        <Link to={`/user-profile/${postedBy._id}`} className='flex flex-row gap-3 items-center font-bold uppercase cursor-pointer'>
          <img src={postedBy.image} alt='User Profile' className='rounded-full w-8 h-8' />
          {postedBy.username}
        </Link>
      </div>

    </div>
  );
};

export default Pin;
