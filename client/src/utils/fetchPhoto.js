import axios from "axios";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const fetchPhoto = async (filename) => {
    try {
        const response = await axios.get(SERVER_URL + `/download?filename=${filename}`, {
            responseType: 'arraybuffer', 
        });

        const blob = new Blob([response.data], { type: 'image/jpeg' });
        const dataUrl = URL.createObjectURL(blob);
        return dataUrl;
    } catch (error) {
        console.error('Error fetching avatar', error);
        return ''; 
    }
};

export default fetchPhoto