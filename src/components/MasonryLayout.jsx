import React from 'react';
import Masonry from 'react-masonry-css';
import Pin from './Pin';

const MasonryLayout = ({ pins }) => {
  const breakpointColumnsObj = {
    default: 4,
    3000: 6,
    2000: 5,
    1200: 3,
    1000: 2,
    500: 1
  };
  return (
    <>
    {pins.length > 0
      ? (
        <Masonry className="flex animate-slide-fwd" breakpointCols={breakpointColumnsObj}>
            {pins.map((pin) => <Pin key={pin._id} pin={pin}/>)}
        </Masonry>
        )
      : (
        <div className='flex animate-slide-fwd'>
          <div className='text-center w-full my-9 text-xl font-bold'>
            <p>No pins found.</p>
          </div>
        </div>
        )
      }
    </>

  );
};

export default MasonryLayout;
