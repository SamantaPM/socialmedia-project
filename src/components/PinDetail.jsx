import React from 'react';
import { Await, Link, useLoaderData } from 'react-router-dom';
import { MdDownloadForOffline } from 'react-icons/md';
import Spinner from './Spinner';
import { urlFor } from '../sanity/client';

const PinDetail = () => {
  const data = useLoaderData();

  return (
    <>
      <React.Suspense
        fallback={<Spinner />}
      >
        <Await
          resolve={data.pin}
          errorElement={
            <p>Error loading pin!</p>
          }
        >
          {([pin]) => {
            const { title, destination, about, image, postedBy } = pin;
            const cleanLink = (link) => link?.replace('https://', '').replace('http://', '').slice(0, 23) + ((destination.length > 23) ? '...' : '');
            return (
              <div className='flex flex-col lg:flex-row bg-white rounded-3xl'>
                <div className='flex justify-center items-center md:items-start flex-initial'>
                  <img src={urlFor(image?.asset?.url)} alt='User Post' className='rounded-t-3xl rounded-b-lg' />
                </div>
                <div className='w-full p-5 flex-1 lg:min-w-350 xl:min-w-620'>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2 items-center">
                    <a
                      href={`${image.asset.url}?dl=`}
                      download
                      className="bg-secondaryColor p-2 text-xl rounded-full flex items-center justify-center text-dark opacity-75 hover:opacity-100"
                    >
                      <MdDownloadForOffline />
                    </a>
                  </div>
                  <a href={destination} target="_blank" alt={destination} rel="noreferrer">
                    {cleanLink(destination)}
                  </a>
                </div>
                <div>
                  <h1 className="text-4xl font-bold break-words mt-3">
                    {title}
                  </h1>
                  <p className="mt-3">{about}</p>
                </div>
                <Link to={`/user-profile/${postedBy._id}`} className="flex gap-2 mt-5 items-center bg-white rounded-lg ">
                  <img src={postedBy.image} className="w-10 h-10 rounded-full" alt="user-profile" />
                  <p className="font-bold">{postedBy.username}</p>
                </Link>
                </div>
              </div>
            );
          }}
        </Await>
      </React.Suspense>
    </>
  );
};

export default PinDetail;
