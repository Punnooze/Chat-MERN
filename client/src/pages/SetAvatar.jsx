import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import loader from '../assets/loader.gif';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { setAvatarRoute } from '../utils/APIRoutes';
import { Buffer } from 'buffer';

function SetAvatar() {

  const api = 'https://api.multiavatar.com/45678945';

  const navigate = useNavigate();

  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const toastOptions = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  };

  useEffect(() => {
    if (!localStorage.getItem('chat-app-user')) {
      navigate('/login');
    }
  }, [navigate]);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error('Please select an avatar', toastOptions);
    } else {
      const user = await JSON.parse(localStorage.getItem('chat-app-user'));
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem('chat-app-user', JSON.stringify(user));
        navigate('/');
      } else {
        toast.error('Error setting avatar. Please try again', toastOptions);
      }
    }
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = [];
  //     const keyword = ['batman', 'superman', 'ironman', 'aquaman'];
  //     for (let i = 0; i < 4; i++) {
  //       // const image = await axios.get(
  //       //   `${api}/${Math.round(Math.random() * 1000)}.svg`
  //       const image = await axios.get(`${api}/${keyword[i]}.svg`);

  //       console.log('image', i, ' ', image.data);
  //       const buffer = new Buffer.from(image.data, 'base64');
  //       data.push(buffer.toString('base64'));
  //       console.log('data : ', data);
  //     }
  //     setAvatars(data);
  //     setIsLoading(false);
  //     // console.log(data);
  //   };

  const genStr = (myLength) => {
    const chars =
      'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890';
    const randomArray = Array.from(
      { length: myLength },
      (v, k) => chars[Math.floor(Math.random() * chars.length)]
    );

    const randomString = randomArray.join('');
    return randomString;
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = [];
      //      const keywords = ['batman', 'super', 'iron', 'aqua'];
      try {
        for (let i = 0; i < 4; i++) {
          //  const response = await axios.get(
          //   `${api}/${keywords[i]}.svg`,
          const response = await axios.get(`${api}/${genStr(10)}.svg`, {
            responseType: 'arraybuffer',
          });
          const base64Data = Buffer.from(response.data, 'binary').toString(
            'base64'
          );
          data.push(base64Data);
        }

        setAvatars(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching or encoding images:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Container>
          <img src={loader} alt="loader" className="loader" />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick an avatar as your profile picture</h1>
          </div>

          <div className="avatars">
            {avatars.map((avatar, index) => {
              // console.log('Avatar data:', avatar); // Log avatar data
              try {
                return (
                  <div
                    key={index}
                    className={`avatar ${
                      selectedAvatar === index ? 'selected' : ''
                    }`}
                  >
                    <img
                      src={`data:image/svg+xml;base64,${avatar}`}
                      alt={`avatar - ${index}`}
                      onClick={() => {
                        setSelectedAvatar(index);
                      }}
                    />
                  </div>
                );
              } catch (error) {
                console.error('Error displaying avatar:', error);
                return null; // Skip rendering this avatar
              }
            })}
          </div>
          <button className="submit-btn" onClick={setProfilePicture}>
            Set Profile Picture
          </button>
        </Container>
      )}
      <ToastContainer />
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;

  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.3s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition: all ease-in-out 0.2s;
  }
  button:hover {
    background-color: #997af0;
  }
  }
`;

export default SetAvatar;
