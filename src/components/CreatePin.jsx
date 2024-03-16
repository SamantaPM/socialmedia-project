import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { categories } from '../utils/data';
import { uploadImage, createPin, deleteImage } from '../sanity/client';

import useAuthStore from '../store/authStore';

const CreatePin = () => {
  const navigate = useNavigate();
  const { userProfile } = useAuthStore();

  const titleRef = useRef(null);
  const aboutRef = useRef(null);
  const destinationRef = useRef(null);
  const categoryRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [errorImage, setErrorImage] = useState('');
  const [errorFields, setErrorFields] = useState('');
  const [saving, setSaving] = useState(false);
  const [imgInput, setImgInput] = useState();

  const inputStyle = 'outline-none focus-within:outline-none border-b-2 border-gray-200 p-2';
  const wrapperStyle = 'flex flex-col items-center justify-center w-full h-420 border-2 border-dotted p-3';
  const imageContainerStyle = 'relative h-full w-full';
  const deleteButtonStyle = 'absolute bottom-3 right-3 p-3 bg-white rounded-full text-2xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out';

  const onChangeImg = async (e) => {
    try {
      setLoading(true);

      const imgAsset = await uploadImage(e.target.files[0]);

      setImgInput(imgAsset);
      setLoading(false);
    } catch (error) {
      setErrorImage(error.message);
      setLoading(false);
    }
  };

  const handleSavePin = (e) => {
    e.preventDefault();
    setSaving(true);

    if (!titleRef.current.checkValidity() ||
        !aboutRef.current.checkValidity() ||
       !destinationRef.current.checkValidity() ||
        !categoryRef.current.checkValidity() || !imgInput) {
      setSaving(false);
      setErrorFields(true);
      return;
    }
    setErrorFields(false);

    createPin({
      title: titleRef.current.value,
      about: aboutRef.current.value,
      destination: destinationRef.current.value,
      category: categoryRef.current.value,
      image: imgInput,
      userProfile
    })
      .then((pin) => {
        navigate(`/pin-detail/${pin._id}`);
        setSaving(false);
      })
      .catch((error) => {
        setSaving(false);
        // Add error handling for createPin function
        console.error(error);
      });
  };

  const deleteImg = () => {
    setLoading(true);

    deleteImage(imgInput._id)
      .then(() => {
        setImgInput('');
        setLoading(false);
      });
  };

  return (
    <div className='flex flex-col mt-5 items-center '>
      {errorFields && <p className='text-red-500 mb-3 lg:mb-5'>Please complete all the fields.</p>}
      <div className='flex flex-col justify-center lg:flex-row bg-white p-3 lg:p-5 lg:w-3/4 w-full'>

      <div className='bg-secondaryColor p-2 flex flex-0.7 w-full'>
        <div className={wrapperStyle}>
          {loading && (<Spinner />)}
          {
            errorImage && (<p>{errorImage}</p>)
          }
          {!imgInput
            ? (
            <label htmlFor='upload-image' className='flex flex-col h-full p-5'>
              <div className='flex w-full flex-col flex-1 justify-center items-center mb-11'>
                <AiOutlineCloudUpload className='font-bold text-2xl'/>
                <p className='text-lg'>Click to Upload</p>
              </div>
              <p className='flex-initial text-gray-400'>Recommendation: Use high-quality JPG, JPEG, SVG, PNG, GIF or TIFF less than 20MB</p>
              <input type='file' title='Upload Image' accept="image/*" className='w-0 h-0' aria-label='input image' onChange={onChangeImg} />
            </label>
              )
            : (
              <div className={imageContainerStyle}>
                <img src={imgInput.url} alt='Preview Uploaded Image' className="h-full mx-auto"/>
                <button className={deleteButtonStyle} onClick={deleteImg}><MdDelete /></button>
              </div>
              )}

        </div>
      </div>
      <div className='flex-1 lg:pl-5 mt-4'>
        <form className='flex flex-col gap-6'>
          <input type='text' name='title' title='Title' className={`text-2xl sm:text-3xl font-bold ${inputStyle}`} ref={titleRef} placeholder='Add your title' />
          <div className='flex flex-row items-center gap-3 my-1'>
            <img src={userProfile?.image} alt='Author User' className='w-10 h-10 rounded-full '></img>
            <p className='text-base font-bold'>{userProfile?.username}</p>
          </div>
          <input type='text' name='about' ref={aboutRef} placeholder='Tell everyone what your Pin is about' className={`text-base sm:text-lg ${inputStyle}`} />
          <input type='url' name='destination' ref={destinationRef} placeholder='Add a destination link' className={`text-base sm:text-lg ${inputStyle}`} />
          <div className='flex flex-col'>
            <label htmlFor='categories' className='text-base sm:text-lg font-semibold'>Choose Pin category</label>
            <select name='categories' id='categories' ref={categoryRef} className={`text-base sm:text-lg ${inputStyle}`}>
              <option className='text-base border-0 outline-none capitalize bg-white text-black ' value=''>Select a category</option>
              {categories.map((cat) => {
                return <option key={cat.name} className='text-base border-0 outline-none capitalize bg-white text-black' value={cat.name}>{cat.name}</option>;
              })}
            </select>
          </div>
          <div className='flex lg:justify-end pt-3 lg:p-0'>
            <button className='bg-red-500 rounded-full p-4 outline-none text-white font-bold w-full lg:w-28 disabled:opacity-85'
                    onClick={handleSavePin}
                    disabled={saving} >
                    {(saving) ? 'Saving...' : 'Save Pin' }
            </button>
          </div>

        </form>
      </div>
    </div>
    </div>

  );
};

export default CreatePin;
