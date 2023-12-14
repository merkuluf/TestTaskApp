import axios from 'axios';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

async function handlePhotoUpload(username, photo) {
  const formData = new FormData();
  formData.append('image', photo);
  formData.append('username', username);

  try {
    const response = await axios.post(SERVER_URL + '/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data.imageUrl;
  } catch (error) {
    console.error('Error uploading image', error);
    return null;
  }
}

export default handlePhotoUpload;
