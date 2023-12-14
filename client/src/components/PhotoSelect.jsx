import React, { useRef, useState } from 'react'
import uploadphoto_svg from '../static/uploadphoto.svg'
import '../styles/components.css'

function PhotoSelect({ setPhoto, photo }) {


    const handleFileChange = (event) => {
        if (event.target.files.length > 0) {
            setPhoto({
                show: URL.createObjectURL(event.target.files[0]),
                data: event.target.files[0]
            });
        } else {
            console.log('image has not been changed')
        }
    };


    return (
        <div className='avatar-parent'>
            <img className='user-photo' src={photo.show}></img>
            <img className='upload-photo' src={uploadphoto_svg}></img>
            <input onChange={handleFileChange} name='photo' type='file' accept="image/*"></input>
        </div>
    )
}

export default PhotoSelect