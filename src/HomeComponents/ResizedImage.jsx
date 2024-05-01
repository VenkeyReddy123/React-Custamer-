import React, { useState, useEffect } from 'react';

const handleImageChange = async (imageUrl, widthPercentage, heightPercentage) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const parentWidth = img.width;
      const parentHeight = img.height;
      
      const desiredWidth = (widthPercentage / 100) * parentWidth;
      const desiredHeight = (heightPercentage / 100) * parentHeight;
      
      canvas.width = desiredWidth;
      canvas.height = desiredHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, desiredWidth, desiredHeight);

      canvas.toBlob((blob) => {
        if (blob) {
          const resizedImageUrl = URL.createObjectURL(blob);
          resolve(resizedImageUrl);
        } else {
          reject(new Error('Failed to create blob object'));
        }
      }, 'image/jpeg', 100);
    };
    img.onerror = (error) => {
      reject(error);
    };
    img.src = imageUrl;
  });
};

const ResizedImage = ({ imageUrl, widthPercentage, heightPercentage }) => {
  const [resizedImageUrl, setResizedImageUrl] = useState(null);
  useEffect(() => {
    const fetchResizedImage = async () => {
      try {
        const resizedUrl = await handleImageChange(imageUrl, widthPercentage, heightPercentage);
        setResizedImageUrl(resizedUrl);
        console.log(resizedUrl);
      } catch (error) {
        console.error('Error resizing image:', error);
      }
    };

    fetchResizedImage();

    return () => {
      if (resizedImageUrl) {
        URL.revokeObjectURL(resizedImageUrl);
      }
    };
  }, [imageUrl, widthPercentage, heightPercentage]);

  return (
    <img className='mt-1 ml-auto mr-auto'    srcSet={resizedImageUrl} style={{ width: `${widthPercentage}%`, height: `${heightPercentage}%` }}  />
  );
};

export default ResizedImage;
