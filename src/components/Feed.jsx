import React from 'react';
import { Await, useLoaderData } from 'react-router-dom';
import Spinner from './Spinner';
import MasonryLayout from './MasonryLayout';

const Feed = () => {
  const { pins, searchTerm, notFound = false } = useLoaderData();

  return (
    <div className='w-full h-full'
    >
      <React.Suspense
        fallback={<Spinner />}
      >
        <Await
          resolve={pins}
          errorElement={
            <p>Error loading pins!</p>
          }
        >
          {(pins) => {
            return (

            <>
              {pins.length > 0
                ? (
                  <>
                    {notFound &&
                      (<div className='text-left w-full m-5 text-base font-bold'>
                        {!searchTerm ? (<p>No matches found.</p>) : (<p>No matches found for &quot;{searchTerm}&quot;.</p>)}
                      </div>)
                    }
                    <MasonryLayout pins={pins} />
                  </>
                  )
                : (
                  <div className='flex animate-slide-fwd'>
                    <div className='text-center w-full my-9 text-xl font-bold'>
                      {!searchTerm ? (<p>No pins found.</p>) : (<p>No matches found for &quot;{searchTerm}&quot;.</p>)}
                    </div>
                  </div>
                  )
                }

            </>
            );
          }}
        </Await>
      </React.Suspense>

    </div>
  );
};

export default Feed;
