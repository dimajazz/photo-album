import { useState } from 'react';

import { useAuth } from 'contexts/user.contexts';
import { BASE_APP_URL } from 'constants/constants';

import './createNewPost.css';

export const CreateNewPost = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState<File | null>();
  const [imageUrl, setImageUrl] = useState('');
  const [isAddNewFormVisible, setIsAddNewFormVisible] = useState(false);
  const [isImageTypeRelative, setIsImageTypeRelative] = useState(true);
  const { userData } = useAuth();

  const toggleAddNewForm = () => {
    setIsAddNewFormVisible((prev) => !prev);
  };

  const handleTitle = (newTitle: string) => {
    setTitle(newTitle);
  };

  const handleFile = (eventTarget: React.ChangeEvent<HTMLInputElement>) => {
    if (eventTarget.target.files) {
      setImage(eventTarget.target.files[0]);
    }
  };

  const imgUpload = async () => {
    if (image && image?.name && image?.type) {
      const lastIndex = image?.name.lastIndexOf('.');
      const fileExtension = image?.name.slice(lastIndex + 1);

      const acceptedExtensionsArr = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
      const acceptedFileTypesArr = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/bmp',
      ];

      if (
        acceptedExtensionsArr.includes(fileExtension) &&
        image?.type &&
        acceptedFileTypesArr.includes(image?.type)
      ) {
        const formData = new FormData();
        formData.append('image', image);

        const endpoint = 'post/image';
        const requestOptions = {
          method: 'POST',
          headers: new Headers({
            Authorization: userData?.token_type + ' ' + userData?.access_token,
          }),
          body: formData,
        };
        try {
          const response = await fetch(BASE_APP_URL + endpoint, requestOptions);
          const data = await response.json();

          if (response.ok && data) {
            return data;
          } else {
            return response;
          }
        } catch (error: any) {
          console.error(error.message);
        }
      } else {
        alert('Invalid image file');
      }
    }
  };

  const createPost = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const fileData = await imgUpload();
      const imageUrlToUpload = isImageTypeRelative
        ? fileData.filename
        : imageUrl;

      const requestDataStr = JSON.stringify({
        image_url: imageUrlToUpload,
        image_url_type: isImageTypeRelative ? 'relative' : 'absolute',
        caption: title,
        creator_id: userData?.user_id,
      });
      const requestOptions = {
        method: 'POST',
        headers: new Headers({
          Authorization: userData?.token_type + ' ' + userData?.access_token,
          'Content-Type': 'application/json',
        }),
        body: requestDataStr,
      };
      const endpoint = 'post/new';

      const response = await fetch(BASE_APP_URL + endpoint, requestOptions);
      const data = await response.json();

      if (response.ok && data) {
        return data;
      } else {
        return response;
      }
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setImage(null);
      setTitle('');
      setIsAddNewFormVisible(false);
      window.location.reload();
      window.scrollTo(0, 0);
    }
  };

  const toggleImageType = () =>
    setIsImageTypeRelative((prev) => (prev = !prev));

  return (
    <>
      {userData && (
        <div className='add-new-post'>
          <button onClick={toggleAddNewForm}>
            {isAddNewFormVisible ? 'Cancel' : 'Add New'}
          </button>
          {isAddNewFormVisible && (
            <form
              className='img-upload-form'
              onSubmit={(event) => createPost(event)}
            >
              <h3>Add New Photo</h3>
              <input
                type='text'
                placeholder='Enter a title'
                onChange={(event) => handleTitle(event?.target.value)}
                value={title}
                className='img-upload-form-title'
                name='post-title'
                required
              />
              <button
                type='button'
                onClick={toggleImageType}
                className='toggler-btn'
              >
                {isImageTypeRelative
                  ? 'Switch to upload Image form internet'
                  : 'Switch to upload Image form device'}
              </button>
              {!isImageTypeRelative && (
                <input
                  type='text'
                  placeholder='Paste image url'
                  onChange={(event) => setImageUrl(event?.target.value)}
                  value={imageUrl}
                  className='img-upload-form-title'
                  name='img-url'
                  required
                />
              )}
              {isImageTypeRelative && (
                <input
                  type='file'
                  onChange={(event) => handleFile(event)}
                  className='img-upload-form-file'
                  name='img-file'
                  required
                />
              )}
              <button type='submit'>Upload</button>
            </form>
          )}
        </div>
      )}
    </>
  );
};
