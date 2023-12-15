import React, { useState, useEffect } from 'react';
import axios from 'axios';
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

function AvatarDisplay({ filename }) {

  const [avatarSrc, setAvatarSrc] = useState('');
  useEffect(() => {
    // Fetch the avatar image from the server
    const fetchAvatar = async () => {
      try {
        const response = await axios.get(SERVER_URL + `/download?filename=${filename}`, {
          responseType: 'arraybuffer', 
        });

        // Create a Blob 
        const blob = new Blob([response.data], { type: 'image/jpeg' });

        // Create a data URL from the Blob
        const dataUrl = URL.createObjectURL(blob);
        setAvatarSrc(dataUrl);
      } catch (error) {
        console.error('Error fetching avatar', error);
      }
    };

    fetchAvatar();
  }, []); 

  return (
      <img className='user-avatar' src={avatarSrc} alt='User Avatar' />
  );
}

export default AvatarDisplay;
