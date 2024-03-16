import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { client } from '../sanity/client';
import { useNavigate } from 'react-router-dom';
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logowhite.png';
import { jwtDecode } from 'jwt-decode';
import useAuthStore from '../store/authStore';

const Login = () => {
  const navigate = useNavigate();
  const { addUser } = useAuthStore();
  const googleLoginSuccess = (credentialResponse) => {
    const { sub: _id, name: username, picture: image } = jwtDecode(credentialResponse.credential);

    const doc = {
      _id,
      _type: 'user',
      username,
      image
    };

    client.createIfNotExists(doc).then(() => {
      addUser(doc);
      navigate('/', { replace: true });
    });
  };

  return (
      <div className="flex justify-start items-center flex-col h-screen">
        <div className="relative w-full h-full">
          <video className="h-full w-full object-cover" src={shareVideo} muted autoPlay loop></video>
          <div className="absolute h-full w-full flex flex-col justify-center items-center top-0 right-o left-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="130px" />
          </div>
          <div className="shadow-2xl">
            <GoogleLogin
                onSuccess={googleLoginSuccess}
            />
            </div>
          </div>
        </div>
      </div>
  );
};

export default Login;
